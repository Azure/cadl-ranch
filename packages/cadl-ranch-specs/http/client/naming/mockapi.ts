import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Projection_ClientNameAndEncodedName_Property_client = passOnSuccess(
  mockapi.post("/client/naming/property/client", (req) => {
    req.expect.bodyEquals({ defaultName: true });
    return {
      status: 204,
    };
  }),
);

Scenarios.Projection_ClientNameAndEncodedName_Property_language = passOnSuccess(
  mockapi.post("/client/naming/property/language", (req) => {
    req.expect.bodyEquals({ defaultName: true });
    return {
      status: 204,
    };
  }),
);

Scenarios.Projection_ClientNameAndEncodedName_Property_compatibleWithEncodedName = passOnSuccess(
  mockapi.post("/client/naming/property/compatible-with-encoded-name", (req) => {
    req.expect.bodyEquals({ wireName: true });
    return {
      status: 204,
    };
  }),
);

Scenarios.Projection_ClientNameAndEncodedName_operation = passOnSuccess(
  mockapi.post("/client/naming/operation", (req) => {
    return {
      status: 204,
    };
  }),
);

Scenarios.Projection_ClientNameAndEncodedName_parameter = passOnSuccess(
  mockapi.post("/client/naming/parameter", (req) => {
    req.expect.containsQueryParam("defaultName", "true");
    return {
      status: 204,
    };
  }),
);

Scenarios.Projection_ClientNameAndEncodedName_header = passOnSuccess(
  mockapi.post("/client/naming/header", (req) => {
    req.expect.containsHeader("default-name", "true");
    return {
      status: 204,
      headers: {
        "default-name": "true",
      },
    };
  }),
);

Scenarios.Projection_ClientNameAndEncodedName_Model_client = passOnSuccess(
  mockapi.post("/client/naming/model/client", (req) => {
    req.expect.bodyEquals({ defaultName: true });
    return {
      status: 204,
    };
  }),
);

Scenarios.Projection_ClientNameAndEncodedName_Model_language = passOnSuccess(
  mockapi.post("/client/naming/model/language", (req) => {
    req.expect.bodyEquals({ defaultName: true });
    return {
      status: 204,
    };
  }),
);
