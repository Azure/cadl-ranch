import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("payload/pageable service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should get pagable list without skiptoken", async () => {
    const endPoint = `${serverBasePath}/payload/pageable`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            maxpagesize: 3,
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.value[0]?.name, "user5");
    assert.strictEqual(response.data.value[1]?.name, "user6");
    assert.strictEqual(response.data.value[2]?.name, "user7");
    assert.strictEqual(
      response.data.nextLink,
      "http://localhost:3000/payload/pageable?skipToken=name-user7&maxpagesize=3",
    );
  });

  it("should get pagable list with skiptoken", async () => {
    const endPoint = `${serverBasePath}/payload/pageable`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            maxpagesize: 3,
            skipToken: "name-user7",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.value[0]?.name, "user8");
  });

  it("should get pagable list with wrong skiptoken", async () => {
    const endPoint = `${serverBasePath}/payload/pageable`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            maxpagesize: 3,
            skipToken: "wrong value",
          },
          validateStatus: function (status: number) {
            return (status >= 200 && status < 300) || status === 400;
          },
        },
      },
    });
    assert.strictEqual(response.status, 400);
    assert.strictEqual((response.data as any).message, "Unsupported skipToken query parameter");
    assert.strictEqual((response.data as any).expected, `Not provided for first page, "name-user7" for second page`);
    assert.strictEqual((response.data as any).actual, "wrong value");
  });

  it("should get pagable list", async () => {
    interface UserOutput {
      name: string;
    }

    const endPoint = `${serverBasePath}/payload/pageable`;
    const initialResponse = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            maxpagesize: 3,
          },
        },
      },
    });
    assert.strictEqual(initialResponse.status, 200);

    const result: UserOutput[] = [];
    for await (const item of initialResponse.data.value) {
      result.push(item);
    }
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint: initialResponse.data.nextLink,
    });
    assert.strictEqual(response.status, 200);
    for await (const item of response.data.value) {
      result.push(item);
    }

    assert.deepEqual(result, [{ name: "user5" }, { name: "user6" }, { name: "user7" }, { name: "user8" }]);
  });
});
