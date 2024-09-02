import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("azure/special-headers endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should set client-request-id header and value if input is provided", async () => {
    const endPoint = `${serverBasePath}/azure/special-headers/x-ms-client-request-id/`;
    const overrideReqId = "86aede1f-96fa-4e7f-b1e1-bf8a947cb804";
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          headers: {
            "x-ms-client-request-id": overrideReqId,
          },
        },
      },
    });
    assert.strictEqual(response.headers["x-ms-client-request-id"], overrideReqId);
    assert.strictEqual(response.status, 204);
  });
});
