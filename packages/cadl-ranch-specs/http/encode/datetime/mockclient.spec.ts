import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("encode/datetime endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it(`should get default query`, async () => {
    const endPoint = `${serverBasePath}/encode/datetime/query/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            value: "2022-08-26T18:38:00.000Z",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it(`should get rfc3339 query`, async () => {
    const endPoint = `${serverBasePath}/encode/datetime/query/rfc3339`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            value: "2022-08-26T18:38:00.000Z",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it(`should get rfc7231 query`, async () => {
    const endPoint = `${serverBasePath}/encode/datetime/query/rfc7231`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            value: "Fri, 26 Aug 2022 14:38:00 GMT",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it(`should get unix-timestamp query`, async () => {
    const endPoint = `${serverBasePath}/encode/datetime/query/unix-timestamp`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            value: 1686566864,
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it(`should get unix-timestamp-array query`, async () => {
    const endPoint = `${serverBasePath}/encode/datetime/query/unix-timestamp-array`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            value: [1686566864, 1686734256].join(","),
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  describe("property", () => {
    it(`should post default property`, async () => {
      const endPoint = `${serverBasePath}/encode/datetime/property/default`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            value: "2022-08-26T18:38:00.000Z",
          },
        },
      });
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.data.value, "2022-08-26T18:38:00.000Z");
    });

    it(`should post rfc3339 property`, async () => {
      const endPoint = `${serverBasePath}/encode/datetime/property/rfc3339`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            value: "2022-08-26T18:38:00.000Z",
          },
        },
      });
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.data.value, "2022-08-26T18:38:00.000Z");
    });

    it(`should post rfc7231 property`, async () => {
      const endPoint = `${serverBasePath}/encode/datetime/property/rfc7231`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            value: "Fri, 26 Aug 2022 14:38:00 GMT",
          },
        },
      });
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.data.value, "Fri, 26 Aug 2022 14:38:00 GMT");
    });

    it(`should post unix-timestamp property`, async () => {
      const endPoint = `${serverBasePath}/encode/datetime/property/unix-timestamp`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            value: 1686566864,
          },
        },
      });
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.data.value, 1686566864);
    });

    it(`should post unix-timestamp-array property`, async () => {
      const endPoint = `${serverBasePath}/encode/datetime/property/unix-timestamp-array`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            value: [1686566864, 1686734256],
          },
        },
      });
      assert.strictEqual(response.status, 200);
      assert.deepEqual(response.data.value, [1686566864, 1686734256]);
    });
  });

  describe("header", () => {
    it(`should get default header`, async () => {
      const endPoint = `${serverBasePath}/encode/datetime/header/default`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            headers: {
              value: "Fri, 26 Aug 2022 14:38:00 GMT",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should get rfc3339 header`, async () => {
      const endPoint = `${serverBasePath}/encode/datetime/header/rfc3339`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            headers: {
              value: "2022-08-26T18:38:00.000Z",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should get rfc7231 header`, async () => {
      const endPoint = `${serverBasePath}/encode/datetime/header/rfc7231`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            headers: {
              value: "Fri, 26 Aug 2022 14:38:00 GMT",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should get unix-timestamp header`, async () => {
      const endPoint = `${serverBasePath}/encode/datetime/header/unix-timestamp`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            headers: {
              value: 1686566864,
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should get unix-timestamp-array header`, async () => {
      const endPoint = `${serverBasePath}/encode/datetime/header/unix-timestamp-array`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            headers: {
              value: [1686566864, 1686734256].join(","),
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });
  });

  describe("response header", () => {
    it(`should get default header`, async () => {
      const endPoint = `${serverBasePath}/encode/datetime/responseheader/default`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
      assert.strictEqual(response.headers.value, "Fri, 26 Aug 2022 14:38:00 GMT");
    });

    it(`should get rfc3339 header`, async () => {
      const endPoint = `${serverBasePath}/encode/datetime/responseheader/rfc3339`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
      assert.strictEqual(response.headers.value, "2022-08-26T18:38:00.000Z");
    });

    it(`should get rfc7231 header`, async () => {
      const endPoint = `${serverBasePath}/encode/datetime/responseheader/rfc7231`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
      assert.strictEqual(response.headers.value, "Fri, 26 Aug 2022 14:38:00 GMT");
    });

    it(`should get unix-timestamp header`, async () => {
      const endPoint = `${serverBasePath}/encode/datetime/responseheader/unix-timestamp`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
      assert.strictEqual(response.headers.value, "1686566864");
    });
  });
});
