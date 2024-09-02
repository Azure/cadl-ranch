import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("parameters/body-optionality service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should support required-explicit body", async () => {
    const endPoint = `${serverBasePath}/parameters/body-optionality/required-explicit`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          name: "foo",
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should support optional-explicit body", async () => {
    const endPoint = `${serverBasePath}/parameters/body-optionality/optional-explicit/set`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          name: "foo",
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should support optional-explicit omitted body", async () => {
    const endPoint = `${serverBasePath}/parameters/body-optionality/optional-explicit/omit`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
    });
    assert.strictEqual(response.status, 204);
  });

  it("should support required-implicit body", async () => {
    const endPoint = `${serverBasePath}/parameters/body-optionality/required-implicit`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          name: "foo",
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });
});
