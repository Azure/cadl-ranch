import { MockResponseBody } from "./types.js";

/**
 * Serialize the provided content as json to use in a MockResponse body.
 * @content Object to return as json.
 * @returns {MockResponseBody} response body with application/json content type.
 */
export function json(content: unknown): MockResponseBody {
  return {
    contentType: "application/json",
    rawContent: JSON.stringify(content),
  };
}
