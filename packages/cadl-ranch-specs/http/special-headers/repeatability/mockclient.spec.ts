import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("special-headers/repeatability service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should set repeatable headers correctly", async () => {
    const endPoint = `${serverBasePath}/special-headers/repeatability/immediateSuccess`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        config: {
          headers: {
            "Repeatability-First-Sent": "Tue, 15 Nov 2022 12:45:26 GMT",
            "Repeatability-Request-ID": "2378d9bc-1726-11ee-be56-0242ac120002", // fake uuid
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
    assert.strictEqual(response.headers["repeatability-result"], "accepted");
  });
});
