import { passOnSuccess, ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import {
  AddContentType,
  AddOptionalParams_fromNone,
  AddOptionalParams_fromOneOptional,
  AddOptionalParams_fromOneRequired,
} from "../srv-driven-1/commonapi.js";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Resiliency_ServiceDriven_v2_AddOptionalParams_fromNone = passOnSuccess(AddOptionalParams_fromNone.v1);

Scenarios.Resiliency_ServiceDriven_v2_AddOptionalParams_fromOneRequired = passOnSuccess(
  AddOptionalParams_fromOneRequired.v1,
);

Scenarios.Resiliency_ServiceDriven_v2_AddOptionalParams_fromOneOptional = passOnSuccess(
  AddOptionalParams_fromOneOptional.v1,
);

Scenarios.Resiliency_ServiceDriven_v2_addContentType = passOnSuccess(AddContentType.v1);
