import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("parameters/basic service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("basic parameters explicit-body simple", async () => {
    const endPoint = `${serverBasePath}/parameters/basic/explicit-body/simple`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          name: "foo",
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("basic parameters implicit-body simple", async () => {
    const endPoint = `${serverBasePath}/parameters/basic/implicit-body/simple`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          name: "foo",
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });
});
