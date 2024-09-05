import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, pngFile, jpgFile, SERVICE_CALL_TYPE, uint8ArrayToString } from "../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("payload/content-negotiation endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should get image/png for same body in content negotiation", async () => {
    const endPoint = `${serverBasePath}/content-negotiation/same-body`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          headers: {
            accept: "image/png",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(uint8ArrayToString(response.data, "utf-8"), pngFile.toString());
  });

  it("should get image/jpeg for same body in content negotiation", async () => {
    const endPoint = `${serverBasePath}/content-negotiation/same-body`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          headers: {
            accept: "image/jpeg",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(uint8ArrayToString(response.data, "utf-8"), jpgFile.toString());
  });

  it("should return error if put wrong accept for same body in content negotiation", async () => {
    const endPoint = `${serverBasePath}/content-negotiation/same-body`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          headers: {
            accept: "wrongAccept",
          },
          validateStatus: function (status: number) {
            return (status >= 200 && status < 300) || status == 400;
          },
        },
      },
    });
    assert.strictEqual(response.status, 400);
    assert.strictEqual((response.data as any).message, "Unsupported Accept header");
    assert.strictEqual((response.data as any).expected, `"image/png" | "image/jpeg"`);
    assert.strictEqual((response.data as any).actual, "wrongAccept");
  });

  it("should get image/png for different body in content negotiation", async () => {
    const endPoint = `${serverBasePath}/content-negotiation/different-body`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          headers: {
            accept: "image/png",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(uint8ArrayToString(response.data, "utf-8"), pngFile.toString());
  });

  it("should get application/json for different body in content negotiation", async () => {
    const endPoint = `${serverBasePath}/content-negotiation/different-body`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          headers: {
            accept: "application/json",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.content, pngFile.toString("base64"));
  });

  it("should return error if put wrong accept for different body in content negotiation", async () => {
    const endPoint = `${serverBasePath}/content-negotiation/different-body`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          headers: {
            accept: "wrongAccept",
          },
          validateStatus: function (status: number) {
            return (status >= 200 && status < 300) || status == 400;
          },
        },
      },
    });
    assert.strictEqual(response.status, 400);
    assert.strictEqual((response.data as any).message, "Unsupported Accept header");
    assert.strictEqual((response.data as any).expected, `"image/png" | "application/json"`);
    assert.strictEqual((response.data as any).actual, "wrongAccept");
  });
});
