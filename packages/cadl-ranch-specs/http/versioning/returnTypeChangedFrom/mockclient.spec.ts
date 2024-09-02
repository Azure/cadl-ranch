import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("versioning/returnTypeChangedFrom service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("versioning returnTypeChangedFrom test", async () => {
    const endPoint = `${serverBasePath}/versioning/return-type-changed-from/api-version:v2/test`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: "test",
        config: {
          headers: {
            "Content-Type": "text/plain",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data, "test");
  });
});
