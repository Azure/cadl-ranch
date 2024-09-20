import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("type/property/additional-properties service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should get extends unknown additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/extendsRecordUnknown`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.name, "ExtendsUnknownAdditionalProperties");
    assert.strictEqual(response.data["prop1"], 32);
    assert.strictEqual(response.data["prop2"], true);
    assert.strictEqual(response.data["prop3"], "abc");
  });

  it("should put extends unknown additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/extendsRecordUnknown`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          name: "ExtendsUnknownAdditionalProperties",
          prop1: 32,
          prop2: true,
          prop3: "abc",
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get extends unknown derived additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/extendsRecordUnknownDerived`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.name, "ExtendsUnknownAdditionalProperties");
    assert.strictEqual(response.data["index"], 314);
    assert.strictEqual(response.data["age"], 2.71875);
    assert.strictEqual(response.data["prop1"], 32);
    assert.strictEqual(response.data["prop2"], true);
    assert.strictEqual(response.data["prop3"], "abc");
  });

  it("should put extends unknown derived additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/extendsRecordUnknownDerived`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          name: "ExtendsUnknownAdditionalProperties",
          index: 314,
          age: 2.71875,
          prop1: 32,
          prop2: true,
          prop3: "abc",
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get extends unknown discriminated additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/extendsUnknownDiscriminated`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.name, "Derived");
    assert.strictEqual(response.data["kind"], "derived");
    assert.strictEqual(response.data["index"], 314);
    assert.strictEqual(response.data["age"], 2.71875);
    assert.strictEqual(response.data["prop1"], 32);
    assert.strictEqual(response.data["prop2"], true);
    assert.strictEqual(response.data["prop3"], "abc");
  });

  it("should put extends unknown discriminated additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/extendsUnknownDiscriminated`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          kind: "derived",
          name: "Derived",
          index: 314,
          age: 2.71875,
          prop1: 32,
          prop2: true,
          prop3: "abc",
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get is unknown additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/isRecordUnknown`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.name, "IsUnknownAdditionalProperties");
    assert.strictEqual(response.data["prop1"], 32);
    assert.strictEqual(response.data["prop2"], true);
    assert.strictEqual(response.data["prop3"], "abc");
  });

  it("should put is unknown additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/isRecordUnknown`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          name: "IsUnknownAdditionalProperties",
          prop1: 32,
          prop2: true,
          prop3: "abc",
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get is unknown derived additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/isRecordUnknownDerived`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.name, "IsUnknownAdditionalProperties");
    assert.strictEqual(response.data["index"], 314);
    assert.strictEqual(response.data["age"], 2.71875);
    assert.strictEqual(response.data["prop1"], 32);
    assert.strictEqual(response.data["prop2"], true);
    assert.strictEqual(response.data["prop3"], "abc");
  });

  it("should put is unknown derived additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/isRecordUnknownDerived`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          name: "IsUnknownAdditionalProperties",
          index: 314,
          age: 2.71875,
          prop1: 32,
          prop2: true,
          prop3: "abc",
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get is unknown discriminated additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/isUnknownDiscriminated`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.name, "Derived");
    assert.strictEqual(response.data["kind"], "derived");
    assert.strictEqual(response.data["index"], 314);
    assert.strictEqual(response.data["age"], 2.71875);
    assert.strictEqual(response.data["prop1"], 32);
    assert.strictEqual(response.data["prop2"], true);
    assert.strictEqual(response.data["prop3"], "abc");
  });

  it("should put is unknown discriminated additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/isUnknownDiscriminated`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          kind: "derived",
          name: "Derived",
          index: 314,
          age: 2.71875,
          prop1: 32,
          prop2: true,
          prop3: "abc",
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get extends string additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/extendsRecordString`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.name, "ExtendsStringAdditionalProperties");
    assert.strictEqual(response.data["prop"], "abc");
  });

  it("should put extends string additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/extendsRecordString`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          name: "ExtendsStringAdditionalProperties",
          prop: "abc",
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get is string additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/isRecordstring`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.name, "IsStringAdditionalProperties");
    assert.strictEqual(response.data["prop"], "abc");
  });

  it("should put is string additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/isRecordstring`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          name: "IsStringAdditionalProperties",
          prop: "abc",
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get extends float additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/extendsRecordFloat`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.id, 43.125);
    assert.strictEqual(response.data["prop"], 43.125);
  });

  it("should put extends float additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/extendsRecordFloat`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          id: 43.125,
          prop: 43.125,
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get is float additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/isRecordFloat`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.id, 43.125);
    assert.strictEqual(response.data["prop"], 43.125);
  });

  it("should put is float additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/isRecordFloat`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          id: 43.125,
          prop: 43.125,
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get extends model additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/extendsRecordModel`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data["prop"]?.state, "ok");
  });

  it("should put extends model additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/extendsRecordModel`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          prop: { state: "ok" },
          knownProp: { state: "ok" },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get is model additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/isRecordModel`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data["prop"]?.state, "ok");
  });

  it("should put is model additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/isRecordModel`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          prop: { state: "ok" },
          knownProp: { state: "ok" },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get extends model array additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/extendsRecordModelArray`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    response.data["prop"]?.forEach((item: any) => {
      assert.strictEqual(item.state, "ok");
    });
  });

  it("should put extends model array additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/extendsRecordModelArray`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          prop: [{ state: "ok" }, { state: "ok" }],
          knownProp: [{ state: "ok" }, { state: "ok" }],
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get is model array additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/isRecordModelArray`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    response.data["prop"]?.forEach((item: any) => {
      assert.strictEqual(item.state, "ok");
    });
  });

  it("should put is model array additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/isRecordModelArray`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          prop: [{ state: "ok" }, { state: "ok" }],
          knownProp: [{ state: "ok" }, { state: "ok" }],
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get spread record string additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/isRecordModelArray`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            name: "SpreadSpringRecord",
            prop: "abc",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("should put spread record string additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadRecordString`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          name: "SpreadSpringRecord",
          prop: "abc",
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get spread record float additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadRecordFloat`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            id: 43.125,
            prop: 43.125,
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("should put spread record float additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadRecordFloat`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          id: 43.125,
          prop: 43.125,
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get spread record model additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadRecordModel`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            prop: { state: "ok" },
            knownProp: { state: "ok" },
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("should put spread record model additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadRecordModel`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          prop: { state: "ok" },
          knownProp: { state: "ok" },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get spread record model array additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadRecordModelArray`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            knownProp: [{ state: "ok" }, { state: "ok" }],
            prop: [{ state: "ok" }, { state: "ok" }],
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("should put spread record model array additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadRecordModelArray`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          knownProp: [{ state: "ok" }, { state: "ok" }],
          prop: [{ state: "ok" }, { state: "ok" }],
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get spread different record string additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadDifferentRecordString`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            id: 43.125,
            prop: "abc",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("should put spread different record string additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadDifferentRecordString`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          id: 43.125,
          prop: "abc",
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get spread different record float additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadDifferentRecordFloat`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            name: "abc",
            prop: 43.125,
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("should put spread different record float additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadDifferentRecordFloat`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          name: "abc",
          prop: 43.125,
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get spread different record model additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadDifferentRecordModel`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            knownProp: "abc",
            prop: { state: "ok" },
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("should put spread different record model additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadDifferentRecordModel`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          knownProp: "abc",
          prop: { state: "ok" },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get spread different record model array additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadDifferentRecordModelArray`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            knownProp: "abc",
            prop: [{ state: "ok" }, { state: "ok" }],
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("should put spread different record model array additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadDifferentRecordModelArray`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          knownProp: "abc",
          prop: [{ state: "ok" }, { state: "ok" }],
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get extends different spread string additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/extendsDifferentSpreadString`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            id: 43.125,
            prop: "abc",
            derivedProp: "abc",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("should put extends different spread string additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/extendsDifferentSpreadString`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          id: 43.125,
          prop: "abc",
          derivedProp: "abc",
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get extends different spread float additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/extendsDifferentSpreadFloat`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            name: "abc",
            prop: 43.125,
            derivedProp: 43.125,
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("should put extends different spread float additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/extendsDifferentSpreadFloat`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          name: "abc",
          prop: 43.125,
          derivedProp: 43.125,
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get extends different spread model additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/extendsDifferentSpreadModel`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            knownProp: "abc",
            prop: { state: "ok" },
            derivedProp: { state: "ok" },
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("should put extends different spread model additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/extendsDifferentSpreadModel`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          knownProp: "abc",
          prop: { state: "ok" },
          derivedProp: { state: "ok" },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get extends different spread model array additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/extendsDifferentSpreadModelArray`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            knownProp: "abc",
            prop: [{ state: "ok" }, { state: "ok" }],
            derivedProp: [{ state: "ok" }, { state: "ok" }],
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("should put extends different spread model array additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/extendsDifferentSpreadModelArray`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          knownProp: "abc",
          prop: [{ state: "ok" }, { state: "ok" }],
          derivedProp: [{ state: "ok" }, { state: "ok" }],
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get multiple spread record additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/multipleSpreadRecord`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            flag: true,
            prop1: "abc",
            prop2: 43.125,
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("should put multiple spread record additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/multipleSpreadRecord`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          flag: true,
          prop1: "abc",
          prop2: 43.125,
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get spread record union additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadRecordUnion`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            flag: true,
            prop1: "abc",
            prop2: 43.125,
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("should put spread record union additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadRecordUnion`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          flag: true,
          prop1: "abc",
          prop2: 43.125,
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get spread record discriminate union additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadRecordDiscriminatedUnion`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            name: "abc",
            prop1: {
              kind: "kind0",
              fooProp: "abc",
            },
            prop2: {
              kind: "kind1",
              start: "2021-01-01T00:00:00Z",
              end: "2021-01-02T00:00:00Z",
            },
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("should put spread record discriminate union additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadRecordDiscriminatedUnion`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          name: "abc",
          prop1: {
            kind: "kind0",
            fooProp: "abc",
          },
          prop2: {
            kind: "kind1",
            start: "2021-01-01T00:00:00Z",
            end: "2021-01-02T00:00:00Z",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get spread record nondiscriminate union additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadRecordNonDiscriminatedUnion`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            name: "abc",
            prop1: {
              kind: "kind0",
              fooProp: "abc",
            },
            prop2: {
              kind: "kind1",
              start: "2021-01-01T00:00:00Z",
              end: "2021-01-02T00:00:00Z",
            },
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("should put spread record nondiscriminate union additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadRecordNonDiscriminatedUnion`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          name: "abc",
          prop1: {
            kind: "kind0",
            fooProp: "abc",
          },
          prop2: {
            kind: "kind1",
            start: "2021-01-01T00:00:00Z",
            end: "2021-01-02T00:00:00Z",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get spread record nondiscriminate union2 additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadRecordNonDiscriminatedUnion2`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            name: "abc",
            prop1: {
              kind: "kind1",
              start: "2021-01-01T00:00:00Z",
            },
            prop2: {
              kind: "kind1",
              start: "2021-01-01T00:00:00Z",
              end: "2021-01-02T00:00:00Z",
            },
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("should put spread record nondiscriminate union2 additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadRecordNonDiscriminatedUnion2`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          name: "abc",
          prop1: {
            kind: "kind1",
            start: "2021-01-01T00:00:00Z",
          },
          prop2: {
            kind: "kind1",
            start: "2021-01-01T00:00:00Z",
            end: "2021-01-02T00:00:00Z",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get spread record nondiscriminate union3 additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadRecordNonDiscriminatedUnion3`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            name: "abc",
            prop1: [
              {
                kind: "kind1",
                start: "2021-01-01T00:00:00Z",
              },
              {
                kind: "kind1",
                start: "2021-01-01T00:00:00Z",
              },
            ],
            prop2: {
              kind: "kind1",
              start: "2021-01-01T00:00:00Z",
              end: "2021-01-02T00:00:00Z",
            },
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("should put spread record nondiscriminate union3 additional properties", async () => {
    const endPoint = `${serverBasePath}/type/property/additionalProperties/spreadRecordNonDiscriminatedUnion3`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          name: "abc",
          prop1: [
            {
              kind: "kind1",
              start: "2021-01-01T00:00:00Z",
            },
            {
              kind: "kind1",
              start: "2021-01-01T00:00:00Z",
            },
          ],
          prop2: {
            kind: "kind1",
            start: "2021-01-01T00:00:00Z",
            end: "2021-01-02T00:00:00Z",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });
});
