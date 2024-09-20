import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, matrix, SERVICE_CALL_TYPE } from "../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

interface TypeDetail {
  type: string;
  defaultValue: any;
  convertedToFn?: (_: any) => any;
}

const testedTypes: TypeDetail[] = [
  {
    type: "int32",
    defaultValue: [1, 2],
  },
  {
    type: "int64",
    defaultValue: [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER],
  },
  {
    type: "boolean",
    defaultValue: [true, false],
  },
  {
    type: "string",
    defaultValue: ["hello", ""],
  },
  {
    type: "float32",
    defaultValue: [43.125],
  },
  {
    type: "datetime",
    defaultValue: ["2022-08-26T18:38:00Z"],
  },
  {
    type: "duration",
    defaultValue: ["P123DT22H14M12.011S"],
  },
  {
    type: "unknown",
    defaultValue: [1, "hello", null],
  },
  {
    type: "model",
    defaultValue: [{ property: "hello" }, { property: "world" }],
  },
  {
    type: "nullable-float",
    defaultValue: [1.25, null, 3.0],
  },
  {
    type: "nullable-boolean",
    defaultValue: [true, null, false],
  },
  {
    type: "nullable-int32",
    defaultValue: [1, null, 3],
  },
  {
    type: "nullable-string",
    defaultValue: ["hello", null, "world"],
  },
  {
    type: "nullable-model",
    defaultValue: [{ property: "hello" }, null, { property: "world" }],
  },
];

describe("type/array service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  matrix([testedTypes], async (params: TypeDetail) => {
    it(`should get a ${params.type} value`, async () => {
      const endPoint = `${serverBasePath}/type/array/${params.type}`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 200);
      assert.deepEqual(response.data, params.defaultValue);
    });

    it(`should put a ${params.type} value`, async () => {
      const endPoint = `${serverBasePath}/type/array/${params.type}`;
      let property;
      if (params.convertedToFn) {
        property = params.convertedToFn(params.defaultValue);
      } else {
        property = params.defaultValue;
      }
      const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
        endPoint,
        options: {
          requestBody: property,
        },
      });
      assert.strictEqual(response.status, 204);
    });
  });
});
