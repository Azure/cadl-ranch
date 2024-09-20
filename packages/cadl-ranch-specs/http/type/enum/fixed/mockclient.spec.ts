import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("type/enum/fixed service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should get known value", async () => {
    const endPoint = `${serverBasePath}/type/enum/fixed/string/known-value`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, "Monday");
  });

  it("should put known value", async () => {
    const endPoint = `${serverBasePath}/type/enum/fixed/string/known-value`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: "Monday",
        config: {
          headers: {
            "Content-Type": "application/json",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should put unknown value and receives 500", async () => {
    const endPoint = `${serverBasePath}/type/enum/fixed/string/unknown-value`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: "Weekend",
        config: {
          headers: {
            "Content-Type": "application/json",
          },
          validateStatus: function (status: number) {
            return (status >= 200 && status < 300) || status === 500;
          },
        },
      },
    });
    assert.strictEqual(response.status, 500);
  });
});
