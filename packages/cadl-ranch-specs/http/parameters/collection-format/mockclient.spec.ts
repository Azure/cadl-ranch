import { assert } from "chai";
import { describe } from "mocha";
import axios from "axios";

describe("Basic Rest Client", () => {
  it("should serialize multi format query array parameter", async () => {
    const colors = ["blue", "red", "green"];
    const response = await axios.get(
      "https://studious-cod-xg474qgj53p7q9-3000.app.github.dev/parameters/collection-format/query/multi",
      {
        params: { colors },
      },
    );
    assert.strictEqual(response.status, 204);
  });

  it("should serialize csv format query array parameter", async () => {
    const colors = ["blue", "red", "green"];
    const response = await axios.get(
      "https://studious-cod-xg474qgj53p7q9-3000.app.github.dev/parameters/collection-format/query/csv",
      {
        params: { colors: colors.join(",") },
      },
    );
    assert.strictEqual(response.status, 204);
  });

  it("should serialize ssv format query array parameter", async () => {
    const colors = ["blue", "red", "green"];
    const response = await axios.get(
      "https://studious-cod-xg474qgj53p7q9-3000.app.github.dev/parameters/collection-format/query/ssv",
      {
        params: { colors: colors.join(" ") },
      },
    );
    assert.strictEqual(response.status, 204);
  });

  it("should serialize tsv format query array parameter", async () => {
    const colors = ["blue", "red", "green"];
    const response = await axios.get(
      `https://studious-cod-xg474qgj53p7q9-3000.app.github.dev/parameters/collection-format/query/tsv`,
      {
        params: { colors: colors.join("\t") },
      },
    );
    assert.strictEqual(response.status, 204);
  });

  it("should serialize pipes format query array parameter", async () => {
    const colors = ["blue", "red", "green"];
    const response = await axios.get(
      "https://studious-cod-xg474qgj53p7q9-3000.app.github.dev/parameters/collection-format/query/pipes",
      {
        params: { colors: colors.join("|") },
      },
    );
    assert.strictEqual(response.status, 204);
  });

  it("should serialize csv format header array parameter", async () => {
    const colors = ["blue", "red", "green"];
    const response = await axios.get(
      "https://studious-cod-xg474qgj53p7q9-3000.app.github.dev/parameters/collection-format/header/csv",
      {
        headers: {
          colors: colors.join(","),
        },
      },
    );
    assert.strictEqual(response.status, 204);
  });
});
