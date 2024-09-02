import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, matrix, SERVICE_CALL_TYPE } from "../../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

interface TypeDetail {
  type: string;
  defaultValue: any;
  convertedToFn?: (_: any) => any;
}

const testedTypes: TypeDetail[] = [
  {
    type: "boolean",
    defaultValue: true,
  },
  {
    type: "string",
    defaultValue: "hello",
  },
  {
    type: "bytes",
    defaultValue: "aGVsbG8sIHdvcmxkIQ==",
  },
  {
    type: "int",
    defaultValue: 42,
  },
  {
    type: "float",
    defaultValue: 43.125,
  },
  {
    type: "decimal",
    defaultValue: 0.33333,
  },
  {
    type: "decimal128",
    defaultValue: 0.33333,
  },
  {
    type: "datetime",
    defaultValue: "2022-08-26T18:38:00Z",
    convertedToFn: (value: string) => new Date(value).toISOString(),
  },
  {
    type: "duration",
    defaultValue: "P123DT22H14M12.011S",
  },
  {
    type: "enum",
    defaultValue: "ValueOne",
  },
  {
    type: "extensible-enum",
    defaultValue: "UnknownValue",
  },
  {
    type: "model",
    defaultValue: { property: "hello" },
  },
  {
    type: "collections/string",
    defaultValue: ["hello", "world"],
  },
  {
    type: "collections/int",
    defaultValue: [1, 2],
  },
  {
    type: "collections/model",
    defaultValue: [{ property: "hello" }, { property: "world" }],
  },
  {
    type: "dictionary/string",
    defaultValue: { k1: "hello", k2: "world" },
  },
  {
    type: "never",
    defaultValue: undefined,
  },
  {
    type: "unknown/string",
    defaultValue: "hello",
  },
  {
    type: "unknown/int",
    defaultValue: 42,
  },
  {
    type: "unknown/dict",
    defaultValue: { k1: "hello", k2: 42 },
  },
  {
    type: "unknown/array",
    defaultValue: ["hello", "world"],
  },
  {
    type: "string/literal",
    defaultValue: "hello",
  },
  {
    type: "int/literal",
    defaultValue: 42,
  },
  {
    type: "float/literal",
    defaultValue: 43.125,
  },
  {
    type: "boolean/literal",
    defaultValue: true,
  },
  {
    type: "union/string/literal",
    defaultValue: "world",
  },
  {
    type: "union/int/literal",
    defaultValue: 42,
  },
  {
    type: "union/float/literal",
    defaultValue: 46.875,
  },
  {
    type: "union-enum-value",
    defaultValue: "value2",
  },
];

describe("type/property/value-types service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  matrix([testedTypes], async (params: TypeDetail) => {
    it(`should get a ${params.type} value`, async () => {
      const endPoint = `${serverBasePath}/type/property/value-types/${params.type}`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 200);
      assert.deepEqual(response.data.property, params.defaultValue);
    });

    it(`should put a ${params.type} value`, async () => {
      const endPoint = `${serverBasePath}/type/property/value-types/${params.type}`;
      let property;
      if (params.convertedToFn) {
        property = params.convertedToFn(params.defaultValue);
      } else {
        property = params.defaultValue;
      }
      const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
        endPoint,
        options: {
          requestBody: {
            property,
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });
  });
});
