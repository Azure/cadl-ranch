import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("azure/core/model endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should get core model embeddingVector", async () => {
    const endPoint = `${serverBasePath}/azure/core/model/embeddingVector`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepStrictEqual(response.data, [0, 1, 2, 3, 4]);
  });

  it("should put core model embeddingVector", async () => {
    const endPoint = `${serverBasePath}/azure/core/model/embeddingVector`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: [0, 1, 2, 3, 4],
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should post core model embeddingVector", async () => {
    const endPoint = `${serverBasePath}/azure/core/model/embeddingVector`;
    const responseBody = { embedding: [5, 6, 7, 8, 9] };
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: { embedding: [0, 1, 2, 3, 4] },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.deepStrictEqual(response.data.embedding, responseBody.embedding);
  });
});
