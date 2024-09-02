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
    type: "string",
    defaultValue: "hello",
  },
  {
    type: "bytes",
    defaultValue: "aGVsbG8sIHdvcmxkIQ==",
  },
  {
    type: "datetime",
    defaultValue: "2022-08-26T18:38:00Z",
  },
  {
    type: "duration",
    defaultValue: "P123DT22H14M12.011S",
  },
  {
    type: "collections/bytes",
    defaultValue: ["aGVsbG8sIHdvcmxkIQ==", "aGVsbG8sIHdvcmxkIQ=="],
  },
  {
    type: "collections/model",
    defaultValue: [{ property: "hello" }, { property: "world" }],
  },
  {
    type: "collections/string",
    defaultValue: ["hello", "world"],
  },
];

describe("type/property/nullable service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  matrix([testedTypes], async (params: TypeDetail) => {
    it(`should get a null value for nullable ${params.type}`, async () => {
      const endPoint = `${serverBasePath}/type/property/nullable/${params.type}/null`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.data.nullableProperty, null);
      assert.deepEqual(response.data.requiredProperty, "foo");
    });

    it(`should get a non-null value for nullable ${params.type}`, async () => {
      const endPoint = `${serverBasePath}/type/property/nullable/${params.type}/non-null`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 200);
      assert.deepEqual(response.data.nullableProperty, params.defaultValue);
      assert.deepEqual(response.data.requiredProperty, "foo");
    });

    it(`should patch a null value for nullable ${params.type}`, async () => {
      const endPoint = `${serverBasePath}/type/property/nullable/${params.type}/null`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.patch, {
        endPoint,
        options: {
          requestBody: {
            requiredProperty: "foo",
            nullableProperty: null,
          },
          config: {
            headers: {
              "Content-Type": "application/merge-patch+json",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it(`should patch a non-null value for nullable ${params.type}`, async () => {
      const endPoint = `${serverBasePath}/type/property/nullable/${params.type}/non-null`;
      let property;
      if (params.convertedToFn) {
        property = params.convertedToFn(params.defaultValue);
      } else {
        property = params.defaultValue;
      }
      const response = await makeServiceCall(SERVICE_CALL_TYPE.patch, {
        endPoint,
        options: {
          requestBody: {
            requiredProperty: "foo",
            nullableProperty: property || null,
          },
          config: {
            headers: {
              "Content-Type": "application/merge-patch+json",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });
  });
});
