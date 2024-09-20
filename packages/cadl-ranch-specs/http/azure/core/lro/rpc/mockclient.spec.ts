import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("azure/core/lro/rpc endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should post LRO response", async () => {
    let endPoint = `${serverBasePath}/azure/core/lro/rpc/generations:submit`;
    let response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: { prompt: "text" },
        config: {
          params: {
            "api-version": "2022-12-01-preview",
          },
        },
      },
    });
    assert.strictEqual(response.status, 202);
    assert.isNotNull(response.headers["operation-location"]);
    assert.equal(response.data.id, "operation1");
    assert.equal(response.data.status, "InProgress");
    let count = 0;
    endPoint = response.headers["operation-location"];
    do {
      response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              "api-version": "2022-12-01-preview",
            },
          },
        },
      });
      if (count == 0) {
        assert.equal(response.data.id, "operation1");
        assert.equal(response.data.status, "InProgress");
      } else {
        assert.equal(response.data.id, "operation1");
        assert.equal(response.data.status, "Succeeded");
      }
      count++;
    } while (response.data.status !== "Succeeded");
    assert.equal(response.status, 200);
    assert.deepEqual(response.data.result, { data: "text data" });
  });
});
