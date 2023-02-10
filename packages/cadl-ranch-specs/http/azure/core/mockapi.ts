import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Azure_Core_createOrUpdate = passOnSuccess(
  mockapi.patch("/azure/core/users/:id", (req) => {
    if (req.params.id !== "1") {
      return { status: 400, body: json({ error: "Expected path param id=1" }) };
    }
    req.expect.containsHeader("content-type", "application/merge-patch+json");
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    const validBody = { name: "Madge" };
    req.expect.bodyEquals(validBody);
    const responseBody = { id: 1, name: "Madge" };
    return { status: 200, body: json(responseBody) };
  }),
);

Scenarios.Azure_Core_createOrReplace = passOnSuccess(
  mockapi.put("/azure/core/users/:id", (req) => {
    if (req.params.id !== "1") {
      return { status: 400, body: json({ error: "Expected path param id=1" }) };
    }
    req.expect.containsHeader("content-type", "application/json");
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    const validBody = { name: "Madge" };
    req.expect.bodyEquals(validBody);
    const responseBody = { id: 1, name: "Madge" };
    return { status: 200, body: json(responseBody) };
  }),
);

Scenarios.Azure_Core_get = passOnSuccess(
  mockapi.get("/azure/core/users/:id", (req) => {
    if (req.params.id !== "1") {
      return { status: 400, body: json({ error: "Expected path param id=1" }) };
    }
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    const responseBody = { id: 1, name: "Madge" };
    return { status: 200, body: json(responseBody) };
  }),
);

Scenarios.Azure_Core_list = passOnSuccess(
  mockapi.get("/azure/core/users", (req) => {
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    const responseBody = {
      value: [
        { id: 1, name: "Madge" },
        { id: 2, name: "John" },
      ],
    };
    return { status: 200, body: json(responseBody) };
  }),
);

Scenarios.Azure_Core_delete = passOnSuccess(
  mockapi.delete("/azure/core/users/:id", (req) => {
    if (req.params.id !== "1") {
      return { status: 400, body: json({ error: "Expected path param id=1" }) };
    }
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    return { status: 204 };
  }),
);

Scenarios.Azure_Core_export = passOnSuccess(
  mockapi.post("/azure/core/users/:id:export", (req) => {
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    req.expect.containsQueryParam("format", "json");
    const responseBody = { id: 1, name: "Madge" };
    return { status: 200, body: json(responseBody) };
  }),
);
