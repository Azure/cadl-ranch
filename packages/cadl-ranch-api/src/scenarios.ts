import { MockApi, PassOnCodeScenario, PassOnSuccessScenario } from "./types.js";

/**
 * Specify that the scenario should be a `pass` if all the endpoints are called and the API response with 2xx exit code.
 * @param apis Endpoint or List of endpoints for this scenario
 */
export function passOnSuccess(apis: MockApi | readonly MockApi[]): PassOnSuccessScenario {
  return {
    passCondition: "response-success",
    apis: Array.isArray(apis) ? apis : [apis],
  };
}
/**
 * Specify that the scenario should be a `pass` if all the endpoints are called and the API response with the given exit code.
 * @param code Status code all endpoint should return
 * @param apis Endpoint or List of endpoints for this scenario
 */
export function passOnCode(code: number, apis: MockApi | readonly MockApi[]): PassOnCodeScenario {
  return {
    passCondition: "status-code",
    code,
    apis: Array.isArray(apis) ? apis : [apis],
  };
}
