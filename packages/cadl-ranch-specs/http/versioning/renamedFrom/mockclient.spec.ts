import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("versioning/renamedFrom service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("versioning RenamedFrom ewOp test", async () => {
    const endPoint = `${serverBasePath}/versioning/renamed-from/api-version:v2/test`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          newProp: "foo",
          enumProp: "newEnumMember",
          unionProp: 10,
        },
        config: {
          params: {
            newQuery: "bar",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.newProp, "foo");
    assert.strictEqual(response.data.enumProp, "newEnumMember");
    assert.strictEqual(response.data.unionProp, 10);
  });

  it("versioning renamedFrom newInterface test", async () => {
    const endPoint = `${serverBasePath}/versioning/renamed-from/api-version:v2/interface/test`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          newProp: "foo",
          enumProp: "newEnumMember",
          unionProp: 10,
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.newProp, "foo");
    assert.strictEqual(response.data.enumProp, "newEnumMember");
    assert.strictEqual(response.data.unionProp, 10);
  });
});
