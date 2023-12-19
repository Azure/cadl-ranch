import { json, mockapi, passOnSuccess } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Payload_MediaType_StringBody_sendAsText = passOnSuccess(
  mockapi.post("/payload/media-type/string-body/sendAsText", (req) => {
    req.expect.containsHeader("content-type", "text/plain");
    req.expect.bodyEquals("{cat}");
    return { status: 200 };
  }),
);

Scenarios.Payload_MediaType_StringBody_getAsText = passOnSuccess(
  mockapi.get("/payload/media-type/string-body/getAsText", (req) => {
    req.expect.containsHeader("accept", "text/plain");
    return {
      status: 200,
      body: { rawContent: "{cat}", contentType: "text/plain" },
    };
  }),
);

Scenarios.Payload_MediaType_StringBody_sendAsJson = passOnSuccess(
  mockapi.post("/payload/media-type/string-body/sendAsJson", (req) => {
    req.expect.containsHeader("content-type", "application/json");
    req.expect.bodyEquals("foo");
    return { status: 200 };
  }),
);

Scenarios.Payload_MediaType_StringBody_getAsJson = passOnSuccess(
  mockapi.get("/payload/media-type/string-body/getAsJson", (req) => {
    req.expect.containsHeader("accept", "application/json");
    return {
      status: 200,
      body: json("foo"),
      contentType: "application/json",
    };
  }),
);
