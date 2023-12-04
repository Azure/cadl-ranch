import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Projection_ProjectedName_Property_json = passOnSuccess(
  mockapi.post("/projection/projected-name/property/json", (req) => {
    req.expect.bodyEquals({ wireName: true });
    return {
      status: 204,
    };
  }),
);

Scenarios.Projection_ProjectedName_Property_client = passOnSuccess(
  mockapi.post("/projection/projected-name/property/client", (req) => {
    req.expect.bodyEquals({ defaultName: true });
    return {
      status: 204,
    };
  }),
);

Scenarios.Projection_ProjectedName_Property_language = passOnSuccess(
  mockapi.post("/projection/projected-name/property/language", (req) => {
    req.expect.bodyEquals({ defaultName: true });
    return {
      status: 204,
    };
  }),
);

Scenarios.Projection_ProjectedName_Property_jsonAndClient = passOnSuccess(
  mockapi.post("/projection/projected-name/property/json-and-client", (req) => {
    req.expect.bodyEquals({ wireName: true });
    return {
      status: 204,
    };
  }),
);

Scenarios.Projection_ProjectedName_operation = passOnSuccess(
  mockapi.post("/projection/projected-name/operation", (req) => {
    return {
      status: 204,
    };
  }),
);

Scenarios.Projection_ProjectedName_parameter = passOnSuccess(
  mockapi.post("/projection/projected-name/parameter", (req) => {
    req.expect.containsQueryParam("default-name", "true");
    return {
      status: 204,
    };
  }),
);

Scenarios.Projection_ProjectedName_Model_client = passOnSuccess(
  mockapi.post("/projection/projected-name/model/client", (req) => {
    req.expect.bodyEquals({ defaultName: true });
    return {
      status: 204,
    };
  }),
);

Scenarios.Projection_ProjectedName_Model_language = passOnSuccess(
  mockapi.post("/projection/projected-name/model/language", (req) => {
    req.expect.bodyEquals({ defaultName: true });
    return {
      status: 204,
    };
  }),
);
