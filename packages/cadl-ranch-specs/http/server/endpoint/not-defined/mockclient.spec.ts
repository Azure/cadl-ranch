import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("server/endpoint/not-defined service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should work with not defined endpoint", async () => {
    const endPoint = `${serverBasePath}/server/endpoint/not-defined/valid`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.head, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
  });
});
