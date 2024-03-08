import { passOnSuccess, mockapi, json, MockApi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

// string value
Scenarios.Azure_Core_Scalar_AzureLocationScalar_get = passOnSuccess(
  mockapi.get("/azure/core/scalar/azureLocation", (req) => {
    return { status: 200, body: json("eastus") };
  }),
);

Scenarios.Azure_Core_Scalar_AzureLocationScalar_put = passOnSuccess(
  mockapi.put("/azure/core/scalar/azureLocation", (req) => {
    req.expect.bodyEquals("eastus");
    return { status: 204 };
  }),
);

const azureLocation = { location: "eastus" };
Scenarios.Azure_Core_Scalar_AzureLocationScalar_post = passOnSuccess(
  mockapi.post("/azure/core/scalar/azureLocation", (req) => {
    req.expect.bodyEquals({ location: "eastus" });
    return {
      status: 200,
      body: json(azureLocation),
    };
  }),
);

Scenarios.Azure_Core_Scalar_AzureLocationScalar_header = passOnSuccess(
  mockapi.post("/azure/core/scalar/azureLocation/header", (req) => {
    req.expect.containsHeader("region", "eastus");

    return { status: 204 };
  }),
);

Scenarios.Azure_Core_Scalar_AzureLocationScalar_query = passOnSuccess(
  mockapi.post("/azure/core/scalar/azureLocation/query", (req) => {
    req.expect.containsQueryParam("regen", "eastus");

    return { status: 204 };
  }),
);
