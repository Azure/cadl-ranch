import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("azure/core/page endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  interface UserOutput {
    id: number;
    name: string;
    etag: string;
  }

  it("should list core page withPage", async () => {
    const endPoint = `${serverBasePath}/azure/core/page/page`;
    const initialResponse = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(initialResponse.status, 200);
    let result: UserOutput[] = [];
    for await (const item of initialResponse.data.value) {
      result.push(item);
    }
    assert.isUndefined(initialResponse.data.nextLink);
    assert.strictEqual(result.length, 1);
    assert.deepEqual(result[0]?.id, 1);
    assert.strictEqual(result[0]?.name, "Madge");
    assert.strictEqual(result[0]?.etag, "11bdc430-65e8-45ad-81d9-8ffa60d55b59");
  });

  it("should list core page withParameters", async () => {
    const endPoint = `${serverBasePath}/azure/core/page/parameters`;
    const initialResponse = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          data: { inputName: "Madge" },
          params: {
            another: "Second",
          },
        },
      },
    });
    assert.strictEqual(initialResponse.status, 200);
    assert.isUndefined(initialResponse.data.nextLink);
    let result: UserOutput[] = [];
    for await (const item of initialResponse.data.value) {
      result.push(item);
    }
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0]?.id, 1);
    assert.strictEqual(result[0]?.name, "Madge");
    assert.strictEqual(result[0]?.etag, "11bdc430-65e8-45ad-81d9-8ffa60d55b59");
  });

  it("should get core page TwoModelsAsPageItem", async () => {
    let endPoint = `${serverBasePath}/azure/core/page/first-item`;
    const initialResponse1 = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(initialResponse1.status, 200);
    assert.isUndefined(initialResponse1.data.nextLink);
    interface FirstItemOutput {
      id: number;
    }
    let result1: FirstItemOutput[] = [];
    for await (const item of initialResponse1.data.value) {
      result1.push(item);
    }
    assert.strictEqual(result1[0]?.id, 1);
    endPoint = `${serverBasePath}/azure/core/page/second-item`;
    const initialResponse2 = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(initialResponse2.status, 200);
    assert.isUndefined(initialResponse2.data.nextLink);
    interface SecondItemOutput {
      name: string;
    }
    let result2: SecondItemOutput[] = [];
    for await (const item of initialResponse2.data.value) {
      result2.push(item);
    }
    assert.strictEqual(result2[0]?.name, "Madge");
  });

  it("should list core page withCustomPageModel", async () => {
    const endPoint = `${serverBasePath}/azure/core/page/custom-page`;
    const initialResponse = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(initialResponse.status, 200);
    assert.isUndefined(initialResponse.data.nextLink);
    interface CustomUserOutput {
      items: UserOutput[];
    }
    let result: CustomUserOutput = {
      items: initialResponse.data.items,
    };
    assert.strictEqual(result.items.length, 1);
    assert.strictEqual(result.items[0].id, 1);
    assert.strictEqual(result.items[0].name, "Madge");
    assert.strictEqual(result.items[0].etag, "11bdc430-65e8-45ad-81d9-8ffa60d55b59");
  });
});
