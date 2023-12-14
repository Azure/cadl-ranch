import { json, mockapi, passOnSuccess } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Payload_MediaType_BytesBody = passOnSuccess([
  mockapi.post("/payload/media-type/sendBytesAsBinary", (req) => {
    req.expect.containsHeader("content-type", "application/octet-stream");
    req.expect.bodyEquals("aGVsbG8=");
    return { status: 200 };
  }),

  mockapi.get("/payload/media-type/getBytesAsBinary", (req) => {
    req.expect.containsHeader("accept", "application/octet-stream");
    return { 
      status: 200,
      body: {rawContent: "aGVsbG8=", contentType: "application/octet-stream"},
     };
  }),

  mockapi.post("/payload/media-type/sendBytesAsJson", (req) => {
    req.expect.containsHeader("content-type", "application/json");
    req.expect.bodyEquals('\"aGVsbG8=\"');
    return { status: 200 };
  }),

  mockapi.get("/payload/media-type/getBytesAsJson", (req) => {
    req.expect.containsHeader("accept", "application/json");
    return {
      status: 200,
      body: json("aGVsbG8="),
      contentType: "application/json",
    };
  }),
]);

Scenarios.Payload_MediaType_StringBody = passOnSuccess([
  mockapi.post("/payload/media-type/sendStringAsText", (req) => {
    req.expect.containsHeader("content-type", "text/plain");
    req.expect.bodyEquals("foo");
    return { status: 200 };
  }),

  mockapi.get("/payload/media-type/getStringAsText", (req) => {
    req.expect.containsHeader("accept", "text/plain");
    return {
      status: 200,
      body: {rawContent: "foo", contentType: "text/plain"},
    };
  }),

  mockapi.post("/payload/media-type/sendStringAsJson", (req) => {
    req.expect.containsHeader("content-type", "application/json");
    req.expect.bodyEquals('\"foo\"');
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