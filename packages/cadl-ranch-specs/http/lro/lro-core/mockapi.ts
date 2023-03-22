import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const validUser = { name: "madge", role: "contributor" };
let createOrReplacePollCount = 0;
let deletePollCount = 0;
let exportPollCount = 0;

Scenarios.Azure_Lro_Core_createOrReplace = passOnSuccess([
  mockapi.put("/azure/lro/core/users/madge", (req) => {
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    createOrReplacePollCount = 0;
    return {
      status: 201,
      headers: { "operation-location": "http://localhost:3000/azure/lro/core/users/madge/operations/operation1" },
      body: json(validUser),
    };
  }),
  mockapi.get("/azure/lro/core/users/madge/operations/operation1", (req) => {
    const response =
      createOrReplacePollCount > 0
        ? { id: "operation1", status: "Succeeded" }
        : { id: "operation1", status: "InProgress" };
    createOrReplacePollCount += 1;
    return { status: 200, body: json(response) };
  }),
  mockapi.get("/azure/lro/core/users/madge", (req) => {
    return { status: 200, body: json(validUser) };
  }),
]);

Scenarios.Azure_Lro_Core_delete = passOnSuccess([
  mockapi.delete("/azure/lro/core/users/madge", (req) => {
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    deletePollCount = 0;
    return {
      status: 202,
      headers: { "operation-location": "http://localhost:3000/azure/lro/core/users/madge/operations/operation2" },
      body: json({ id: "operation2", status: "InProgress" }),
    };
  }),
  mockapi.get("/azure/lro/core/users/madge/operations/operation2", (req) => {
    const response =
      deletePollCount > 0 ? { id: "operation2", status: "Succeeded" } : { id: "operation2", status: "InProgress" };
    deletePollCount += 1;
    return { status: 200, body: json(response) };
  }),
]);

Scenarios.Azure_Lro_Core_export = passOnSuccess([
  mockapi.post("/azure/lro/core/users/madge:export", (req) => {
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    req.expect.containsQueryParam("format", "json");
    exportPollCount = 0;
    return {
      status: 202,
      headers: { "operation-location": "http://localhost:3000/azure/lro/core/users/madge/operations/operation3" },
      body: json({ id: "operation3", status: "InProgress" }),
    };
  }),
  mockapi.get("/azure/lro/core/users/madge/operations/operation3", (req) => {
    const response =
      exportPollCount > 0
        ? { id: "operation3", status: "Succeeded", result: { name: "madge", resourceUri: "/users/madge" } }
        : { id: "operation3", status: "InProgress" };
    exportPollCount += 1;
    return { status: 200, body: json(response) };
  }),
]);