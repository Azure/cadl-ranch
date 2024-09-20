import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("type/model/inheritance/nested-discriminator service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  const validBody = {
    age: 1,
    kind: "shark",
    sharktype: "goblin",
  };

  it("should get valid", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/nested-discriminator/model`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.age, 1);
    if (response.data.kind === "shark") {
      assert.strictEqual(response.data.sharktype, "goblin");
    }
  });

  it("should put valid", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/nested-discriminator/model`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: validBody,
      },
    });
    assert.strictEqual(response.status, 204);
  });

  const validRecursiveBody = {
    age: 1,
    kind: "salmon",
    partner: {
      age: 2,
      kind: "shark",
      sharktype: "saw",
    },
    friends: [
      {
        age: 2,
        kind: "salmon",
        partner: {
          age: 3,
          kind: "salmon",
        },
        hate: {
          key1: {
            age: 4,
            kind: "salmon",
          },
          key2: {
            age: 2,
            kind: "shark",
            sharktype: "goblin",
          },
        },
      },
      {
        age: 3,
        kind: "shark",
        sharktype: "goblin",
      },
    ],
    hate: {
      key3: {
        age: 3,
        kind: "shark",
        sharktype: "saw",
      },
      key4: {
        age: 2,
        kind: "salmon",
        friends: [
          {
            age: 1,
            kind: "salmon",
          },
          {
            age: 4,
            kind: "shark",
            sharktype: "goblin",
          },
        ],
      },
    },
  };

  it("should get recursive body", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/nested-discriminator/recursivemodel`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(JSON.stringify(response.data), JSON.stringify(validRecursiveBody));
    if (response.data.kind === "salmon") {
      assert.strictEqual(response.data.partner?.kind, validRecursiveBody.partner?.kind);
    }
  });

  it("should put recursive body", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/nested-discriminator/recursivemodel`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: validRecursiveBody,
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get missing discriminator body", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/nested-discriminator/missingdiscriminator`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.age, 1);
    assert.isUndefined(response.data.kind);
  });

  it("should get wrong discriminator body", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/nested-discriminator/wrongdiscriminator`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.age, 1);
    assert.strictEqual(response.data.kind, "wrongKind");
  });
});
