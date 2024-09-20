import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, matrix, SERVICE_CALL_TYPE } from "../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("client/structure service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  const relativePaths = [
    "/client/structure/client-operation-group",
    "/client/structure/default",
    "/client/structure/multi-client",
    "/client/structure/renamed-operation",
    "/client/structure/two-operation-group",
  ];

  const ops = ["one", "two", "three", "four", "five", "six"];

  matrix([relativePaths], async (relativePath: string) => {
    matrix([ops], async (op: string) => {
      it(`should call operation ${op} correctly`, async () => {
        const endPoint = `${serverBasePath}${relativePath}/${op}`;
        const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
          endPoint,
        });
        assert.strictEqual(response.status, 204);
      });
    });
  });

  matrix([["seven", "eight", "nine"]], async (op: string) => {
    it(`should call operation ${op} correctly`, async () => {
      const endPoint = `${serverBasePath}/client/structure/default/${op}`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
      });
      assert.strictEqual(response.status, 204);
    });
  });
});
