import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("parameters/collection-format service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should serialize multi format query array parameter", async () => {
    const endPoint = `${serverBasePath}/parameters/collection-format/query/multi`;
    const colors = ["blue", "red", "green"];
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: { colors },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should serialize csv format query array parameter", async () => {
    const endPoint = `${serverBasePath}/parameters/collection-format/query/csv`;
    const colors = ["blue", "red", "green"];
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: { colors: colors.join(",") },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should serialize ssv format query array parameter", async () => {
    const endPoint = `${serverBasePath}/parameters/collection-format/query/ssv`;
    const colors = ["blue", "red", "green"];
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: { colors: colors.join(" ") },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should serialize tsv format query array parameter", async () => {
    const endPoint = `${serverBasePath}/parameters/collection-format/query/tsv`;
    const colors = ["blue", "red", "green"];
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: { colors: colors.join("\t") },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should serialize pipes format query array parameter", async () => {
    const endPoint = `${serverBasePath}/parameters/collection-format/query/pipes`;
    const colors = ["blue", "red", "green"];
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: { colors: colors.join("|") },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should serialize csv format header array parameter", async () => {
    const endPoint = `${serverBasePath}/parameters/collection-format/header/csv`;
    const colors = ["blue", "red", "green"];
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          headers: {
            colors: colors.join(","),
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });
});
