import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("type/model/usage service endpoint", () => {
  let serverBasePath: string | undefined;
  const body = {
    requiredProp: "example-value",
  };

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should post input model correctly", async () => {
    const endPoint = `${serverBasePath}/type/model/usage/input`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: body,
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get output model correctly", async () => {
    const endPoint = `${serverBasePath}/type/model/usage/output`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, body);
  });

  it("should get output model correctly", async () => {
    const endPoint = `${serverBasePath}/type/model/usage/input-output`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: body,
      },
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, {
      requiredProp: "example-value",
    });
  });
});
