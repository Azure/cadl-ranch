import { assert } from "chai";
import { describe } from "mocha";
import axios from "axios";

describe("Basic Rest Client", () => {
  it("should spread named model", async () => {
    const requestBody = {
      name: "foo",
    };
    const response = await axios.put(
      "https://studious-cod-xg474qgj53p7q9-3000.app.github.dev/parameters/spread/model/request-body",
      requestBody,
    );
    assert.strictEqual(response.status, 204);
  });

  it("should spread model composite request only with body param", async () => {
    const requestBody = {
      name: "foo",
    };
    const response = await axios.put(
      "https://studious-cod-xg474qgj53p7q9-3000.app.github.dev/parameters/spread/model/composite-request-only-with-body",
      requestBody,
    );
    assert.strictEqual(response.status, 204);
  });

  it("should spread model composite request without body param", async () => {
    const response = await axios.put(
      "https://studious-cod-xg474qgj53p7q9-3000.app.github.dev/parameters/spread/model/composite-request-without-body/foo",
      {},
      {
        headers: {
          "test-header": "bar",
        },
      },
    );
    assert.strictEqual(response.status, 204);
  });

  it("should spread model composite request", async () => {
    const requestBody = {
      name: "foo",
    };
    const response = await axios.put(
      "https://studious-cod-xg474qgj53p7q9-3000.app.github.dev/parameters/spread/model/composite-request/foo",
      requestBody,
      {
        headers: {
          "test-header": "bar",
        },
      },
    );
    assert.strictEqual(response.status, 204);
  });

  it("should spread model composite request mix", async () => {
    const requestBody = {
      prop: "foo",
    };
    const response = await axios.put(
      "https://studious-cod-xg474qgj53p7q9-3000.app.github.dev/parameters/spread/model/composite-request-mix/foo",
      requestBody,
      {
        headers: {
          "test-header": "bar",
        },
      },
    );
    assert.strictEqual(response.status, 204);
  });

  it("should spread alias with only body param", async () => {
    const requestBody = {
      name: "foo",
    };
    const response = await axios.put(
      "https://studious-cod-xg474qgj53p7q9-3000.app.github.dev/parameters/spread/alias/request-body",
      requestBody,
    );
    assert.strictEqual(response.status, 204);
  });

  it("should spread alias with mixed params", async () => {
    const requestBody = {
      name: "foo",
    };
    const response = await axios.put(
      "https://studious-cod-xg474qgj53p7q9-3000.app.github.dev/parameters/spread/alias/request-parameter/1",
      requestBody,
      {
        headers: {
          "x-ms-test-header": "bar",
        },
      },
    );
    assert.strictEqual(response.status, 204);
  });

  it("should spread alias with more than 5 params", async () => {
    const requestBody = {
      requiredString: "foo",
      optionalInt: 1,
      requiredIntList: [1, 2],
      optionalStringList: ["foo", "bar"],
    };
    const response = await axios.put(
      "https://studious-cod-xg474qgj53p7q9-3000.app.github.dev/parameters/spread/alias/multiple-parameters/1",
      requestBody,
      {
        headers: {
          "x-ms-test-header": "bar",
        },
      },
    );
    assert.strictEqual(response.status, 204);
  });

  it("should spread alias with inner-model-parameter", async () => {
    const requestBody = {
      name: "foo",
    };
    const response = await axios.post(
      "https://studious-cod-xg474qgj53p7q9-3000.app.github.dev/parameters/spread/alias/inner-model-parameter/1",
      requestBody,
      {
        headers: {
          "x-ms-test-header": "bar",
        },
      },
    );
    assert.strictEqual(response.status, 204);
  });

  it("should spread alias with inner-alias-parameter", async () => {
    const requestBody = {
      name: "foo",
      age: 1,
    };
    const response = await axios.post(
      "https://studious-cod-xg474qgj53p7q9-3000.app.github.dev/parameters/spread/alias/inner-alias-parameter/1",
      requestBody,
      {
        headers: {
          "x-ms-test-header": "bar",
        },
      },
    );
    assert.strictEqual(response.status, 204);
  });
});
