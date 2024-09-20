import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("versioning/madeOptional service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("versioning madeOptional test", async () => {
    const endPoint = `${serverBasePath}/versioning/made-optional/api-version:v2/test`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          prop: "foo",
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.prop, "foo");
  });
});
