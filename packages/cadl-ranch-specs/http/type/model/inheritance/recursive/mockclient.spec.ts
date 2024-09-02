import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

const body = {
  level: 0,
  extension: [
    {
      level: 1,
      extension: [
        {
          level: 2,
        },
      ],
    },
    {
      level: 1,
    },
  ],
};

describe("type/model/inheritance/recursive service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("Inheritance Recursive put test", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/recursive`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: body,
      },
    });
    assert.equal(response.status, 204);
  });

  it("Inheritance Recursive get test", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/recursive`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.equal(response.status, 200);
  });
});
