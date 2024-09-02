import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, matrix, SERVICE_CALL_TYPE } from "../../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("type/property/optionality service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should get all string", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/string/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.property, "hello");
  });

  it("should get default string", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/string/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, {});
  });

  it("should put all string", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/string/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: { property: "hello" },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should put default string", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/string/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {},
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get all bytes", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/bytes/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.property, "aGVsbG8sIHdvcmxkIQ==");
  });

  it("should get default bytes", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/bytes/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, {});
  });

  it("should put all bytes", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/bytes/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: { property: "aGVsbG8sIHdvcmxkIQ==" },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should put default bytes", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/bytes/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {},
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get all datetime", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/datetime/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.property, "2022-08-26T18:38:00Z");
  });

  it("should get default datetime", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/datetime/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, {});
  });

  it("should put all datetime", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/datetime/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: { property: "2022-08-26T18:38:00Z" },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should put default datetime", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/datetime/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {},
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get all duration", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/duration/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.property, "P123DT22H14M12.011S");
  });

  it("should get default duration", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/duration/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, {});
  });

  it("should put all duration", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/duration/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: { property: "P123DT22H14M12.011S" },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should put default duration", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/duration/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {},
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get all plainDate", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/plainDate/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.property, "2022-12-12");
  });

  it("should get default plainDate", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/plainDate/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, {});
  });

  it("should put all plainDate", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/plainDate/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: { property: "2022-12-12" },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should put default plainDate", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/plainDate/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {},
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get all plainTime", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/plainTime/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.property, "13:06:12");
  });

  it("should get default plainTime", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/plainTime/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, {});
  });

  it("should put all plainTime", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/plainTime/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: { property: "13:06:12" },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should put default plainTime", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/plainTime/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {},
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get all collections bytes", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/collections/bytes/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.property?.length, 2);
  });

  it("should get default collections bytes", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/collections/bytes/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, {});
  });

  it("should put all collections bytes", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/collections/bytes/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: { property: ["aGVsbG8sIHdvcmxkIQ==", "aGVsbG8sIHdvcmxkIQ=="] },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should put default collections bytes", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/collections/bytes/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {},
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get all collections model", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/collections/model/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.property?.length, 2);
  });

  it("should get default collections model", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/collections/model/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, {});
  });

  it("should put all collections model", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/collections/model/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: { property: [{ property: "hello" }, { property: "world" }] },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should put default collections model", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/collections/model/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {},
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get all string literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/string/literal/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.property, "hello");
  });

  it("should get default string literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/string/literal/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, {});
  });

  it("should put all string literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/string/literal/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: { property: "hello" },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should put default string literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/string/literal/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {},
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get all int literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/int/literal/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.property, 1);
  });

  it("should get default int literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/int/literal/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, {});
  });

  it("should put all int literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/int/literal/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: { property: 1 },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should put default int literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/int/literal/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {},
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get all float literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/float/literal/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.property, 1.25);
  });

  it("should get default float literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/float/literal/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, {});
  });

  it("should put all float literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/float/literal/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: { property: 1.25 },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should put default float literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/float/literal/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {},
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get all boolean literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/boolean/literal/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.property, true);
  });

  it("should get default boolean literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/boolean/literal/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, {});
  });

  it("should put all boolean literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/boolean/literal/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: { property: true },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should put default boolean literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/boolean/literal/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {},
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get all union string literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/union/string/literal/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.property, "world");
  });

  it("should get default union string literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/union/string/literal/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, {});
  });

  it("should put all union string literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/union/string/literal/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: { property: "world" },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should put default union string literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/union/string/literal/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {},
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get all union int literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/union/int/literal/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.property, 2);
  });

  it("should get default union int literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/union/int/literal/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, {});
  });

  it("should put all union int literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/union/int/literal/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: { property: 2 },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should put default union int literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/union/int/literal/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {},
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get all union float literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/union/float/literal/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.property, 2.375);
  });

  it("should get default union float literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/union/float/literal/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, {});
  });

  it("should put all union float literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/union/float/literal/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: { property: 2.375 },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should put default union float literal", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/union/float/literal/default`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {},
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get models that will return all properties in the model", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/requiredAndOptional/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.optionalProperty, "hello");
    assert.strictEqual(response.data.requiredProperty, 42);
  });

  it("should get models that will return only the required properties", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/requiredAndOptional/requiredOnly`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.requiredProperty, 42);
  });

  it("should put a body with all properties present", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/requiredAndOptional/all`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          requiredProperty: 42,
          optionalProperty: "hello",
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should put a body with only required properties", async () => {
    const endPoint = `${serverBasePath}/type/property/optional/requiredAndOptional/requiredOnly`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          requiredProperty: 42,
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });
});
