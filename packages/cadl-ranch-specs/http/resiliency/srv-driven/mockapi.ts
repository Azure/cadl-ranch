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

function addOptionalParamOldApiVersionNewClientValidate(req: MockRequest): void {
  if (req.params["new-parameter"] !== undefined) {
    throw new ValidationError("Did not expect 'new-parameter'", undefined, req.params["new-parameter"]);
  }
}

function addOptionalParamNewApiVersionNewClientValidate(req: MockRequest): void {
  req.expect.containsQueryParam("new-parameter", "new");
}

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Resiliency_ServiceDriven_AddOptionalParam_fromNone = passOnSuccess(
  createResilientMockApi({
    path: "/add-optional-param/from-none",
    verb: "head",
    commonValidate: function validate(req: MockRequest): void {},
    oldApiVersionNewClientValidate: addOptionalParamOldApiVersionNewClientValidate,
    newApiVersionNewClientValidate: addOptionalParamNewApiVersionNewClientValidate,
  }),
);

Scenarios.Resiliency_ServiceDriven_AddOptionalParam_fromOneRequired = passOnSuccess(
  createResilientMockApi({
    path: "/add-optional-param/from-one-required",
    verb: "get",
    commonValidate: function validate(req: MockRequest): void {
      req.expect.containsQueryParam("parameter", "required");
    },
    oldApiVersionNewClientValidate: addOptionalParamOldApiVersionNewClientValidate,
    newApiVersionNewClientValidate: addOptionalParamNewApiVersionNewClientValidate,
  }),
);

Scenarios.Resiliency_ServiceDriven_AddOptionalParam_fromOneOptional = passOnSuccess(
  createResilientMockApi({
    path: "/add-optional-param/from-one-optional",
    verb: "get",
    commonValidate: function validate(req: MockRequest): void {
      req.expect.containsQueryParam("parameter", "optional");
    },
    oldApiVersionNewClientValidate: addOptionalParamOldApiVersionNewClientValidate,
    newApiVersionNewClientValidate: addOptionalParamNewApiVersionNewClientValidate,
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
