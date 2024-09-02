import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, matrix, SERVICE_CALL_TYPE } from "../../helper.js";

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
    defaultValue: { k1: 1, k2: 2 },
  },
  {
    type: "int64",
    defaultValue: { k1: Number.MAX_SAFE_INTEGER, k2: Number.MIN_SAFE_INTEGER },
  },
  {
    type: "boolean",
    defaultValue: { k1: true, k2: false },
  },
  {
    type: "string",
    defaultValue: { k1: "hello", k2: "" },
  },
  {
    type: "float32",
    defaultValue: { k1: 43.125 },
  },
  {
    type: "datetime",
    defaultValue: { k1: "2022-08-26T18:38:00Z" },
  },
  {
    type: "duration",
    defaultValue: { k1: "P123DT22H14M12.011S" },
  },
  {
    type: "unknown",
    defaultValue: { k1: 1, k2: "hello", k3: null },
  },
  {
    type: "model",
    defaultValue: { k1: { property: "hello" }, k2: { property: "world" } },
  },
  {
    type: "model/recursive",
    defaultValue: {
      k1: { property: "hello", children: {} },
      k2: {
        property: "world",
        children: { "k2.1": { property: "inner world" } },
      },
    },
  },
  {
    type: "nullable-float",
    defaultValue: { k1: 1.25, k2: 0.5, k3: null },
  },
];

describe("type/dictionary service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  matrix([testedTypes], async (params: TypeDetail) => {
    it(`should get a ${params.type} value`, async () => {
      const endPoint = `${serverBasePath}/type/dictionary/${params.type}`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 200);
      assert.deepEqual(response.data, params.defaultValue);
    });

    it(`should put a ${params.type} value`, async () => {
      const endPoint = `${serverBasePath}/type/dictionary/${params.type}`;
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
