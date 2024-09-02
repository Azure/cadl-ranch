import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("type/model/empty service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it(`should put empty model`, async () => {
    const endPoint = `${serverBasePath}/type/model/empty/alone`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {},
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it(`should get empty model`, async () => {
    const endPoint = `${serverBasePath}/type/model/empty/alone`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.isEmpty(response.data);
  });

  it(`should post round-trip empty model`, async () => {
    const endPoint = `${serverBasePath}/type/model/empty/round-trip`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {},
      },
    });
    assert.strictEqual(response.status, 200);
    assert.isEmpty(response.data);
  });
});
