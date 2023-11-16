import { passOnSuccess, mockapi, json, MockApi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

// string value
Scenarios.Type_Scalar_String_get = passOnSuccess(
  mockapi.get("/type/scalar/string", (req) => {
    return { status: 200, body: json("test") };
  }),
);

Scenarios.Type_Scalar_String_put = passOnSuccess(
  mockapi.put("/type/scalar/string", (req) => {
    req.expect.bodyEquals("test");
    return { status: 204 };
  }),
);

// boolean value
Scenarios.Type_Scalar_Boolean_get = passOnSuccess(
  mockapi.get("/type/scalar/boolean", (req) => {
    return { status: 200, body: json(true) };
  }),
);

Scenarios.Type_Scalar_Boolean_put = passOnSuccess(
  mockapi.put("/type/scalar/boolean", (req) => {
    req.expect.bodyEquals(true);
    return { status: 204 };
  }),
);

//unknown value
Scenarios.Type_Scalar_Unknown_get = passOnSuccess(
  mockapi.get("/type/scalar/unknown", (req) => {
    return { status: 200, body: json("test") };
  }),
);

Scenarios.Type_Scalar_Unknown_put = passOnSuccess(
  mockapi.put("/type/scalar/unknown", (req) => {
    req.expect.bodyEquals("test");
    return { status: 204 };
  }),
);

interface MockApiOperations {
  responseBody: MockApi;
  requestBody: MockApi;
  requestParameter: MockApi;
}

function createModelMockApis(route: string, value: any): MockApiOperations {
  return {
    responseBody: mockapi.get(`/type/scalar/${route}/response_body`, (req) => {
      return {
        status: 200,
        body: json(value),
      };
    }),
    requestBody: mockapi.put(`/type/scalar/${route}/resquest_body`, (req) => {
      req.expect.coercedBodyEquals(value);
      return {
        status: 204,
      };
    }),
    requestParameter: mockapi.get(`/type/scalar/${route}/request_parameter`, (req) => {
      req.expect.containsQueryParam("value", `${value}`);
      return {
        status: 204,
      };
    }),
  };
}

const DecimalTypeMock = createModelMockApis("decimal", 0.33333);
Scenarios.Type_Scalar_DecimalType_responseBody = passOnSuccess(DecimalTypeMock.responseBody);
Scenarios.Type_Scalar_DecimalType_requestBody = passOnSuccess(DecimalTypeMock.requestBody);
Scenarios.Type_Scalar_DecimalType_requestParameter = passOnSuccess(DecimalTypeMock.requestParameter);

const Decimal128TypeMock = createModelMockApis("decimal128", 0.33333);
Scenarios.Type_Scalar_Decimal128Type_responseBody = passOnSuccess(Decimal128TypeMock.responseBody);
Scenarios.Type_Scalar_Decimal128Type_requestBody = passOnSuccess(Decimal128TypeMock.requestBody);
Scenarios.Type_Scalar_Decimal128Type_requestParameter = passOnSuccess(Decimal128TypeMock.requestParameter);
