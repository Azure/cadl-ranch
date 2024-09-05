import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("azure/client-generator-core/flatten-property endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should update and receive model with 1 level of flattening", async () => {
    const endPoint = `${serverBasePath}/azure/client-generator-core/flatten-property/flattenModel`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          name: "foo",
          properties: {
            description: "bar",
            age: 10,
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.name, "test");
    assert.strictEqual(response.data.properties.description, "test");
    assert.strictEqual(response.data.properties.age, 1);
  });

  it("should update and receive model with 2 level of flattening", async () => {
    const endPoint = `${serverBasePath}/azure/client-generator-core/flatten-property/nestedFlattenModel`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          name: "foo",
          properties: {
            summary: "bar",
            properties: {
              description: "test",
              age: 10,
            },
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.name, "test");
    assert.strictEqual(response.data.properties.summary, "test");
    assert.strictEqual(response.data.properties.properties.description, "foo");
    assert.strictEqual(response.data.properties.properties.age, 1);
  });
});
