import { Response } from "express";
import { logger } from "../logger.js";
import {
  MockRequest,
  MockRequestHandler,
  MockResponse,
  RequestExt,
  ValidationError,
} from "@azure-tools/cadl-ranch-api";
import { CoverageTracker } from "../coverage/coverage-tracker.js";

export async function processRequest(
  coverageTracker: CoverageTracker,
  scenarioName: string,
  scenarioUri: string,
  request: RequestExt,
  response: Response,
  func: MockRequestHandler,
): Promise<void> {
  const mockRequest = new MockRequest(request);
  const mockResponse = await callHandler(mockRequest, response, func);
  if (mockResponse === undefined) {
    return;
  }

  coverageTracker.trackEndpointResponse(scenarioName, scenarioUri, mockResponse);
  processResponse(response, mockResponse);
}

const processResponse = (response: Response, mockResponse: MockResponse) => {
  response.status(mockResponse.status);

  if (mockResponse.headers) {
    response.set(mockResponse.headers);
  }

  if (mockResponse.body) {
    response.contentType(mockResponse.body.contentType).send(mockResponse.body.rawContent);
  }

  response.end();
};

const callHandler = async (
  mockRequest: MockRequest,
  response: Response,
  func: MockRequestHandler,
): Promise<MockResponse | undefined> => {
  try {
    return func(mockRequest);
  } catch (e) {
    if (!(e instanceof ValidationError)) {
      throw e;
    }

    logger.warn(
      [`Request validation failed: ${e.message}:`, ` Expected:\n${e.expected}`, ` Actual: \n${e.actual}`].join("\n"),
    );
    response
      .status(400)
      .contentType("application/json")
      .send(e.toJSON ? e.toJSON() : JSON.stringify(e.message))
      .end();
    return undefined;
  }
};
