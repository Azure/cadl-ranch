import deepEqual from "deep-equal";
import { isString } from "util";
import { isStringObject } from "util/types";
import { CollectionFormat, RequestExt } from "./types.js";
import { ValidationError } from "./validation-error.js";

export const BODY_NOT_EQUAL_ERROR_MESSAGE = "Body provided doesn't match expected body";
export const BODY_EMPTY_ERROR_MESSAGE = "Body should exists";
export const BODY_NOT_EMPTY_ERROR_MESSAGE = "Body should be empty";

export const validateRawBodyEquals = (request: RequestExt, expectedRawBody: string | undefined): void => {
  const actualRawBody = request.rawBody;

  if (expectedRawBody == null) {
    if (!isBodyEmpty(actualRawBody)) {
      throw new ValidationError(BODY_NOT_EQUAL_ERROR_MESSAGE, expectedRawBody, actualRawBody);
    }
    return;
  }

  if (actualRawBody !== expectedRawBody) {
    throw new ValidationError(BODY_NOT_EQUAL_ERROR_MESSAGE, expectedRawBody, actualRawBody);
  }
};

export const validateBodyEquals = (request: RequestExt, expectedBody: unknown | undefined): void => {
  if (expectedBody == null) {
    if (!isBodyEmpty(request.rawBody)) {
      throw new ValidationError(BODY_NOT_EQUAL_ERROR_MESSAGE, expectedBody, request.rawBody);
    }
    return;
  }

  if (!deepEqual(request.body, expectedBody, { strict: true })) {
    throw new ValidationError(BODY_NOT_EQUAL_ERROR_MESSAGE, expectedBody, request.body);
  }
};

export const validateCoercedDateBodyEquals = (request: RequestExt, expectedBody: unknown | undefined): void => {
  if (expectedBody == null) {
    if (!isBodyEmpty(request.rawBody)) {
      throw new ValidationError(BODY_NOT_EQUAL_ERROR_MESSAGE, expectedBody, request.rawBody);
    }
    return;
  }

  if (!deepEqual(coerceDate(request.body), expectedBody, { strict: true })) {
    throw new ValidationError(BODY_NOT_EQUAL_ERROR_MESSAGE, expectedBody, request.body);
  }
};

export const validateBodyEmpty = (request: RequestExt): void => {
  if (isBodyEmpty(request.rawBody)) {
    if (request.body instanceof Buffer) {
      if (request.body.length > 0) {
        throw new ValidationError(BODY_NOT_EMPTY_ERROR_MESSAGE, undefined, request.rawBody);
      }
    }
  } else {
    throw new ValidationError(BODY_EMPTY_ERROR_MESSAGE, undefined, request.rawBody);
  }
};

export const validateBodyNotEmpty = (request: RequestExt): void => {
  if (isBodyEmpty(request.rawBody)) {
    if (request.body instanceof Buffer) {
      if (request.body.length === 0) {
        throw new ValidationError(BODY_EMPTY_ERROR_MESSAGE, undefined, request.rawBody);
      }
    } else {
      throw new ValidationError(BODY_EMPTY_ERROR_MESSAGE, undefined, request.rawBody);
    }
  }
};

/**
 * Check if the provided body is empty.
 * @param body express.js request body.
 */
const isBodyEmpty = (body: string | undefined | null) => {
  return body == null || body === "";
};

/**
 * Check whether the request header contains the given name/value pair
 */
export const validateHeader = (request: RequestExt, headerName: string, expected: string): void => {
  const actual = request.headers[headerName];
  if (actual !== expected) {
    throw new ValidationError(`Expected ${expected} but got ${actual}`, expected, actual);
  }
};

/**
 * Check whether the query string contains the given parameter name and value.
 * Supports query param as string or collection. e.g. if it's a collection, one can call the method like this: validateQueryParam(request, ["a", "b", "c"], CollectionFormat.Multi)
 */
export const validateQueryParam = (
  request: RequestExt,
  paramName: string,
  expected: string | string[],
  collectionFormat?: CollectionFormat,
): void => {
  const actual = request.query[paramName];
  let isExpected = false;
  if (collectionFormat && Array.isArray(expected)) {
    // verify query parameter as collection
    if (collectionFormat === CollectionFormat.Multi && Array.isArray(actual)) {
      isExpected = deepEqual(actual, expected);
    } else if (collectionFormat === CollectionFormat.CSV && typeof actual === "string") {
      let expectedString = expected.join(",");
      isExpected = expectedString === decodeURIComponent(actual);
    }
    if (!isExpected) {
      throw new ValidationError(
        `Expected query param collection ${paramName}=${expected} in ${collectionFormat}, but got ${actual}`,
        expected,
        actual,
      );
    }
  } else if (actual !== expected) {
    throw new ValidationError(`Expected query param ${paramName}=${expected} but got ${actual}`, expected, actual);
  }
};

const coerceDate = (targetObject: Record<string, unknown>): Record<string, unknown> => {
  let stringRep = JSON.stringify(targetObject);
  stringRep = stringRep.replace(/(\d\d\d\d-\d\d-\d\d[Tt]\d\d:\d\d:\d\d)(\.\d{3,7})?([Zz]|[+-]00:00)/g, "$1Z");
  return JSON.parse(stringRep);
};
