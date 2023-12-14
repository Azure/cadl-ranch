import { json, mockapi, passOnSuccess } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Payload_MediaType_StringBody = passOnSuccess([
  mockapi.post("/payload/media-type/sendStringAsText", (req) => {
    req.expect.containsHeader("content-type", "text/plain");
    req.expect.bodyEquals('{"Cat": "Meow"}');
    return { status: 200 };
  }),

  mockapi.get("/payload/media-type/getStringAsText", (req) => {
    req.expect.containsHeader("accept", "text/plain");
    return {
      status: 200,
      body: { rawContent: '{"Cat": "Meow"}', contentType: "text/plain" },
    };
  }),

  mockapi.post("/payload/media-type/sendStringAsJson", (req) => {
    req.expect.containsHeader("content-type", "application/json");
    req.expect.bodyEquals("foo");
    return { status: 200 };
  }),

  mockapi.get("/payload/media-type/getStringAsJson", (req) => {
    req.expect.containsHeader("accept", "application/json");
    return {
      status: 200,
      body: json("foo"),
      contentType: "application/json",
    };
  }),
]);
