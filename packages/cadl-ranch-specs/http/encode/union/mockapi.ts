import {
  passOnSuccess,
  mockapi,
  json,
  MockApi,
  validateValueFormat,
  ValidationError,
} from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

function createPropertyMockApis(route: string, format: "rfc7231" | "rfc3339" | undefined, value: any): MockApi {
  const url = `/encode/union/${route}`;
  return mockapi.post(url, (req) => {
    if (format) {
      validateValueFormat(req.body["value"], format);
      if (Date.parse(req.body["value"]) !== Date.parse(value)) {
        throw new ValidationError(`Wrong value`, value, req.body["value"]);
      }
    } else {
      req.expect.coercedBodyEquals({ value: value });
    }
    return {
      status: 200,
      body: json({ value: value }),
    };
  });
}
Scenarios.Encode_Union_unixTimestampUnion = passOnSuccess(
  createPropertyMockApis("unix-timestamp-union", undefined, 1686566864),
);
