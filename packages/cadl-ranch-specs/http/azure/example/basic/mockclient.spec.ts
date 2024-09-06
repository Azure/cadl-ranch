import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("azure/example/basic endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("basic action", async () => {
    const endPoint = `${serverBasePath}/azure/example/basic/basic`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          stringProperty: "text",
          modelProperty: {
            int32Property: 1,
            float32Property: 1.5,
            enumProperty: "EnumValue1",
          },
          arrayProperty: ["item"],
          recordProperty: {
            record: "value",
          },
        },
        config: {
          params: {
            "api-version": "2022-12-01-preview",
            "query-param": "query",
          },
          headers: {
            "header-param": "header",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, { stringProperty: "text" });
  });
});
