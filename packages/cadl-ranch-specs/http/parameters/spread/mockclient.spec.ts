import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("parameters/spread service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should spread named model", async () => {
    const endPoint = `${serverBasePath}/parameters/spread/model/request-body`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: { name: "foo" },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should spread model composite request only with body param", async () => {
    const endPoint = `${serverBasePath}/parameters/spread/model/composite-request-only-with-body`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: { name: "foo" },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should spread model composite request without body param", async () => {
    const endPoint = `${serverBasePath}/parameters/spread/model/composite-request-without-body/foo`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        config: {
          headers: {
            "test-header": "bar",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should spread model composite request", async () => {
    const endPoint = `${serverBasePath}/parameters/spread/model/composite-request/foo`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          name: "foo",
        },
        config: {
          headers: {
            "test-header": "bar",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should spread model composite request mix", async () => {
    const endPoint = `${serverBasePath}/parameters/spread/model/composite-request-mix/foo`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          prop: "foo",
        },
        config: {
          headers: {
            "test-header": "bar",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should spread alias with only body param", async () => {
    const endPoint = `${serverBasePath}/parameters/spread/alias/request-body`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          name: "foo",
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should spread alias with mixed params", async () => {
    const endPoint = `${serverBasePath}/parameters/spread/alias/request-parameter/1`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          name: "foo",
        },
        config: {
          headers: {
            "x-ms-test-header": "bar",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should spread alias with more than 5 params", async () => {
    const endPoint = `${serverBasePath}/parameters/spread/alias/multiple-parameters/1`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          requiredString: "foo",
          optionalInt: 1,
          requiredIntList: [1, 2],
          optionalStringList: ["foo", "bar"],
        },
        config: {
          headers: {
            "x-ms-test-header": "bar",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should spread alias with inner-model-parameter", async () => {
    const endPoint = `${serverBasePath}/parameters/spread/alias/inner-model-parameter/1`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          name: "foo",
        },
        config: {
          headers: {
            "x-ms-test-header": "bar",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should spread alias with inner-alias-parameter", async () => {
    const endPoint = `${serverBasePath}/parameters/spread/alias/inner-alias-parameter/1`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          name: "foo",
          age: 1,
        },
        config: {
          headers: {
            "x-ms-test-header": "bar",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });
});
