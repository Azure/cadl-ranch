import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};
const detectionResult = { resultId: "73f411fe-4f43-4b4b-9cbd-6828d8f4cf9a" };
Scenarios.Versioning_AnomalyDetector_GetAnomalyDetectionResult = passOnSuccess(
  mockapi.get("/versioning/anomalydetector/api-version:{ApiVersion}/result/{resultId}", (req) => {
    req.expect.containsQueryParam("api-version", "v2");
    return {
      status: 200,
      body: json(detectionResult),
    };
  }),
);
