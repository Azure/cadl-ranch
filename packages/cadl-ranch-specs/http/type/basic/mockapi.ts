import { passOnSuccess, ScenarioMockApi, mockapi, json, MockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

interface MockApiOperations {
  responseBody: MockApi;
  requestBody: MockApi;
  requestParameter: MockApi;
}

function createModelMockApis(route: string, value: any): MockApiOperations {
  return {
    responseBody: mockapi.get(`/type/basic/${route}/response_body`, (req) => {
      return {
        status: 200,
        body: json(value),
      };
    }),
    requestBody: mockapi.put(`/type/basic/${route}/resquest_body`, (req) => {
      req.expect.coercedBodyEquals(value);
      return {
        status: 204,
      };
    }),
    requestParameter: mockapi.get(`/type/basic/${route}/request_parameter`, (req) => {
      req.expect.containsQueryParam("value", `${value}`);
      return {
        status: 204,
      };
    }),
  };
}

const DecimalTypeMock = createModelMockApis("decimal", 0.33333);
Scenarios.Type_Basic_DecimalType_responseBody = passOnSuccess(DecimalTypeMock.responseBody);
Scenarios.Type_Basic_DecimalType_requestBody = passOnSuccess(DecimalTypeMock.requestBody);
Scenarios.Type_Basic_DecimalType_requestParameter = passOnSuccess(DecimalTypeMock.requestParameter);

const Decimal128TypeMock = createModelMockApis("decimal128", 0.33333);
Scenarios.Type_Basic_Decimal128Type_responseBody = passOnSuccess(Decimal128TypeMock.responseBody);
Scenarios.Type_Basic_Decimal128Type_requestBody = passOnSuccess(Decimal128TypeMock.requestBody);
Scenarios.Type_Basic_Decimal128Type_requestParameter = passOnSuccess(Decimal128TypeMock.requestParameter);
