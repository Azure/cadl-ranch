import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("azure/core/basic endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  const validUser = {
    id: 1,
    name: "Madge",
    etag: "11bdc430-65e8-45ad-81d9-8ffa60d55b59",
  };

  it("should put user", async () => {
    const endPoint = `${serverBasePath}/azure/core/basic/users/1`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          name: "Madge",
        },
        config: {
          params: {
            "api-version": "2022-12-01-preview",
          },
          headers: {
            "Content-Type": "application/json",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, validUser);
  });

  it("should patch user", async () => {
    const endPoint = `${serverBasePath}/azure/core/basic/users/1`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.patch, {
      endPoint,
      options: {
        requestBody: {
          name: "Madge",
        },
        config: {
          params: {
            "api-version": "2022-12-01-preview",
          },
          headers: {
            "Content-Type": "application/merge-patch+json",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, validUser);
  });

  it("should get user", async () => {
    const endPoint = `${serverBasePath}/azure/core/basic/users/1`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            "api-version": "2022-12-01-preview",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, validUser);
  });

  it("should delete user", async () => {
    const endPoint = `${serverBasePath}/azure/core/basic/users/1`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.delete, {
      endPoint,
      options: {
        config: {
          params: {
            "api-version": "2022-12-01-preview",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should list users", async () => {
    const endPoint = `${serverBasePath}/azure/core/basic/users?select=id&select=orders&select=etag`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            "top": 5,
            "skip": 10,
            "orderby": "id",
            "filter": "id lt 10",
            "expand": "orders",
            "api-version": "2022-12-01-preview",
          },
        },
      },
    });
    const responseBody = {
      value: [
        {
          id: 1,
          name: "Madge",
          etag: "11bdc430-65e8-45ad-81d9-8ffa60d55b59",
          orders: [{ id: 1, userId: 1, detail: "a recorder" }],
        },
        {
          id: 2,
          name: "John",
          etag: "11bdc430-65e8-45ad-81d9-8ffa60d55b5a",
          orders: [{ id: 2, userId: 2, detail: "a TV" }],
        },
      ],
    };
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, responseBody);
  });

  it("should export a user", async () => {
    const endPoint = `${serverBasePath}/azure/core/basic/users/1:export`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        config: {
          params: {
            "format": "json",
            "api-version": "2022-12-01-preview",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, validUser);
  });
});
