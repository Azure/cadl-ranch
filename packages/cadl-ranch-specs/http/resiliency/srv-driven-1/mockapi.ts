import { mockapi, passOnSuccess, ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import {
  AddContentType,
  AddOptionalParams_fromNone,
  AddOptionalParams_fromOneOptional,
  AddOptionalParams_fromOneRequired,
  commonBase,
} from "./commonapi.js";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Resiliency_ServiceDriven_v1_AddOptionalParams_fromNone = passOnSuccess(AddOptionalParams_fromNone.v1);

Scenarios.Resiliency_ServiceDriven_v1_AddOptionalParams_fromOneRequired = passOnSuccess(
  AddOptionalParams_fromOneRequired.v1,
);

Scenarios.Resiliency_ServiceDriven_v1_AddOptionalParams_fromOneOptional = passOnSuccess(
  AddOptionalParams_fromOneOptional.v1,
);

Scenarios.Resiliency_ServiceDriven_v1_addContentType = passOnSuccess(AddContentType.v1);

Scenarios.Resiliency_ServiceDriven_v1_breakTheGlass = passOnSuccess(
  mockapi.delete(`${commonBase}/client:v1/service:v2/api-version:v2/add-operation`, (req) => {
    return {
      status: 204,
    };
  }),
);
