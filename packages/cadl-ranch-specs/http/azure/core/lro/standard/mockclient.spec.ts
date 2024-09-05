import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("azure/core/lro/standard endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should put LRO response", async () => {
    let endPoint = `${serverBasePath}/azure/core/lro/standard/users/madge`;
    let response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: { role: "contributor" },
        config: {
          params: {
            "api-version": "2022-12-01-preview",
          },
        },
      },
    });
    assert.strictEqual(response.status, 201);
    assert.isNotNull(response.headers["operation-location"]);
    assert.strictEqual(response.data.name, "madge");
    assert.strictEqual(response.data.role, "contributor");
    console.log(response.headers["operation-location"]);
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
    } while (response.data.status != "Succeeded");
    assert.equal(response.status, 200);
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
    assert.equal(response.status, 200);
    assert.equal(response.data.status, "Succeeded");
  });

  it("should delete LRO response", async () => {
    let endPoint = `${serverBasePath}/azure/core/lro/standard/users/madge`;
    let response = await makeServiceCall(SERVICE_CALL_TYPE.delete, {
      endPoint,
      options: {
        requestBody: { role: "contributor" },
        config: {
          params: {
            "api-version": "2022-12-01-preview",
          },
        },
      },
    });
    assert.equal(response.status, 202);
    assert.equal(response.data.id, "operation2");
    assert.equal(response.data.status, "InProgress");
    assert.isDefined(response.headers["operation-location"]);
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
        assert.equal(response.data.id, "operation2");
        assert.equal(response.data.status, "InProgress");
      } else {
        assert.equal(response.data.id, "operation2");
        assert.equal(response.data.status, "Succeeded");
      }
      count++;
    } while (response.data.status !== "Succeeded");
    assert.equal(response.status, 200);
    assert.equal(response.data.id, "operation2");
    assert.equal(response.data.status, "Succeeded");
  });

  it("should export LRO response", async () => {
    let endPoint = `${serverBasePath}/azure/core/lro/standard/users/madge:export`;
    let response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        config: {
          params: {
            "api-version": "2022-12-01-preview",
            "format": "json",
          },
        },
      },
    });
    assert.equal(response.status, 202);
    assert.equal(response.data.id, "operation3");
    assert.equal(response.data.status, "InProgress");
    assert.isDefined(response.headers["operation-location"]);
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
        assert.equal(response.data.id, "operation3");
        assert.equal(response.data.status, "InProgress");
      } else {
        assert.equal(response.data.id, "operation3");
        assert.equal(response.data.status, "Succeeded");
      }
      count++;
    } while (response.data.status !== "Succeeded");
    assert.equal(response.status, 200);
    assert.equal(response.data.id, "operation3");
    assert.equal(response.data.status, "Succeeded");
    assert.equal(response.data.result.name, "madge");
    assert.equal(response.data.result.resourceUri, "/users/madge");
  });
});
