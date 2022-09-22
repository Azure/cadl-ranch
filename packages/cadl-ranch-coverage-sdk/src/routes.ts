import { HttpMethod, MockApi, MockRequestHandler } from "./types.js";

/**
 * Register a GET request for the provided uri.
 * @param uri URI to match.
 * @param func Request handler.
 */
function get(uri: string, func: MockRequestHandler): MockApi {
  return request("get", uri, func);
}

/**
 * Register a POST request for the provided uri.
 * @param uri URI to match.
 * @param func Request handler.
 */
function post(uri: string, func: MockRequestHandler): MockApi {
  return request("post", uri, func);
}

/**
 * Register a PUT request for the provided uri.
 * @param uri URI to match.
 * @param func Request handler.
 */
function put(uri: string, func: MockRequestHandler): MockApi {
  return request("put", uri, func);
}

/**
 * Register a PATCH request for the provided uri.
 * @param uri URI to match.
 * @param func Request handler.
 */
function patch(uri: string, func: MockRequestHandler): MockApi {
  return request("patch", uri, func);
}

/**
 * Register a DELETE request for the provided uri.
 * @param uri URI to match.
 * @param func Request handler.
 */
function deleteReq(uri: string, func: MockRequestHandler): MockApi {
  return request("delete", uri, func);
}

/**
 * Register a Options request for the provided uri.
 * @param uri URI to match.
 * @param func Request handler.
 */
function options(uri: string, func: MockRequestHandler): MockApi {
  return request("options", uri, func);
}

/**
 * Register a HEAD request for the provided uri.
 * @param uri URI to match.
 * @param name Name of the scenario(For coverage).
 * @param func Request handler.
 */
function head(uri: string, func: MockRequestHandler): MockApi {
  return request("head", uri, func);
}

/**
 * Register a request for the provided uri.
 * @param method Method to use.
 * @param uri URI to match.
 * @param func Request handler.
 *
 * @note prefer to use the corresponding method method directly instead of `request()`(i.e `get(), post()`)
 */
function request(method: HttpMethod, uri: string, handler: MockRequestHandler): MockApi {
  return { method, uri, handler };
}

export const mockapi = {
  get,
  post,
  put,
  patch,
  delete: deleteReq,
  options,
  head,
  request,
};
