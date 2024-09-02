import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("special-words service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  describe("operations", () => {
    it("should get special words for operation `and`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/and`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `as`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/as`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `assert`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/assert`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `async`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/async`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `await`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/await`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `break`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/break`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `class`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/class`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `constructor`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/constructor`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `continue`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/continue`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `def`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/def`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `del`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/del`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `elif`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/elif`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `else`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/else`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `except`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/except`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `exec`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/exec`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `finally`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/finally`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `for`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/for`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `from`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/from`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `global`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/global`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `if`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/if`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `import`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/import`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `in`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/in`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `is`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/is`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `lambda`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/lambda`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `not`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/not`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `or`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/or`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `pass`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/pass`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `raise`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/raise`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `return`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/return`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `try`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/try`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `while`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/while`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `with`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/with`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `yield`", async () => {
      const endPoint = `${serverBasePath}/special-words/operations/yield`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });
  });

  describe("parameters", () => {
    it("should get special words for operation `and`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/and`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              and: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `as`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/as`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              as: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `assert`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/assert`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              assert: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `async`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/async`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              async: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `await`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/await`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              await: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `break`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/break`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              break: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `class`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/class`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              class: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `constructor`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/constructor`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              constructor: "ok" as any,
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `continue`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/continue`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              continue: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `def`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/def`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              def: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `del`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/del`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              del: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `elif`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/elif`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              elif: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `else`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/else`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              else: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `except`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/except`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              except: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `exec`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/exec`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              exec: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `finally`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/finally`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              finally: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `for`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/for`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              for: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `from`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/from`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              from: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `global`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/global`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              global: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `if`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/if`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              if: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `import`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/import`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              import: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `in`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/in`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              in: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `is`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/is`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              is: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `lambda`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/lambda`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              lambda: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `not`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/not`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              not: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `or`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/or`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              or: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `pass`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/pass`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              pass: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `raise`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/raise`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              raise: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `return`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/return`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              return: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `try`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/try`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              try: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `while`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/while`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              while: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `with`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/with`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              with: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `yield`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/yield`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              yield: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `cancellationToken`", async () => {
      const endPoint = `${serverBasePath}/special-words/parameters/cancellationToken`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
        options: {
          config: {
            params: {
              cancellationToken: "ok",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });
  });

  describe("models", () => {
    it("should get special words for operation `and`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/and`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `as`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/as`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `assert`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/assert`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `async`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/async`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `await`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/await`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `break`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/break`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `class`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/class`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `constructor`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/constructor`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `continue`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/continue`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `def`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/def`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `del`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/del`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `elif`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/elif`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `else`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/else`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `except`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/except`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `exec`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/exec`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `finally`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/finally`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `for`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/for`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `from`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/from`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `global`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/global`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `if`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/if`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `import`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/import`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `in`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/in`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `is`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/is`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `lambda`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/lambda`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `not`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/not`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `or`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/or`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `pass`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/pass`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `raise`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/raise`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `return`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/return`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `try`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/try`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `while`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/while`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `with`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/with`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("should get special words for operation `yield`", async () => {
      const endPoint = `${serverBasePath}/special-words/models/yield`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            name: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });
  });

  describe("model properties", () => {
    it("should post special words for operation `same-as-model`", async () => {
      const endPoint = `${serverBasePath}/special-words/model-properties/same-as-model`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: {
            SameAsModel: "ok",
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });
  });
});
