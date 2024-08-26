import { assert } from "chai";
import { describe } from "mocha";
import axios from "axios";

describe("Basic Rest Client", () => {
  it("should support required-explicit body", async () => {
    const requestBody = {
      name: "foo",
    };
    const response = await axios.post(
      "https://studious-cod-xg474qgj53p7q9-3000.app.github.dev/parameters/body-optionality/required-explicit",
      requestBody,
    );
    assert.strictEqual(response.status, 204);
  });

  it("should support optional-explicit body", async () => {
    const requestBody = {
      name: "foo",
    };
    const response = await axios.post(
      "https://studious-cod-xg474qgj53p7q9-3000.app.github.dev/parameters/body-optionality/optional-explicit/set",
      requestBody,
    );
    assert.strictEqual(response.status, 204);
  });

  it("should support optional-explicit omitted body", async () => {
    const response = await axios.post(
      "https://studious-cod-xg474qgj53p7q9-3000.app.github.dev/parameters/body-optionality/optional-explicit/omit",
    );
    assert.strictEqual(response.status, 204);
  });

  it("should support required-implicit body", async () => {
    const requestBody = {
      name: "foo",
    };
    const response = await axios.post(
      "https://studious-cod-xg474qgj53p7q9-3000.app.github.dev/parameters/body-optionality/required-implicit",
      requestBody,
    );
    assert.strictEqual(response.status, 204);
  });
});
