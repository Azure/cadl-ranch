import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Client_Naming_Property_client = passOnSuccess(
  mockapi.post("/client/naming/property/client", (req) => {
    req.expect.bodyEquals({ defaultName: true });
    return {
      status: 204,
    };
  }),
);

Scenarios.Client_Naming_Property_language = passOnSuccess(
  mockapi.post("/client/naming/property/language", (req) => {
    req.expect.bodyEquals({ defaultName: true });
    return {
      status: 204,
    };
  }),
);

Scenarios.Client_Naming_Property_compatibleWithEncodedName = passOnSuccess(
  mockapi.post("/client/naming/property/compatible-with-encoded-name", (req) => {
    req.expect.bodyEquals({ wireName: true });
    return {
      status: 204,
    };
  }),
);

Scenarios.Client_Naming_operation = passOnSuccess(
  mockapi.post("/client/naming/operation", (req) => {
    return {
      status: 204,
    };
  }),
);

Scenarios.Client_Naming_parameter = passOnSuccess(
  mockapi.post("/client/naming/parameter", (req) => {
    req.expect.containsQueryParam("defaultName", "true");
    return {
      status: 204,
    };
  }),
);

Scenarios.Client_Naming_Header_request = passOnSuccess(
  mockapi.post("/client/naming/header", (req) => {
    req.expect.containsHeader("default-name", "true");
    return {
      status: 204,
    };
  }),
);

Scenarios.Client_Naming_Header_response = passOnSuccess(
  mockapi.get("/client/naming/header", (req) => {
    return {
      status: 204,
      headers: {
        "default-name": "true",
      },
    };
  }),
);

Scenarios.Client_Naming_Model_client = passOnSuccess(
  mockapi.post("/client/naming/model/client", (req) => {
    req.expect.bodyEquals({ defaultName: true });
    return {
      status: 204,
    };
  }),
);

Scenarios.Client_Naming_Model_language = passOnSuccess(
  mockapi.post("/client/naming/model/language", (req) => {
    req.expect.bodyEquals({ defaultName: true });
    return {
      status: 204,
    };
  }),
);

Scenarios.Client_Naming_UnionEnum_unionEnumName = passOnSuccess(
  mockapi.post("/client/naming/union-enum/union-enum-name", (req) => {
    req.expect.bodyEquals("value1");
    return {
      status: 204,
    };
  }),
);

Scenarios.Client_Naming_UnionEnum_unionEnumMemberName = passOnSuccess(
  mockapi.post("/client/naming/union-enum/union-enum-member-name", (req) => {
    req.expect.bodyEquals("value1");
    return {
      status: 204,
    };
  }),
);
