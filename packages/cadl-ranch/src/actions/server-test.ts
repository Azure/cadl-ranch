import { HttpMethod, MockMethod } from "@azure-tools/cadl-ranch-api";
import { loadScenarioMockApis, loadSpecsMockClient } from "../scenarios-resolver.js";
import { exec } from "child_process";
import * as fs from "fs";

class ServerTestGenerator {
  private name: string = "";
  private endpoint: string = "";
  private mockMethods: MockMethod[] | undefined;

  constructor(name: string, endpoint: string, mockMethods: MockMethod[] | undefined) {
    this.name = name;
    this.endpoint = endpoint;
    this.mockMethods = mockMethods;
  }

  public getHeadersBlock(headers: Record<string, string>): string {
    if (headers == null) return "";
    let headersBlock = "headers: {";
    for (const [key, value] of Object.entries(headers)) {
      if (typeof value === "string") {
        headersBlock += `"${key}": "${value}",`;
      } else {
        headersBlock += `"${key}": ${value},`;
      }
    }
    headersBlock += "},";
    return headersBlock;
  }

  public getDataBlock(data: Record<string, string>): string {
    if (data == null) return "";
    let dataBlock = "data: {";
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "string") {
        dataBlock += `"${key}": "${value}",`;
      } else {
        dataBlock += `"${key}": ${value},`;
      }
    }
    dataBlock += "},";
    return dataBlock;
  }

  public getValidateStatusBlock(validStatuses: number[]): string {
    if (validStatuses == null) return "";
    let statusBlock = "";
    validStatuses.forEach((status) => {
      statusBlock += `|| status === ${status}`;
    });

    let result = `validateStatus: function (status) {`;
    result += `return (status >= 200 && status < 300) ${statusBlock};`;
    result += `},`;
    return result;
  }

  public getParamsBlock(params: Record<string, string>): string {
    if (params == null) return "";
    let paramsBlock = "params: {";
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === "string") {
        paramsBlock += `"${key}": \`${value}\`,`;
      } else if (Array.isArray(value)) {
        paramsBlock += `"${key}": [`;
        for (const val of [...value]) {
          if (typeof val === "string") {
            paramsBlock += `\`${val}\`,`;
          } else {
            paramsBlock += `${val},`;
          }
        }
        paramsBlock += "],";
      } else {
        paramsBlock += `"${key}": ${value},`;
      }
    }
    paramsBlock += "},";
    return paramsBlock;
  }

  public getResponseHeadersBlock(headers: Record<string, string>): string {
    let responseHeaderBlock = "";
    for (const [key, value] of Object.entries(headers)) {
      if (typeof value === "string") {
        responseHeaderBlock += `assert.strictEqual(response.headers["${key}"], "${value}");`;
      } else {
        responseHeaderBlock += `assert.strictEqual(response.headers["${key}"], ${value});`;
      }
    }
    return responseHeaderBlock;
  }

  public getRequestBodyBlock(requestBody: any, method: HttpMethod, config: any): string {
    if (method === "post" && requestBody === undefined) return "";

    let requestBodyBlock = "requestBody:";

    if (requestBody == null) return requestBodyBlock + "{},";

    if (
      config &&
      config.headers &&
      (config.headers["Content-Type"] === "image/png" || config.headers["Content-Type"] === "application/octet-stream")
    ) {
      return `requestBody: readFileSync(\`\${__dirname}/${requestBody}\`),`;
    }

    if (typeof requestBody !== "object") {
      if (typeof requestBody === "string") {
        return requestBodyBlock + `\`${requestBody}\`,`;
      } else {
        return requestBodyBlock + requestBody + ",";
      }
    }
    // requestBodyBlock += "{";
    // for (const [key, value] of Object.entries(requestBody)) {
    //   if (typeof value === "string") {
    //     requestBodyBlock += `"${key}": "${value}",`;
    //   } else {
    //     requestBodyBlock += `"${key}": ${value},`;
    //   }
    // }
    // requestBodyBlock += "},";
    requestBodyBlock += JSON.stringify(requestBody) + ",";
    return requestBodyBlock;
  }

  public async generate(scenariosPath: string, serverBasePath: string): Promise<void> {
    const fileName = `temp\\${this.name}.spec.js`;
    const importBlock = `import { assert } from "chai";
import { beforeEach, describe, it } from "mocha";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { makeServiceCall, SERVICE_CALL_TYPE, uint8ArrayToString } from "./helper.js";
import * as dotenv from "dotenv";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
`;
    const describeBlock = `describe("${this.name} endpoint", () => {`;
    const beforeEachBlock = `let serverBasePath;
    beforeEach(() => {
      serverBasePath = process.env["SERVER_BASE_PATH"];
    });`;
    let testBlock = "";
    if (this.mockMethods)
      for (const mockMethod of this.mockMethods) {
        testBlock += `it("should get user", async () => {`;
        testBlock += `const endPoint = \`\${serverBasePath}${this.endpoint}\`;
          const response = await makeServiceCall(SERVICE_CALL_TYPE.${mockMethod.method}, {
            endPoint,
            options: {`;
        //testBlock += `requestBody: ${mockMethod.request.body === undefined ? "{}" : JSON.stringify(mockMethod.request.body)},`;
        testBlock += this.getRequestBodyBlock(mockMethod.request.body, mockMethod.method, mockMethod.request.config);
        testBlock += `config: {`;
        if (mockMethod.request.config) {
          testBlock += this.getHeadersBlock(mockMethod.request.config.headers);
          testBlock += this.getValidateStatusBlock(mockMethod.request.config.validStatuses);
          testBlock += this.getParamsBlock(mockMethod.request.config.params);
          testBlock += this.getDataBlock(mockMethod.request.config.data);
        }

        testBlock += `},
            },
          });`;
        testBlock += `assert.strictEqual(response.status, ${mockMethod.response.status});`;

        if (mockMethod.response.headers !== undefined) {
          if (mockMethod.response.headers["operation-location"] !== undefined) {
            mockMethod.response.headers = {
              ...mockMethod.response.headers,
              "operation-location": `${serverBasePath}${mockMethod.response.headers["operation-location"]}`,
            };
          }
        }
        if (mockMethod.response.data !== undefined) {
          if (mockMethod.response.data["nextLink"] !== undefined) {
            mockMethod.response.data = {
              ...mockMethod.response.data,
              nextLink: `${serverBasePath}${mockMethod.response.data["nextLink"]}`,
            };
          }
          if (mockMethod.response.data["systemData"]) {
            delete mockMethod.response.data["systemData"]["createdAt"];
            delete mockMethod.response.data["systemData"]["lastModifiedAt"];
            testBlock += `delete response.data["systemData"]["createdAt"];`;
            testBlock += `delete response.data["systemData"]["lastModifiedAt"];`;
          }

          if (mockMethod.response.data["value"] && Array.isArray(mockMethod.response.data["value"])) {
            testBlock += `if(response.data.value !== undefined && Array.isArray(response.data.value)){
              for(const val of response.data.value){
                if(val["systemData"] !== undefined){
                  delete val["systemData"]["createdAt"];
                  delete val["systemData"]["lastModifiedAt"];
                }
              }
              }`;
          }
        }
        if (mockMethod.response.data !== undefined) {
          if (
            this.endpoint.endsWith(`response/custom-content-type`) ||
            this.endpoint.endsWith(`response/octet-stream`) ||
            (this.endpoint.endsWith(`/content-negotiation/different-body`) &&
              mockMethod.request.config &&
              mockMethod.request.config.headers &&
              mockMethod.request.config.headers["accept"] === "application/json") ||
            (mockMethod.request.config &&
              mockMethod.request.config.headers &&
              (mockMethod.request.config.headers["accept"] === "image/png" ||
                mockMethod.request.config.headers["accept"] === "image/jpeg"))
          ) {
            testBlock += `assert.strictEqual(${mockMethod.response.data});`;
          } else if (
            mockMethod.response.data.contentType !== undefined &&
            mockMethod.response.data.contentType === "application/xml"
          ) {
            testBlock += `assert.deepEqual(response.data, \`${mockMethod.response.data.rawContent}\`);`;
          } else if (mockMethod.response.data.rawContent !== undefined) {
            testBlock += `assert.deepEqual(JSON.stringify(response.data), ${JSON.stringify(mockMethod.response.data.rawContent)});`;
          } else if (mockMethod.response.data.value !== undefined) {
            //testBlock += `assert.deepEqual(JSON.stringify(response.data), JSON.stringify(${JSON.stringify(mockMethod.response.data)}));`;
            testBlock += `assert.deepEqual((response.data), ${JSON.stringify(mockMethod.response.data)});`;
          } else {
            testBlock += `assert.deepEqual((response.data), ${JSON.stringify(mockMethod.response.data)});`;
          }
        }
        if (mockMethod.response.headers !== undefined) {
          testBlock += this.getResponseHeadersBlock(mockMethod.response.headers);
        }
        testBlock += `});`;
      }
    const closeBlock = `});`;
    fs.writeFileSync(fileName, `${importBlock}\n${describeBlock}\n${beforeEachBlock}\n${testBlock}\n${closeBlock}`, {
      encoding: "utf-8",
    });
  }
}

export async function serverTestWithCoverage(scenariosPath: string, serverBasePath: string) {
  const scenarios = await loadScenarioMockApis(scenariosPath);
  for (const [name, scenario] of Object.entries(scenarios)) {
    for (const endpoint of scenario.apis) {
      if (endpoint.method !== undefined) continue;
      const obj: ServerTestGenerator = new ServerTestGenerator(name, endpoint.uri, endpoint.mockMethods);
      await obj.generate(scenariosPath, serverBasePath);
    }
  }
  fs.copyFileSync(`${scenariosPath}\\..\\dist\\http\\helper-server-test.js`, `temp\\helper.js`);
  fs.copyFileSync(`${scenariosPath}\\..\\assets\\image.jpg`, `temp\\image.jpg`);
  fs.copyFileSync(`${scenariosPath}\\..\\assets\\image.png`, `temp\\image.png`);
  await serverTest(".\\temp", serverBasePath, true);
}

// Function to split an array into chunks of a specified size
function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export async function serverTest(scenariosPath: string, serverBasePath: string, noDistCombine?: boolean) {
  const specFiles = await loadSpecsMockClient(scenariosPath, noDistCombine);
  try {
    const batches = chunkArray(specFiles, 50);
    for (const batch of batches) {
      const file = batch.join(" ");
      const command = `pnpm cross-env SERVER_BASE_PATH=${serverBasePath} TS_NODE_PROJECT=tsconfig.json mocha -r ts-node/register --experimental-specifier-resolution=node --timeout 36000 ${file}`;
      await executeCommand(command);
    }
    // const file = specFiles.join(" ");
    // const command = `pnpm cross-env SERVER_BASE_PATH=${serverBasePath} TS_NODE_PROJECT=tsconfig.json mocha -r ts-node/register --experimental-specifier-resolution=node --timeout 36000 ${file}`;
    // await executeCommand(command);
  } catch (error) {
    console.error("Error executing tests", error);
  }
}

function executeCommand(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
      }
      if (stderr) {
        // console.error(`stderr: ${stderr}`);
      }
      console.log(`${stdout}`);
      resolve();
    });
  });
}
