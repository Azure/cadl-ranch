import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, pngFile, SERVICE_CALL_TYPE, uint8ArrayToString } from "../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("encode/bytes endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  describe("query", () => {
    it(`should get bytes`, async () => {
      const endPoint = `${serverBasePath}/encode/bytes/query/default`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              value: "dGVzdA==",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should get bytes base64 encoding`, async () => {
      const endPoint = `${serverBasePath}/encode/bytes/query/base64`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              value: "dGVzdA==",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should get bytes base64url encoding`, async () => {
      const endPoint = `${serverBasePath}/encode/bytes/query/base64url`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              value: "dGVzdA",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should get bytes base64url-array`, async () => {
      const endPoint = `${serverBasePath}/encode/bytes/query/base64url-array`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              value: ["dGVzdA", "dGVzdA"].join(","),
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });
  });

  describe("property", () => {
    it(`should post bytes`, async () => {
      const endPoint = `${serverBasePath}/encode/bytes/property/default`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            value: "dGVzdA==",
          },
        },
      });
      assert.strictEqual(response.status, 200);
    });

    it(`should post bytes base64 encoding`, async () => {
      const endPoint = `${serverBasePath}/encode/bytes/property/base64`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            value: "dGVzdA==",
          },
        },
      });
      assert.strictEqual(response.status, 200);
    });

    it(`should post bytes base64url encoding`, async () => {
      const endPoint = `${serverBasePath}/encode/bytes/property/base64url`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            value: "dGVzdA",
          },
        },
      });
      assert.strictEqual(response.status, 200);
    });

    it(`should post bytes base64url array`, async () => {
      const endPoint = `${serverBasePath}/encode/bytes/property/base64url-array`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            value: ["dGVzdA", "dGVzdA"],
          },
        },
      });
      assert.strictEqual(response.status, 200);
    });
  });

  describe("header", () => {
    it(`should get bytes`, async () => {
      const endPoint = `${serverBasePath}/encode/bytes/header/default`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            headers: {
              value: "dGVzdA==",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should get bytes base64 encoding`, async () => {
      const endPoint = `${serverBasePath}/encode/bytes/header/base64`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            headers: {
              value: "dGVzdA==",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should get bytes base64url encoding`, async () => {
      const endPoint = `${serverBasePath}/encode/bytes/header/base64url`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            headers: {
              value: "dGVzdA",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should get bytes  base64url-array`, async () => {
      const endPoint = `${serverBasePath}/encode/bytes/header/base64url-array`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            headers: {
              value: ["dGVzdA", "dGVzdA"].join(","),
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });
  });

  describe("request body", () => {
    it(`should post bytes`, async () => {
      const endPoint = `${serverBasePath}/encode/bytes/body/request/default`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: "dGVzdA==",
          config: {
            headers: {
              "Content-Type": "application/json",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should post bytes base64 encoding`, async () => {
      const endPoint = `${serverBasePath}/encode/bytes/body/request/base64`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: "dGVzdA==",
          config: {
            headers: {
              "Content-Type": "application/json",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should post bytes base64url encoding`, async () => {
      const endPoint = `${serverBasePath}/encode/bytes/body/request/base64url`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: "dGVzdA",
          config: {
            headers: {
              "Content-Type": "application/json",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should post bytes with custom content type`, async () => {
      const endPoint = `${serverBasePath}/encode/bytes/body/request/custom-content-type`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: pngFile,
          config: {
            headers: {
              "Content-Type": "image/png",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    }).timeout(10000);

    it(`should post bytes with custom content type`, async () => {
      const endPoint = `${serverBasePath}/encode/bytes/body/request/octet-stream`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: pngFile,
          config: {
            headers: {
              "Content-Type": "application/octet-stream",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });
  });

  describe("response body", () => {
    it(`should get bytes with base64 encoding by default`, async () => {
      const endPoint = `${serverBasePath}/encode/bytes/body/response/default`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.data, "dGVzdA==");
    });

    it(`should get bytes base64 encoding`, async () => {
      const endPoint = `${serverBasePath}/encode/bytes/body/response/base64`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.data, "dGVzdA==");
    });

    it(`should get bytes base64url encoding`, async () => {
      const endPoint = `${serverBasePath}/encode/bytes/body/response/base64url`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.data, "dGVzdA");
    });

    it(`should get bytes with custom content type`, async () => {
      const endPoint = `${serverBasePath}/encode/bytes/body/response/custom-content-type`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            headers: {
              "Content-Type": "image/png",
            },
          },
        },
      });
      assert.strictEqual(response.status, 200);
      assert.strictEqual(uint8ArrayToString(response.data, "utf-8"), pngFile.toString());
    });

    it(`should get bytes with octet-stream content type`, async () => {
      const endPoint = `${serverBasePath}/encode/bytes/body/response/octet-stream`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            headers: {
              "Content-Type": "application/octet-stream",
            },
          },
        },
      });
      assert.strictEqual(response.status, 200);
      assert.strictEqual(uint8ArrayToString(response.data, "utf-8"), pngFile.toString());
    });
  });
});
