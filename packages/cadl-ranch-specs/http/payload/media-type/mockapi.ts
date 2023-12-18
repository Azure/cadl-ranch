import { json, mockapi, passOnSuccess } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Payload_MediaType_StringBody = passOnSuccess([
  mockapi.post("/payload/media-type/stringBody/sendAsText", (req) => {
    req.expect.containsHeader("content-type", "text/plain");
    req.expect.bodyEquals("{cat}");
    return { status: 200 };
  }),

  mockapi.get("/payload/media-type/stringBody/getAsText", (req) => {
    req.expect.containsHeader("accept", "text/plain");
    return {
      status: 200,
      body: { rawContent: "{cat}", contentType: "text/plain" },
    };
  }),

  mockapi.post("/payload/media-type/stringBody/sendAsJson", (req) => {
    req.expect.containsHeader("content-type", "application/json");
    req.expect.bodyEquals("foo");
    return { status: 200 };
  }),

  mockapi.get("/payload/media-type/stringBody/getAsJson", (req) => {
    req.expect.containsHeader("accept", "application/json");
    return {
      status: 200,
      body: json("foo"),
      contentType: "application/json",
    };
  }),
]);
