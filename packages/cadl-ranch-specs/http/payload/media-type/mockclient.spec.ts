import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("payload/media-type service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should getAsText", async () => {
    const endPoint = `${serverBasePath}/payload/media-type/string-body/getAsText`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          headers: {
            Accept: "text/plain",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data, "{cat}");
  });

  it("should sendAsText", async () => {
    const endPoint = `${serverBasePath}/payload/media-type/string-body/sendAsText`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: "{cat}",
        config: {
          headers: {
            "Content-Type": "text/plain",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("should sendAsJson", async () => {
    const endPoint = `${serverBasePath}/payload/media-type/string-body/sendAsJson`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: "foo",
        config: {
          headers: {
            "Content-Type": "application/json",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("should getAsJson", async () => {
    const endPoint = `${serverBasePath}/payload/media-type/string-body/getAsJson`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          headers: {
            Accept: "application/json",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data, "foo");
  });
});
