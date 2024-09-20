import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../helper-server-test.js";

import * as dotenv from "dotenv";
import { expectedCreateBody, expectedUpdateBody } from "./mockapi.js";
dotenv.config();

describe("payload/json-merge-patch service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should create a new resource", async () => {
    const endPoint = `${serverBasePath}/json-merge-patch/create/resource`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: expectedCreateBody,
      },
    });
    assert.equal(response.status, 200);
    assert.deepEqual(response.data, expectedCreateBody);
  });

  it("should update a resource", async () => {
    const endPoint = `${serverBasePath}/json-merge-patch/update/resource`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.patch, {
      endPoint,
      options: {
        requestBody: expectedUpdateBody,
      },
    });
    assert.equal(response.status, 200);
    assert.deepEqual(response.data, {
      name: "Madge",
      map: {
        key: {
          name: "InnerMadge",
        },
      },
    });
  });
});
