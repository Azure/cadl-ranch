import {
  mockapi,
  ValidationError,
  MockApi,
  MockRequest,
  ScenarioMockApi,
  passOnSuccess,
} from "@azure-tools/cadl-ranch-api";
import { HttpVerb } from "@typespec/http";

export const commonBase = "/resiliency/service-driven";

type PassResiliencyOptions = {
  path: string;
  verb: HttpVerb;
  commonValidate: (req: MockRequest) => void;
  oldApiVersionNewClientValidate: (req: MockRequest) => void;
  newApiVersionNewClientValidate: (req: MockRequest) => void;
};

function createResilientMockApi(options: PassResiliencyOptions): MockApi[] {
  return [
    mockapi.request(options.verb, `${commonBase}/client:v1/service:v1/api-version:v1${options.path}`, (req) => {
      options.commonValidate(req);
      return {
        status: 204,
      };
    }),
    mockapi.request(options.verb, `${commonBase}/client:v1/service:v2/api-version:v1${options.path}`, (req) => {
      options.commonValidate(req);
      return {
        status: 204,
      };
    }),
    mockapi.request(options.verb, `${commonBase}/client:v2/service:v2/api-version:v1${options.path}`, (req) => {
      options.commonValidate(req);
      options.oldApiVersionNewClientValidate(req);
      return {
        status: 204,
      };
    }),
    mockapi.request(options.verb, `${commonBase}/client:v2/service:v2/api-version:v2${options.path}`, (req) => {
      options.commonValidate(req);
      options.newApiVersionNewClientValidate(req);
      return {
        status: 204,
      };
    }),
  ];
}

function addOptionalParamsOldApiVersionNewClientValidate(req: MockRequest): void {
  if (req.params["new-parameter"] !== undefined) {
    throw new ValidationError("Did not expect 'new-parameter'", undefined, req.params["new-parameter"]);
  }
}

function addOptionalParamsNewApiVersionNewClientValidate(req: MockRequest): void {
  req.expect.containsQueryParam("new-parameter", "new");
}

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Resiliency_ServiceDriven_AddOptionalParams_fromNone = passOnSuccess(
  createResilientMockApi({
    path: "/add-optional-param/from-none",
    verb: "head",
    commonValidate: function validate(req: MockRequest): void {},
    oldApiVersionNewClientValidate: addOptionalParamsOldApiVersionNewClientValidate,
    newApiVersionNewClientValidate: addOptionalParamsNewApiVersionNewClientValidate,
  }),
);

Scenarios.Resiliency_ServiceDriven_AddOptionalParams_fromOneRequired = passOnSuccess(
  createResilientMockApi({
    path: "/add-optional-param/from-one-required",
    verb: "get",
    commonValidate: function validate(req: MockRequest): void {
      req.expect.containsQueryParam("parameter", "required");
    },
    oldApiVersionNewClientValidate: addOptionalParamsOldApiVersionNewClientValidate,
    newApiVersionNewClientValidate: addOptionalParamsNewApiVersionNewClientValidate,
  }),
);

Scenarios.Resiliency_ServiceDriven_AddOptionalParams_fromOneOptional = passOnSuccess(
  createResilientMockApi({
    path: "/add-optional-param/from-one-optional",
    verb: "get",
    commonValidate: function validate(req: MockRequest): void {
      req.expect.containsQueryParam("parameter", "optional");
    },
    oldApiVersionNewClientValidate: addOptionalParamsOldApiVersionNewClientValidate,
    newApiVersionNewClientValidate: addOptionalParamsNewApiVersionNewClientValidate,
  }),
);

Scenarios.Resiliency_ServiceDriven_addContentType = passOnSuccess(
  createResilientMockApi({
    path: "/add-content-type",
    verb: "post",
    commonValidate: function validate(req: MockRequest): void {
      // just make sure we have a content type header
      req.expect.containsHeader("content-type", req.headers["Content-Type"]);
      req.expect.bodyEquals({ url: "http://example.org/myimage.jpeg" });
    },
    oldApiVersionNewClientValidate: function validate(req: MockRequest): void {
      req.expect.containsHeader("content-type", "application/json");
    },
    newApiVersionNewClientValidate: function validate(req: MockRequest): void {
      req.expect.containsHeader("content-type", "image/jpeg");
    },
  }),
);

Scenarios.Resiliency_ServiceDriven_breakTheGlass = passOnSuccess(
  mockapi.delete(`${commonBase}/client:v1/service:v2/api-version:v2/add-operation`, (req) => {
    return {
      status: 204,
    };
  }),
);

Scenarios.Resiliency_ServiceDriven_addOperation = passOnSuccess(
  mockapi.delete(`${commonBase}/client:v2/service:v2/api-version:v2/add-operation`, (req) => {
    return {
      status: 204,
    };
  }),
);
