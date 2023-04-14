import { mockapi, ValidationError, MockApi, MockRequest } from "@azure-tools/cadl-ranch-api";
import { HttpVerb } from "@typespec/http";

export const commonBase = "/resiliency/servicedriven";

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
  req.expect.containsQueryParam("new-parameter", "foo");
}

export const AddOptionalParams_fromNone = createResilientMockApi({
  path: "/add-optional-params/from-none",
  verb: "head",
  commonValidate: function validate(req: MockRequest): void {},
  oldApiVersionNewClientValidate: addOptionalParamsOldApiVersionNewClientValidate,
  newApiVersionNewClientValidate: addOptionalParamsNewApiVersionNewClientValidate,
});

export const AddOptionalParams_fromOneRequired = createResilientMockApi({
  path: "/add-optional-params/from-one-required",
  verb: "get",
  commonValidate: function validate(req: MockRequest): void {
    req.expect.containsQueryParam("new-parameter", "foo");
  },
  oldApiVersionNewClientValidate: addOptionalParamsOldApiVersionNewClientValidate,
  newApiVersionNewClientValidate: addOptionalParamsNewApiVersionNewClientValidate,
});

export const AddOptionalParams_fromOneOptional = createResilientMockApi({
  path: "/add-optional-params/from-one-optional",
  verb: "get",
  commonValidate: function validate(req: MockRequest): void {
    req.expect.containsQueryParam("new-parameter", "foo");
  },
  oldApiVersionNewClientValidate: addOptionalParamsOldApiVersionNewClientValidate,
  newApiVersionNewClientValidate: addOptionalParamsNewApiVersionNewClientValidate,
});

export const AddContentType = createResilientMockApi({
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
});
