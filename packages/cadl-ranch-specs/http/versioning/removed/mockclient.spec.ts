import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("versioning/removed service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("versioning removed test", async () => {
    const endPoint = `${serverBasePath}/versioning/removed/api-version:v2/v2`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          prop: "foo",
          enumProp: "enumMemberV2",
          unionProp: "bar",
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.prop, "foo");
    assert.strictEqual(response.data.enumProp, "enumMemberV2");
    assert.strictEqual(response.data.unionProp, "bar");
  });
});
