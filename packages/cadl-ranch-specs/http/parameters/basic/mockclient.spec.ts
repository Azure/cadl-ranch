import { assert } from "chai";
import { describe } from "mocha";
import axios from "axios";

describe("Basic Rest Client", () => {
  it("basic parameters explicit-body simple", async () => {
    const requestBody = {
      name: "foo",
    };
    const response = await axios.put(
      "https://studious-cod-xg474qgj53p7q9-3000.app.github.dev/parameters/basic/explicit-body/simple",
      requestBody,
    );
    assert.strictEqual(response.status, 204);
  });

  it("basic parameters implicit-body simple", async () => {
    const requestBody = {
      name: "foo",
    };
    const response = await axios.put(
      "https://studious-cod-xg474qgj53p7q9-3000.app.github.dev/parameters/basic/implicit-body/simple",
      requestBody,
    );
    assert.strictEqual(response.status, 204);
  });
});
