import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("versioning/typeChangedFrom service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("versioning typeChangedFrom test", async () => {
    const endPoint = `${serverBasePath}/versioning/type-changed-from/api-version:v2/test`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          prop: "foo",
          changedProp: "bar",
        },
        config: {
          params: {
            param: "baz",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.prop, "foo");
    assert.strictEqual(response.data.changedProp, "bar");
  });
});
