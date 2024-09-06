import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("type/model/visibility endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("queryProp with no response body", async () => {
    const endPoint = `${serverBasePath}/type/model/visibility`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.head, {
      endPoint,
      options: {
        config: {
          data: { queryProp: 123 },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("queryProp with response body", async () => {
    const endPoint = `${serverBasePath}/type/model/visibility`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          data: { queryProp: 123 },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, { readProp: "abc" });
  });

  it("createProp/updateProp with no response body", async () => {
    const endPoint = `${serverBasePath}/type/model/visibility`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          createProp: ["foo", "bar"],
          updateProp: [1, 2],
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("updateProp with no response body", async () => {
    const endPoint = `${serverBasePath}/type/model/visibility`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.patch, {
      endPoint,
      options: {
        requestBody: {
          updateProp: [1, 2],
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("createProp with no response body", async () => {
    const endPoint = `${serverBasePath}/type/model/visibility`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          createProp: ["foo", "bar"],
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("deleteProp with no response body", async () => {
    const endPoint = `${serverBasePath}/type/model/visibility`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.delete, {
      endPoint,
      options: {
        config: {
          data: { deleteProp: true },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("readonlyroundtrip with response body", async () => {
    const endPoint = `${serverBasePath}/type/model/visibility/readonlyroundtrip`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {},
      },
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, {
      optionalNullableIntList: [1, 2, 3],
      optionalStringRecord: { k1: "value1", k2: "value2" },
    });
  });
});
