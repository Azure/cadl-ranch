import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("server/path/single service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should work with no param", async () => {
    const endPoint = `${serverBasePath}/server/path/single/myOp`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.head, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
  });
});
