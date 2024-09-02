import { resolvePath } from "@typespec/compiler";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const root = resolvePath(fileURLToPath(import.meta.url), "../../../");

export const pngFile = readFileSync(resolvePath(root, "assets/image.png"));
export const jpgFile = readFileSync(resolvePath(root, "assets/image.jpg"));

export function matrix<T extends ReadonlyArray<readonly unknown[]>>(
  values: T,
  handler: (
    ...args: {
      [idx in keyof T]: T[idx] extends ReadonlyArray<infer U> ? U : never;
    }
  ) => Promise<void>,
): void {
  // Classic recursive approach
  if (values.length === 0) {
    (handler as () => Promise<void>)();
  } else {
    for (const v of values[0]!) {
      matrix(values.slice(1), (...args) => (handler as any)(v, ...args));
    }
  }
}

export const enum SERVICE_CALL_TYPE {
  put,
  post,
  get,
  patch,
  delete,
  head,
}

export interface ServiceRequest {
  endPoint: string;
  options?: {
    requestBody?: any;
    config?: AxiosRequestConfig<any> | undefined;
  };
}

export async function makeServiceCall(
  serviceCallType: SERVICE_CALL_TYPE,
  request: ServiceRequest,
): Promise<AxiosResponse<any, any>> {
  if (serviceCallType === SERVICE_CALL_TYPE.put) {
    return await makePutCall(request);
  }
  if (serviceCallType === SERVICE_CALL_TYPE.post) {
    return await makePostCall(request);
  }
  if (serviceCallType === SERVICE_CALL_TYPE.get) {
    return await makeGetCall(request);
  }
  if (serviceCallType === SERVICE_CALL_TYPE.delete) {
    return await makeDeleteCall(request);
  }
  if (serviceCallType === SERVICE_CALL_TYPE.head) {
    return await makeHeadCall(request);
  }
  return await makePatchCall(request);
}

export async function makePutCall(request: ServiceRequest): Promise<AxiosResponse<any, any>> {
  const response = await axios.put(request.endPoint, request.options?.requestBody, request.options?.config);
  return response;
}

export async function makePostCall(request: ServiceRequest): Promise<AxiosResponse<any, any>> {
  const response = await axios.post(request.endPoint, request.options?.requestBody, request.options?.config);
  return response;
}

export async function makeGetCall(request: ServiceRequest): Promise<AxiosResponse<any, any>> {
  const response = await axios.get(request.endPoint, request.options?.config);
  return response;
}

export async function makePatchCall(request: ServiceRequest): Promise<AxiosResponse<any, any>> {
  const response = await axios.patch(request.endPoint, request.options?.requestBody, request.options?.config);
  return response;
}

export async function makeDeleteCall(request: ServiceRequest): Promise<AxiosResponse<any, any>> {
  const response = await axios.delete(request.endPoint, request.options?.config);
  return response;
}

export async function makeHeadCall(request: ServiceRequest): Promise<AxiosResponse<any, any>> {
  const response = await axios.head(request.endPoint, request.options?.config);
  return response;
}
