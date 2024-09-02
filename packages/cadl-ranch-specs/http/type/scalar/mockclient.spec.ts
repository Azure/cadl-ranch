import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, matrix, SERVICE_CALL_TYPE } from "../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("type/scalar service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should get string value", async () => {
    const endPoint = `${serverBasePath}/type/scalar/string`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data, "test");
  });

  it("should put string value", async () => {
    const endPoint = `${serverBasePath}/type/scalar/string`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: "test",
        config: {
          headers: {
            "Content-Type": "text/plain",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get boolean value", async () => {
    const endPoint = `${serverBasePath}/type/scalar/boolean`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data, true);
  });

  it("should put boolean value", async () => {
    const endPoint = `${serverBasePath}/type/scalar/boolean`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: true,
        config: {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get unknown value", async () => {
    const endPoint = `${serverBasePath}/type/scalar/unknown`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data, "test");
  });

  it("should put unknown value", async () => {
    const endPoint = `${serverBasePath}/type/scalar/unknown`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: "test",
        config: {
          headers: {
            "Content-Type": "text/plain",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get decimal response body", async () => {
    const endPoint = `${serverBasePath}/type/scalar/decimal/response_body`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data, 0.33333);
  });

  it("should put decimal request body", async () => {
    const endPoint = `${serverBasePath}/type/scalar/decimal/resquest_body`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: 0.33333,
        config: {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get decimal request parameter", async () => {
    const endPoint = `${serverBasePath}/type/scalar/decimal/request_parameter`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: { value: 0.33333 },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get decimal128 response body", async () => {
    const endPoint = `${serverBasePath}/type/scalar/decimal128/response_body`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data, 0.33333);
  });

  it("should put decimal128 request body", async () => {
    const endPoint = `${serverBasePath}/type/scalar/decimal128/resquest_body`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: 0.33333,
        config: {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get decimal128 request parameter", async () => {
    const endPoint = `${serverBasePath}/type/scalar/decimal128/request_parameter`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: { value: 0.33333 },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should fail to post decimal verify", async () => {
    let endPoint = `${serverBasePath}/type/scalar/decimal/prepare_verify`;
    const getResult = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    let total = 0;
    getResult.data.forEach((decimal: number) => {
      total += decimal;
    });
    total = Math.round(total * 10) / 10;
    endPoint = `${serverBasePath}/type/scalar/decimal/verify`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: total,
        config: {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should fail to post decimal128 verify", async () => {
    let endPoint = `${serverBasePath}/type/scalar/decimal128/prepare_verify`;
    const getResult = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    let total = 0;
    getResult.data.forEach((decimal: number) => {
      total += decimal;
    });
    endPoint = `${serverBasePath}/type/scalar/decimal128/verify`;
    total = Math.round(total * 10) / 10;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: total,
        config: {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });
});
