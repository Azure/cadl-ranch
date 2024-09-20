import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("versioning/added service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("versioning added v1", async () => {
    const endPoint = `${serverBasePath}/versioning/added/api-version:v2/v1`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          prop: "foo",
          enumProp: "enumMemberV2",
          unionProp: 10,
        },
        config: {
          headers: {
            "header-v2": "bar",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.prop, "foo");
    assert.strictEqual(response.data.enumProp, "enumMemberV2");
    assert.strictEqual(response.data.unionProp, 10);
  });

  it("versioning added interface v2", async () => {
    const endPoint = `${serverBasePath}/versioning/added/api-version:v2/interface-v2/v2`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          prop: "foo",
          enumProp: "enumMember",
          unionProp: "bar",
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.prop, "foo");
    assert.strictEqual(response.data.enumProp, "enumMember");
    assert.strictEqual(response.data.unionProp, "bar");
  });

  it("versioning added v2", async () => {
    const endPoint = `${serverBasePath}/versioning/added/api-version:v2/v2`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          prop: "foo",
          enumProp: "enumMember",
          unionProp: "bar",
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.prop, "foo");
    assert.strictEqual(response.data.enumProp, "enumMember");
    assert.strictEqual(response.data.unionProp, "bar");
  });
});
