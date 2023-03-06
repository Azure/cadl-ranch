import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Overload_uploadBytesOrString = passOnSuccess(
  mockapi.post("/overload/bytesOrString", (req) => {
    const contentType = req.headers["content-type"];
    const reponse = { status: 204 };
    if (contentType === "application/octet-stream") {
      req.expect.bodyEquals(Buffer.from("hello world", "utf8"));
      return reponse;
    } else if (contentType === "text/plain") {
      req.expect.bodyEquals("hello world");
      return reponse;
    } else {
      return {
        status: 400,
      };
    }
  }),
);

Scenarios.Overload_uploadBytesOrStringSkip1 = passOnSuccess(
  mockapi.post("/overload/bytesOrString/skip1", (req) => {
    return {
      status: 204,
    };
  }),
);

Scenarios.Overload_uploadBytesOrStringSkip2 = passOnSuccess(
  mockapi.post("/overload/bytesOrString/skip2", (req) => {
    return {
      status: 204,
    };
  }),
);

Scenarios.Overload_uploadJsonOrString = passOnSuccess(
  mockapi.post("/overload/JsonOrString", (req) => {
    const contentType = req.headers["content-type"];
    const reponse = { status: 204 };
    if (contentType === "application/json") {
      req.expect.bodyEquals({ hello: "world" });
      return reponse;
    } else if (contentType === "text/plain") {
      req.expect.bodyEquals("hello world");
      return reponse;
    } else {
      return {
        status: 400,
      };
    }
  }),
);

Scenarios.Overload_uploadJsonOrStringSkip3 = passOnSuccess(
  mockapi.post("/overload/JsonOrString/skip3", (req) => {
    return {
      status: 204,
    };
  }),
);

Scenarios.Overload_uploadJsonOrStringSkip4 = passOnSuccess(
  mockapi.post("/overload/JsonOrString/skip4", (req) => {
    return {
      status: 204,
    };
  }),
);
