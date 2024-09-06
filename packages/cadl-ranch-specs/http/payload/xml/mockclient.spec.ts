import { assert } from "chai";
import { describe } from "mocha";
import {
  modelWithArrayOfModel,
  modelWithAttributes,
  modelWithDictionary,
  modelWithEmptyArray,
  modelWithEncodedNames,
  modelWithOptionalField,
  modelWithRenamedArrays,
  modelWithRenamedFields,
  modelWithSimpleArrays,
  modelWithText,
  modelWithUnwrappedArray,
  simpleModel,
} from "./mockapi.js";
import { makeServiceCall, matrix, SERVICE_CALL_TYPE } from "../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("payload/xml service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  const inputs = [
    {
      name: "simpleModel",
      model: simpleModel,
    },
    {
      name: "modelWithSimpleArrays",
      model: modelWithSimpleArrays,
    },
    {
      name: "modelWithArrayOfModel",
      model: modelWithArrayOfModel,
    },
    {
      name: "modelWithOptionalField",
      model: modelWithOptionalField,
    },
    {
      name: "modelWithAttributes",
      model: modelWithAttributes,
    },
    {
      name: "modelWithUnwrappedArray",
      model: modelWithUnwrappedArray,
    },
    {
      name: "modelWithRenamedArrays",
      model: modelWithRenamedArrays,
    },
    {
      name: "modelWithRenamedFields",
      model: modelWithRenamedFields,
    },
    {
      name: "modelWithEmptyArray",
      model: modelWithEmptyArray,
    },
    {
      name: "modelWithText",
      model: modelWithText,
    },
    {
      name: "modelWithDictionary",
      model: modelWithDictionary,
    },
    {
      name: "modelWithEncodedNames",
      model: modelWithEncodedNames,
    },
  ];

  matrix([inputs], async (input) => {
    it(`should return ${input.name}`, async () => {
      const endPoint = `${serverBasePath}/payload/xml/${input.name}`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
        endPoint,
      });
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.data, `<?xml version='1.0' encoding='UTF-8'?>${input.model}`);
    });

    it(`should receive ${input.name}`, async () => {
      const endPoint = `${serverBasePath}/payload/xml/${input.name}`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
        endPoint,
        options: {
          requestBody: input.model,
          config: {
            headers: {
              "content-type": "application/xml",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });
  });
});
