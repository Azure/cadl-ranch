import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, matrix, SERVICE_CALL_TYPE } from "../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("type/union service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should get strings only union", async () => {
    const endPoint = `${serverBasePath}/type/union/strings-only`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.prop, "b");
  });

  it("should post strings only union", async () => {
    const endPoint = `${serverBasePath}/type/union/strings-only`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          prop: "b",
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get strings extensible union", async () => {
    const endPoint = `${serverBasePath}/type/union/string-extensible`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.prop, "custom");
  });

  it("should post strings extensible union", async () => {
    const endPoint = `${serverBasePath}/type/union/string-extensible`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          prop: "custom",
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get strings extensible named union", async () => {
    const endPoint = `${serverBasePath}/type/union/string-extensible-named`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.prop, "custom");
  });

  it("should post strings extensible named union", async () => {
    const endPoint = `${serverBasePath}/type/union/string-extensible-named`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          prop: "custom",
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get ints only union", async () => {
    const endPoint = `${serverBasePath}/type/union/ints-only`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.prop, 2);
  });

  it("should post ints only union", async () => {
    const endPoint = `${serverBasePath}/type/union/ints-only`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          prop: 2,
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get floats only union", async () => {
    const endPoint = `${serverBasePath}/type/union/floats-only`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.prop, 2.2);
  });

  it("should post floats only union", async () => {
    const endPoint = `${serverBasePath}/type/union/floats-only`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          prop: 2.2,
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get models only union", async () => {
    const endPoint = `${serverBasePath}/type/union/models-only`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.prop.name, "test");
  });

  it("should post models only union", async () => {
    const endPoint = `${serverBasePath}/type/union/models-only`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          prop: { name: "test" },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get enums only union", async () => {
    const endPoint = `${serverBasePath}/type/union/enums-only`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.prop.lr, "right");
    assert.strictEqual(response.data.prop.ud, "up");
  });

  it("should post enums only union", async () => {
    const endPoint = `${serverBasePath}/type/union/enums-only`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          prop: {
            lr: "right",
            ud: "up",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get string and array union", async () => {
    const endPoint = `${serverBasePath}/type/union/string-and-array`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.prop.string, "test");
    assert.strictEqual(response.data.prop.array[0], "test1");
    assert.strictEqual(response.data.prop.array[1], "test2");
  });

  it("should post string and array union", async () => {
    const endPoint = `${serverBasePath}/type/union/string-and-array`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          prop: {
            string: "test",
            array: ["test1", "test2"],
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get mixed literals union", async () => {
    const endPoint = `${serverBasePath}/type/union/mixed-literals`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.prop.stringLiteral, "a");
    assert.strictEqual(response.data.prop.intLiteral, 2);
    assert.strictEqual(response.data.prop.floatLiteral, 3.3);
    assert.strictEqual(response.data.prop.booleanLiteral, true);
  });

  it("should post mixed literals union", async () => {
    const endPoint = `${serverBasePath}/type/union/mixed-literals`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          prop: {
            stringLiteral: "a",
            intLiteral: 2,
            floatLiteral: 3.3,
            booleanLiteral: true,
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get mixed types union", async () => {
    const endPoint = `${serverBasePath}/type/union/mixed-types`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.prop.model.name, "test");
    assert.strictEqual(response.data.prop.literal, "a");
    assert.strictEqual(response.data.prop.int, 2);
    assert.strictEqual(response.data.prop.boolean, true);
  });

  it("should post mixed types union", async () => {
    const endPoint = `${serverBasePath}/type/union/mixed-types`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          prop: {
            model: {
              name: "test",
            },
            literal: "a",
            int: 2,
            boolean: true,
            array: [
              {
                name: "test",
              },
              "a",
              2,
              true,
            ],
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });
});
