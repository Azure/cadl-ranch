import { passOnSuccess, ScenarioMockApi, mockapi, json } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

function getMockApiGet(route: string, value: any){
  return mockapi.get(`/models-properties/${route}`, (req) => {
    return {
      status: 200,
      body: json({ property: value }),
    };
  });
}

function getMockApiPut(route: string, value: any){
  return mockapi.put(`/models-properties/${route}`, (req) => {
    req.expect.bodyEquals({ property: value });
    return {
      status: 200,
    };
  });
}


Scenarios.Properties_Boolean_get = passOnSuccess(
  getMockApiGet("boolean", true)
);

Scenarios.Properties_Boolean_put = passOnSuccess(
  getMockApiPut("boolean", true)
);

Scenarios.Properties_String_get = passOnSuccess(
  getMockApiGet("string", "hello")
);

Scenarios.Properties_String_put = passOnSuccess(
  getMockApiPut("string", "hello")
);

Scenarios.Properties_Bytes_get = passOnSuccess(
  getMockApiGet("bytes", "aGVsbG8sIHdvcmxkIQ==")
);

Scenarios.Properties_Bytes_put = passOnSuccess(
  getMockApiPut("bytes", "aGVsbG8sIHdvcmxkIQ==")
);

Scenarios.Properties_Int_get = passOnSuccess(
  getMockApiGet("int", 42)
);

Scenarios.Properties_Int_put = passOnSuccess(
  getMockApiPut("int", 42)
);

Scenarios.Properties_Float_get = passOnSuccess(
  getMockApiGet("float", 42.42)
);

Scenarios.Properties_Float_put = passOnSuccess(
  getMockApiPut("float", 42.42)
);

Scenarios.Properties_Datetime_get = passOnSuccess(
  getMockApiGet("datetime", "2022-08-26T18:38:00Z")
);

Scenarios.Properties_Datetime_put = passOnSuccess(
  getMockApiPut("datetime", "2022-08-26T18:38:00Z")
);

Scenarios.Properties_Duration_get = passOnSuccess(
  getMockApiGet("duration", "P123DT22H14M12.011S")
);

Scenarios.Properties_Duration_put = passOnSuccess(
  getMockApiPut("duration", "P123DT22H14M12.011S")
);

Scenarios.Properties_Enum_get = passOnSuccess(
  getMockApiGet("enum", "ValueOne")
);

Scenarios.Properties_Enum_put = passOnSuccess(
  getMockApiPut("enum", "ValueOne")
);

Scenarios.Properties_ExtensibleEnum_get = passOnSuccess(
  getMockApiGet("enum", "UnknownValue")
);

Scenarios.Properties_ExtensibleEnum_put = passOnSuccess(
  getMockApiPut("enum", "UnknownValue")
);

Scenarios.Properties_Model_get = passOnSuccess(
  getMockApiGet("model", { property: "hello" })
);

Scenarios.Properties_Model_put = passOnSuccess(
  getMockApiPut("model", { property: "hello" })
);

Scenarios.Properties_CollectionsString_get = passOnSuccess(
  getMockApiGet("model", ["hello", "world"])
);

Scenarios.Properties_CollectionsString_put = passOnSuccess(
  getMockApiPut("model", ["hello", "world"])
);

Scenarios.Properties_CollectionsInt_get = passOnSuccess(
  getMockApiGet("model", [1, 2])
);

Scenarios.Properties_CollectionsInt_put = passOnSuccess(
  getMockApiPut("model", [1, 2])
);

Scenarios.Properties_CollectionsModel_get = passOnSuccess(
  getMockApiGet("model", [{property: "hello"}, {property: "world"}])
);

Scenarios.Properties_CollectionsModel_put = passOnSuccess(
  getMockApiPut("model", [{property: "hello"}, {property: "world"}])
);
