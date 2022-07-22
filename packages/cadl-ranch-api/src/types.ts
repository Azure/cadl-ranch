import type { Request } from "express";
import { MockRequest } from "./mock-request.js";

/**
 * Extension of the express.js request which include a rawBody.
 */
export interface RequestExt extends Request {
  rawBody?: string;
}

export type ScenarioPassCondition = "response-success";

export interface ScenarioMockApi {
  passCondition: ScenarioPassCondition;
  apis: MockApi[];
}

export type MockRequestHandler = (req: MockRequest) => MockResponse | Promise<MockResponse>;

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete" | "head" | "options";

export interface MockApi {
  method: HttpMethod;
  uri: string;
  handler: MockRequestHandler;
}

export interface MockResponse {
  status: number;
  headers?: {
    [key: string]: string | null;
  };
  body?: MockResponseBody;

  /**
   * Let the mock API know that this request was successful to counting coverage regardless of the status code.
   * By default only 2xx status code will count toward success.
   */
  testSuccessful?: boolean;
}

export interface MockResponseBody {
  contentType: string;
  rawContent: string | undefined;
}
