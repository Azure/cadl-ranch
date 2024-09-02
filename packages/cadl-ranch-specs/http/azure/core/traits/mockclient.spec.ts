import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("azure/core/traits endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should get user traits", async () => {
    const endPoint = `${serverBasePath}/azure/core/traits/user/1`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          headers: {
            "foo": "123",
            "If-Match": '"valid"',
            "If-None-Match": '"invalid"',
            "If-Modified-Since": "Thu, 26 Aug 2021 14:38:00 GMT",
            "If-Unmodified-Since": "Fri, 26 Aug 2022 14:38:00 GMT",
            "x-ms-client-request-id": "any uuid",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.name, "Madge");
  });

  it("should post user traits", async () => {
    const endPoint = `${serverBasePath}/azure/core/traits/user/1:repeatableAction`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          userActionValue: "test",
        },
        config: {
          headers: {
            "Repeatability-Request-ID": "86aede1f-96fa-4e7f-b1e1-bf8a947cb804",
            "Repeatability-First-Sent": "Mon, 27 Nov 2023 11:58:00 GMT",
          },
        },
      },
    });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.userActionResult, "test");
  });
});
