import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Client_AzureExampleClient_basicAction = passOnSuccess(
  mockapi.post("/azure/example/basic/basic", (req) => {
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    req.expect.containsQueryParam("query-param", "query");
    req.expect.containsHeader("header-param", "header");
    const validBody = {
      stringProperty: "text",
      modelProperty: {
        int32Property: 1,
        float32Property: 1.5,
        enumProperty: "EnumValue1",
      },
      arrayProperty: ["item"],
      recordProperty: {
        record: "value",
      },
    };
    req.expect.bodyEquals(validBody);
    return {
      status: 200,
      body: json({
        stringProperty: "text",
      }),
    };
  }),
);
