import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("encode/duration endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  describe("property", () => {
    it(`should post default property`, async () => {
      const endPoint = `${serverBasePath}/encode/duration/property/default`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            value: "P40D",
          },
        },
      });
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.data.value, "P40D");
    });

    it(`should post float-seconds property`, async () => {
      const endPoint = `${serverBasePath}/encode/duration/property/float-seconds`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            value: 35.625,
          },
        },
      });
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.data.value, 35.625);
    });

    it(`should post float64-seconds property`, async () => {
      const endPoint = `${serverBasePath}/encode/duration/property/float64-seconds`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            value: 35.625,
          },
        },
      });
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.data.value, 35.625);
    });

    it(`should post int32-seconds property`, async () => {
      const endPoint = `${serverBasePath}/encode/duration/property/int32-seconds`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            value: 36,
          },
        },
      });
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.data.value, 36);
    });

    it(`should post iso8601 property`, async () => {
      const endPoint = `${serverBasePath}/encode/duration/property/iso8601`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            value: "P40D",
          },
        },
      });
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.data.value, "P40D");
    });

    it(`should post float-seconds-array property`, async () => {
      const endPoint = `${serverBasePath}/encode/duration/property/float-seconds-array`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            value: [35.625, 46.75],
          },
        },
      });
      assert.strictEqual(response.status, 200);
      assert.deepEqual(response.data.value, [35.625, 46.75]);
    });
  });

  describe("query", () => {
    it(`should get default query`, async () => {
      const endPoint = `${serverBasePath}/encode/duration/query/default`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              input: "P40D",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should get iso8601 query`, async () => {
      const endPoint = `${serverBasePath}/encode/duration/query/iso8601`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              input: "P40D",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should get int32-seconds query`, async () => {
      const endPoint = `${serverBasePath}/encode/duration/query/int32-seconds`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              input: 36,
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should get int32-seconds-array query`, async () => {
      const endPoint = `${serverBasePath}/encode/duration/query/int32-seconds-array`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              input: [36, 47].join(","),
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should get float-seconds query`, async () => {
      const endPoint = `${serverBasePath}/encode/duration/query/float-seconds`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              input: 35.625,
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should get float64-seconds query`, async () => {
      const endPoint = `${serverBasePath}/encode/duration/query/float64-seconds`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              input: 35.625,
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });
  });

  describe("header", () => {
    it(`should get default header`, async () => {
      const endPoint = `${serverBasePath}/encode/duration/header/default`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            headers: {
              duration: "P40D",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should get iso8601 header`, async () => {
      const endPoint = `${serverBasePath}/encode/duration/header/iso8601`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            headers: {
              duration: "P40D",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should get iso8601-array header`, async () => {
      const endPoint = `${serverBasePath}/encode/duration/header/iso8601-array`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            headers: {
              duration: ["P40D", "P50D"].join(","),
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should get int32-seconds header`, async () => {
      const endPoint = `${serverBasePath}/encode/duration/header/int32-seconds`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            headers: {
              duration: 36,
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should get float-seconds header`, async () => {
      const endPoint = `${serverBasePath}/encode/duration/header/float-seconds`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            headers: {
              duration: 35.625,
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should get float64-seconds header`, async () => {
      const endPoint = `${serverBasePath}/encode/duration/header/float64-seconds`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            headers: {
              duration: 35.625,
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });
  });
});
