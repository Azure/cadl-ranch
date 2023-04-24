# Cadl Ranch Project summary

### Authentication_ApiKey_valid

- Endpoint: `get /authentication/api-key/valid`

Expects header 'x-ms-api-key': 'valid-key'

### Authentication_ApiKey_invalid

- Endpoint: `get /authentication/api-key/invalid`

Expect error code 403 and error body:

```json
{
  "error": {
    "code": "InvalidApiKey",
    "message": "API key is invalid"
  }
}
```

### Authentication_OAuth2_valid

- Endpoint: `get /authentication/oauth2/valid`

Expects header 'authorization': 'Bearer https://security.microsoft.com/.default'

### Authentication_OAuth2_invalid

- Endpoint: `get /authentication/oauth2/invalid`

Expect error code 400 and error body:

```json
{
  "message": "Expected Bearer x but got Bearer y",
  "expected": "Bearer x",
  "actual": "Bearer y"
}
```

### Authentication_Union_validKey

- Endpoint: `get /authentication/union/validkey`

Expects header 'x-ms-api-key': 'valid-key'

### Authentication_Union_validToken

- Endpoint: `get /authentication/union/validtoken`

Expects header 'authorization': 'Bearer https://security.microsoft.com/.default'

### Azure_ClientGenerator_Core_Internal_get

- Endpoint: `get /azure/client-generator-core/internal/get`

This is a normal operation return a model. The model should be generatated and exported, though it is also used in another internal operation.
Expected query parameter: name=<any string>
Expected response body:

```json
{
  "name": <any string>
}
```

### Azure_ClientGenerator_Core_Internal_getInternal

- Endpoint: `get /azure/client-generator-core/internal/getInternal`

This ia an internal operation. The operation should be generated but not exposed.
Expected query parameter: name=<any string>
Expected response body:

```json
{
  "name": <any string>
}
```

### Azure_ClientGenerator_Core_Internal_postInternal

- Endpoint: `post /azure/client-generator-core/internal/postInternal`

This is an internal operation return a model. The model is only used in this internal operation. The operation and model should be generated but not exposed.
Expected body:

```json
{
  "id": 1,
  "name": <any string>
}
```

Expected response body:

```json
{
  "id": 1,
  "name": <any string>
}
```

### Azure_Core_Basic_createOrUpdate

- Endpoint: `get /azure/core/basic`

Should only generate models named User and UserOrder.

Expected path parameter: id=1
Expected query parameter: api-version=2022-12-01-preview

Expected input body:

```json
{
  "name": "Madge"
}
```

Expected response body:

```json
{
  "id": 1,
  "name": "Madge"
}
```

### Azure_Core_Basic_createOrReplace

- Endpoint: `get /azure/core/basic`

Should only generate models named User and UserOrder.

Expected path parameter: id=1
Expected query parameter: api-version=2022-12-01-preview

Expected input body:

```json
{
  "name": "Madge"
}
```

Expected response body:

```json
{
  "id": 1,
  "name": "Madge",
  "etag": "11bdc430-65e8-45ad-81d9-8ffa60d55b59"
}
```

### Azure_Core_Basic_get

- Endpoint: `get /azure/core/basic`

Should only generate models named User and UserOrder.

Expected path parameter: id=1
Expected query parameter: api-version=2022-12-01-preview

Expected response body:

```json
{
  "id": 1,
  "name": "Madge",
  "etag": "11bdc430-65e8-45ad-81d9-8ffa60d55b59"
}
```

### Azure_Core_Basic_list

- Endpoint: `get /azure/core/basic`

Should only generate models named User and UserOrder.

Should not generate visible model like CustomPage.

Expected query parameter: api-version=2022-12-01-preview&top=5&skip=10&orderby=id&filter=id%20lt%2010&select=id&select=orders&select=etag&expand=orders

Expected response body:

```json
{
  "value": [
    {
      "id": 1,
      "name": "Madge",
      "etag": "11bdc430-65e8-45ad-81d9-8ffa60d55b59",
      "orders": [{ "id": 1, "userId": 1, "detail": "a recorder" }]
    },
    {
      "id": 2,
      "name": "John",
      "etag": "11bdc430-65e8-45ad-81d9-8ffa60d55b5a",
      "orders": [{ "id": 2, "userId": 2, "detail": "a TV" }]
    }
  ]
}
```

### Azure_Core_Basic_listWithPage

- Endpoint: `get /azure/core/basic/page`

Should only generate models named User and UserOrder.

Should not generate visible model like Page.

Expected query parameter: api-version=2022-12-01-preview

Expected response body:

````json
{
  "value":[
     {
        "id":1,
        "name":"Madge",
        "etag": "11bdc430-65e8-45ad-81d9-8ffa60d55b59"
     }
  ]
}

### Azure_Core_Basic_listWithCustomPageModel

- Endpoint: `get /azure/core/basic/custom-page`

Should ideally only generate models named User and UserOrder. If your language has to, you can also generate CustomPageModel

Expected query parameter: api-version=2022-12-01-preview

Expected response body:
```json
{
  "value":[
     {
        "id":1,
        "name":"Madge",
        "etag": "11bdc430-65e8-45ad-81d9-8ffa60d55b59"
     }
  ]
}

### Azure_Core_Basic_delete

- Endpoint: `get /azure/core/basic`

Expected path parameter: id=1

Expected query parameter: api-version=2022-12-01-preview

Expected response of status code 204 with empty body.

### Azure_Core_Basic_export

- Endpoint: `get /azure/core/basic`

Should only generate models named User and UserOrder.

Expected path parameter: id=1
Expected query parameter: format=json
Expected query parameter: api-version=2022-12-01-preview

Expected response body:
```json
{
  "id": 1,
  "name": "Madge",
  "etag": "11bdc430-65e8-45ad-81d9-8ffa60d55b59"
}
````

### Azure_Core_Lro_Rpc_SamePollResult

- Endpoints:
  - `get /azure/core/lro/rpc/same-poll-result/jobs`
  - `get /azure/core/lro/rpc/same-poll-result`

Expected verb: POST
Expected request body:

```json
{
  "comment": "async job"
}
```

Expected status code: 202
Expected response header: operation-location={endpoint}/same-poll-result/jobs/job1
Expected response body:

```json
{
  "jobId": "job1",
  "comment": "async job",
  "status": "InProgress"
}
```

Expected verb: GET
Expected URL: {endpoint}/same-poll-result/jobs/job1

Expected status code: 200
Expected response body:

```json
{
  "jobId": "job1",
  "comment": "async job",
  "status": "InProgress"
}
```

Expected verb: GET
Expected URL: {endpoint}/same-poll-result/jobs/job1

Expected status code: 200
Expected response body:

```json
{
  "jobId": "job1",
  "comment": "async job",
  "status": "Succeeded",
  "results": ["job1 result"]
}
```

### Azure_Core_Lro_Rpc_DifferentPollResult

- Endpoints:
  - `get /azure/core/lro/rpc/different-poll-result/jobs`
  - `get /azure/core/lro/rpc/different-poll-result`

Expected verb: POST
Expected request body:

```json
{
  "comment": "async job"
}
```

Expected status code: 202
Expected response header: operation-location={endpoint}/different-poll-result/jobs/operations/operation1
Expected response header: location={endpoint}/different-poll-result/jobs/job1
Expected response body:

```json
{
  "operationId": "operation1",
  "status": "InProgress"
}
```

Expected verb: GET
Expected URL: {endpoint}/different-poll-result/jobs/operations/operation1

Expected status code: 200
Expected response body:

```json
{
  "operationId": "operation1",
  "status": "InProgress"
}
```

Expected verb: GET
Expected URL: {endpoint}/different-poll-result/jobs/operations/operation1

Expected status code: 200
Expected response body:

```json
{
  "operationId": "operation1",
  "status": "Succeeded"
}
```

Expected verb: GET
Expected URL: {endpoint}/different-poll-result/jobs/job1

Expected status code: 200
Expected response body:

```json
{
  "jobId": "job1",
  "comment": "async job",
  "status": "Succeeded",
  "results": ["job1 result"]
}
```

### Azure_Core_Lro_Standard_createOrReplace

- Endpoint: `get /azure/core/lro/standard`

Should only generate one model named User.

Expected verb: PUT
Expected path parameter: name=madge

Expected request body:

```json
{
  "role": "contributor"
}
```

Expected status code: 201
Expected response header: operation-location={endpoint}/users/madge/operations/operation1
Expected response body:

```json
{
  "name": "madge",
  "role": "contributor"
}
```

Expected verb: GET
Expected URL: {endpoint}/users/madge/operations/operation1

Expected status code: 200
Expected response body:

```json
{
  "id": "operation1",
  "status": "InProgress"
}
```

Expected verb: GET
Expected URL: {endpoint}/users/madge/operations/operation1

Expected status code: 200
Expected response body:

```json
{
  "id": "operation1",
  "status": "Succeeded"
}
```

(The last GET call on resource URL is optional)
Expected verb: GET
Expected URL: {endpoint}/users/madge

Expected status code: 200
Expected response body:

```json
{
  "name": "madge",
  "role": "contributor"
}
```

### Azure_Core_Lro_Standard_delete

- Endpoint: `get /azure/core/lro/standard`

Expected verb: DELETE
Expected path parameter: name=madge

Expected status code: 202
Expected response header: operation-location={endpoint}/users/madge/operations/operation2
Expected response body:

```json
{
  "id": "operation2",
  "status": "InProgress"
}
```

Expected verb: GET
Expected URL: {endpoint}/users/madge/operations/operation2

Expected status code: 200
Expected response body:

```json
{
  "id": "operation2",
  "status": "InProgress"
}
```

Expected verb: GET
Expected URL: {endpoint}/users/madge/operations/operation2

Expected status code: 200
Expected response body:

```json
{
  "id": "operation2",
  "status": "Succeeded"
}
```

### Azure_Core_Lro_Standard_export

- Endpoint: `get /azure/core/lro/standard`

Should only generate one model named ExportedUser.

Expected verb: POST
Expected path parameter: name=madge
Expected query parameter: format=json

Expected status code: 202
Expected response header: operation-location={endpoint}/users/madge/operations/operation3
Expected response body:

```json
{
  "id": "operation3",
  "status": "InProgress"
}
```

Expected verb: GET
Expected URL: {endpoint}/users/madge/operations/operation3

Expected status code: 200
Expected response body:

```json
{
  "id": "operation3",
  "status": "InProgress"
}
```

Expected verb: GET
Expected URL: {endpoint}/users/madge/operations/operation3

Expected status code: 200
Expected response body:

```json
{
  "id": "operation3",
  "status": "Succeeded",
  "result": {
    "name": "madge",
    "resourceUri": "/users/madge"
  }
}
```

### Azure_Core_Traits_smokeTest

- Endpoint: `get /azure/core/traits`

Expected path parameter: id=1
Expected query parameter: api-version=2022-12-01-preview
Expected header parameters:

- foo=123
- if-match=valid
- if-none-match=invalid
- if-unmodified-since=Fri, 26 Aug 2022 14:38:00 GMT
- if-modified-since=Thu, 26 Aug 2021 14:38:00 GMT
- x-ms-client-request-id=<any string>

Expected response header: x-ms-client-request-id=<any string>
Expected response body:

```json
{
  "id": 1,
  "name": "Madge",
  "etag": "11bdc430-65e8-45ad-81d9-8ffa60d55b59"
}
```

### Parameters_CollectionFormat_Query_multi

- Endpoint: `get /parameters/collection-format/query/multi`

This test is testing sending a multi collection format array query parameters

### Parameters_CollectionFormat_Query_ssv

- Endpoint: `get /parameters/collection-format/query/ssv`

This test is testing sending a ssv collection format array query parameters

### Parameters_CollectionFormat_Query_tsv

- Endpoint: `get /parameters/collection-format/query/tsv`

This test is testing sending a tsv collection format array query parameters

### Parameters_CollectionFormat_Query_pipes

- Endpoint: `get /parameters/collection-format/query/pipes`

This test is testing sending a pipes collection format array query parameters

### Parameters_CollectionFormat_Query_csv

- Endpoint: `get /parameters/collection-format/query/csv`

This test is testing sending a csv collection format array query parameters

### Parameters_CollectionFormat_Header_csv

- Endpoint: `get /parameters/collection-format/header/csv`

This test is testing sending a csv collection format array header parameters

### Parameters_Spread_Model_spreadAsRequestBody

- Endpoint: `put /parameters/spread/model/request-body`

Test case for spread named model.

Should generate request body model named `BodyParameter`.
Should generate an operation like below:

```
spreadAsRequestBody(bodyParameter: BodyParameter)
```

Note the parameter name is guessed from the model name and it may vary by language.

Expected request body:

```json
{ "name": "foo" }
```

### Parameters_Spread_Alias_spreadAsRequestBody

- Endpoint: `put /parameters/spread/alias/request-body`

Test case for spread alias.

Should not generate any model named `BodyParameter`.
Should generate an operation like:

```
spreadAsRequestBody(name: string)
```

Expected request body:

```json
{ "name": "foo" }
```

### Parameters_Spread_Alias_spreadAsRequestParameter

- Endpoint: `put /parameters/spread/alias/request-parameter/{id}`

Test case for spread alias with path and header parameter.

Should not generate any model named `RequestParameter`.
Should generate an operation like below:

```
spreadAsRequestParameter(id: string, x_ms_test_header: string, name: string)
```

Note the parameter name may be normalized and vary by language.

Expected path parameter: id="1"
Expected header parameter: x-ms-test-header="bar"
Expected request body:

```json
{ "name": "foo" }
```

### Parameters_Spread_Alias_spreadWithMultipleParameters

- Endpoint: `put /parameters/spread/alias/multiple-parameters/{id}`

Test case for spread alias including 6 parameters. May handle as property bag for these parameters.

Should not generate any model named `AliasMultipleRequestParameters`.
Should generate an operation like below:

```
spreadWithMultipleParameters(id: string, x_ms_test_header: string, prop1: string, prop2: string, prop3: string, prop4: string, prop5: string, prop6: string)
```

Note it's also acceptable if some languages handle it as property bag.

Expected path parameter: id="1"
Expected header parameter: x-ms-test-header="bar"
Expected request body:

```json
{
  "prop1": "foo1",
  "prop2": "foo2",
  "prop3": "foo3",
  "prop4": "foo4",
  "prop5": "foo5",
  "prop6": "foo6"
}
```

### Projection_ProjectedName_Property_json

- Endpoint: `post /projection/projected-name/property/json`

Testing that we can project the JSON name on the wire from defaultName -> wireName.
Your generated SDK should generate JsonProjectedNameModel with one property `defaultName` with wire name `wireName`.

Expected request body:

```json
{ "wireName": true }
```

### Projection_ProjectedName_Property_client

- Endpoint: `post /projection/projected-name/property/client`

Testing that we can project the client name in our generated SDKs.
Your generated SDK should generate ClientProjectedNameModel with one property `clientName` with wire name `defaultName`.

Expected request body:

```json
{ "defaultName": true }
```

### Projection_ProjectedName_Property_language

- Endpoint: `post /projection/projected-name/property/language`

Testing that we can project the language specific name in our generated SDKs.
Your generated SDK should generate ClientProjectedNameModel with one property with your language specific property name and wire name `defaultName`.

Expected request body:

```json
{ "defaultName": true }
```

### Projection_ProjectedName_Property_jsonAndClient

- Endpoint: `post /projection/projected-name/property/json-and-client`

Testing that we can project the client name and the wire name.
Your generated SDK should generate JsonAndClientProjectedNameModel with one property with client name `clientName` and wire name `wireName`.

Expected request body:

```json
{ "wireName": true }
```

### Projection_ProjectedName_operation

- Endpoint: `post /projection/projected-name/operation`

Testing that we can project the operation name.
Your generated SDK should generate an operation called `clientName`.

Expected status code: 204

### Projection_ProjectedName_parameter

- Endpoint: `post /projection/projected-name/parameter`

Testing that we can project a parameter name.
Your generated SDK should generate an operation `parameter` with a single parameter called `clientName`.

Expected query parameter: `default-name="true"`

### Resiliency_ServiceDriven_AddOptionalParam_fromNone

- Endpoint: `head /add-optional-param/from-none`

Need the following two calls:

- Pass in `serviceDeploymentVersion="v2"` and `apiVersion="v1"` with no parameters.
- Pass in `serviceDeploymentVersion="v2"` and `apiVersion="v2"` with query parameter `new-parameter="new"`.

There are three concepts that should be clarified:

1. Client spec version: refers to the spec that the client is generated from. 'v1' is a client generated from old.tsp and 'v2' is a client generated from main.tsp.
2. Service deployment version: refers to a deployment version of the service. 'v1' represents the initial deployment of the service with a single api version. 'v2' represents the new deployment of a service with multiple api versions
3. Api version: The initial deployment of the service only supports api version 'v1'. The new deployment of the service supports api versions 'v1' and 'v2'.

With the above two calls, we test the following configurations from this service spec:

- A client generated from the second service spec can call the second deployment of a service with api version v1
- A client generated from the second service spec can call the second deployment of a service with api version v2 with the updated changes

Tests that we can grow up an operation from accepting no parameters to accepting an optional input parameter.

### Resiliency_ServiceDriven_AddOptionalParam_fromOneRequired

- Endpoint: `get /add-optional-param/from-one-required`

Need the following two calls:

- Pass in `serviceDeploymentVersion="v2"` and `apiVersion="v1"` with query parameter `parameter="required"`.
- Pass in `serviceDeploymentVersion="v2"` and `apiVersion="v2"` with query parameter `parameter="required"` and query parameter `new-parameter="new"`.

There are three concepts that should be clarified:

1. Client spec version: refers to the spec that the client is generated from. 'v1' is a client generated from old.tsp and 'v2' is a client generated from main.tsp.
2. Service deployment version: refers to a deployment version of the service. 'v1' represents the initial deployment of the service with a single api version. 'v2' represents the new deployment of a service with multiple api versions
3. Api version: The initial deployment of the service only supports api version 'v1'. The new deployment of the service supports api versions 'v1' and 'v2'.

With the above two calls, we test the following configurations from this service spec:

- A client generated from the second service spec can call the second deployment of a service with api version v1
- A client generated from the second service spec can call the second deployment of a service with api version v2 with the updated changes

Tests that we can grow up an operation from accepting one required parameter to accepting a required parameter and an optional parameter.

### Resiliency_ServiceDriven_AddOptionalParam_fromOneOptional

- Endpoint: `get /add-optional-param/from-one-optional`

Need the following two calls:

- Pass in `serviceDeploymentVersion="v2"` and `apiVersion="v1"` with query parameter `parameter="optional"`.
- Pass in `serviceDeploymentVersion="v2"` and `apiVersion="v2"` with query parameter `parameter="optional"` and query parameter `new-parameter="new"`.

There are three concepts that should be clarified:

1. Client spec version: refers to the spec that the client is generated from. 'v1' is a client generated from old.tsp and 'v2' is a client generated from main.tsp.
2. Service deployment version: refers to a deployment version of the service. 'v1' represents the initial deployment of the service with a single api version. 'v2' represents the new deployment of a service with multiple api versions
3. Api version: The initial deployment of the service only supports api version 'v1'. The new deployment of the service supports api versions 'v1' and 'v2'.

With the above two calls, we test the following configurations from this service spec:

- A client generated from the second service spec can call the second deployment of a service with api version v1
- A client generated from the second service spec can call the second deployment of a service with api version v2 with the updated changes

Tests that we can grow up an operation from accepting one optional parameter to accepting two optional parameters.

### Resiliency_ServiceDriven_addOperation

- Endpoint: `delete /add-operation`

Need the following two calls:

- Call with client spec version "v1" with `serviceDeploymentVersion="v2"` and `apiVersion="v2"`
- Call with client spec version "v2" with `serviceDeploymentVersion="v2"` and `apiVersion="v2"`

There are three concepts that should be clarified:

1. Client spec version: refers to the spec that the client is generated from. 'v1' is a client generated from old.tsp and 'v2' is a client generated from main.tsp.
2. Service deployment version: refers to a deployment version of the service. 'v1' represents the initial deployment of the service with a single api version. 'v2' represents the new deployment of a service with multiple api versions
3. Api version: The initial deployment of the service only supports api version 'v1'. The new deployment of the service supports api versions 'v1' and 'v2'.

With the above two calls, we test the following configurations from this service spec:

- A client generated from the first service spec can break the glass and call the second deployment of a service with api version v2
- A client generated from the second service spec can call the second deployment of a service with api version v2 with the updated changes

Tests that we can grow up by adding an operation.

### Server_Path_Multiple_noOperationParams

- Endpoint: `get /`

Operation with client path parameters.

Expected path parameter: apiVersion=v1.0

### Server_Path_Multiple_withOperationPathParam

- Endpoint: `get /`

Operation with client and method path parameters.

Expected path parameter: apiVersion=v1.0, keyword=test

### Server_Path_Single_myOp

- Endpoint: `head /server/path/single/myOp`

An simple operation in a parameterized server.

### SpecialWords_Operation_for

- Endpoint: `get /special-words/operation/for`

A operation name of `for` should work.

### SpecialWords_Parameter_getWithIf

- Endpoint: `get /special-words/parameter/if`

Expect input parameter `if='weekend'`

### SpecialWords_Parameter_getWithFilter

- Endpoint: `get /special-words/parameter/filter`

Expect input parameter `filter='abc*.'`

### SpecialWords_Model_get

- Endpoint: `get /special-words/model/get`

Expected response body:

```json
{
  "model.kind": "derived",
  "derived.name": "my.name",
  "for": "value"
}
```

### SpecialWords_Model_put

- Endpoint: `put /special-words/model/put`

Expected input body:

```json
{
  "model.kind": "derived",
  "derived.name": "my.name",
  "for": "value"
}
```

### Type_Array_Int32Value_get

- Endpoint: `get /type/array/int32`

Expected Array response body:

```json
[1, 2]
```

### Type_Array_Int32Value_put

- Endpoint: `put /type/array/int32`

Expected Array input body:

```json
[1, 2]
```

### Type_Array_Int64Value_get

- Endpoint: `get /type/array/int64`

Expected Array response body:

```json
[0x7fffffffffffffff, -0x7fffffffffffffff]
```

### Type_Array_Int64Value_put

- Endpoint: `put /type/array/int64`

Expected Array input body:

```json
[0x7fffffffffffffff, -0x7fffffffffffffff]
```

### Type_Array_BooleanValue_get

- Endpoint: `get /type/array/boolean`

Expected Array response body:

```json
[true, false]
```

### Type_Array_BooleanValue_put

- Endpoint: `put /type/array/boolean`

Expected Array input body:

```json
[true, false]
```

### Type_Array_StringValue_get

- Endpoint: `get /type/array/string`

Expected Array response body:

```json
["hello", ""]
```

### Type_Array_StringValue_put

- Endpoint: `put /type/array/string`

Expected Array input body:

```json
["hello", ""]
```

### Type_Array_Float32Value_get

- Endpoint: `get /type/array/float32`

Expected Array response body:

```json
[42.42]
```

### Type_Array_Float32Value_put

- Endpoint: `put /type/array/float32`

Expected Array input body:

```json
[42.42]
```

### Type_Array_DatetimeValue_get

- Endpoint: `get /type/array/datetime`

Expected Array response body:

```json
["2022-08-26T18:38:00Z"]
```

### Type_Array_DatetimeValue_put

- Endpoint: `put /type/array/datetime`

Expected Array input body:

```json
["2022-08-26T18:38:00Z"]
```

### Type_Array_DurationValue_get

- Endpoint: `get /type/array/duration`

Expected Array response body:

```json
["P123DT22H14M12.011S"]
```

### Type_Array_DurationValue_put

- Endpoint: `put /type/array/duration`

Expected Array input body:

```json
["P123DT22H14M12.011S"]
```

### Type_Array_UnknownValue_get

- Endpoint: `get /type/array/unknown`

Expected Array response body:

```json
[1, 'hello', 'k3': null]
```

### Type_Array_UnknownValue_put

- Endpoint: `put /type/array/unknown`

Expected Array input body:

```json
[1, 'hello', 'k3': null]
```

### Type_Array_ModelValue_get

- Endpoint: `get /type/array/model`

Expected Array response body:

```json
[{ "property": "hello" }, { "property": "world" }]
```

### Type_Array_ModelValue_put

- Endpoint: `put /type/array/model`

Expected Array input body:

```json
[{ "property": "hello" }, { "property": "world" }]
```

### Type_Array_NullableFloatValue_get

- Endpoint: `get /type/array/nullable-float`

Expected Array response body:

```json
[1.2, null, 3.0]
```

### Type_Array_NullableFloatValue_put

- Endpoint: `put /type/array/nullable-float`

Expected Array input body:

```json
[1.2, null, 3.0]
```

### Type_Dictionary_Int32Value_get

- Endpoint: `get /type/dictionary/int32`

Expected dictionary response body:

```json
{ "k1": 1, "k2": 2 }
```

### Type_Dictionary_Int32Value_put

- Endpoint: `put /type/dictionary/int32`

Expected dictionary input body:

```json
{ "k1": 1, "k2": 2 }
```

### Type_Dictionary_Int64Value_get

- Endpoint: `get /type/dictionary/int64`

Expected dictionary response body:

```json
{ "k1": 0x7fffffffffffffff, "k2": -0x7fffffffffffffff }
```

### Type_Dictionary_Int64Value_put

- Endpoint: `put /type/dictionary/int64`

Expected dictionary input body:

```json
{ "k1": 0x7fffffffffffffff, "k2": -0x7fffffffffffffff }
```

### Type_Dictionary_BooleanValue_get

- Endpoint: `get /type/dictionary/boolean`

Expected dictionary response body:

```json
{ "k1": true, "k2": false }
```

### Type_Dictionary_BooleanValue_put

- Endpoint: `put /type/dictionary/boolean`

Expected dictionary input body:

```json
{ "k1": true, "k2": false }
```

### Type_Dictionary_StringValue_get

- Endpoint: `get /type/dictionary/string`

Expected dictionary response body:

```json
{ "k1": "hello", "k2": "" }
```

### Type_Dictionary_StringValue_put

- Endpoint: `put /type/dictionary/string`

Expected dictionary input body:

```json
{ "k1": "hello", "k2": "" }
```

### Type_Dictionary_Float32Value_get

- Endpoint: `get /type/dictionary/float32`

Expected dictionary response body:

```json
{ "k1": 42.42 }
```

### Type_Dictionary_Float32Value_put

- Endpoint: `put /type/dictionary/float32`

Expected dictionary input body:

```json
{ "k1": 42.42 }
```

### Type_Dictionary_DatetimeValue_get

- Endpoint: `get /type/dictionary/datetime`

Expected dictionary response body:

```json
{ "k1": "2022-08-26T18:38:00Z" }
```

### Type_Dictionary_DatetimeValue_put

- Endpoint: `put /type/dictionary/datetime`

Expected dictionary input body:

```json
{ "k1": "2022-08-26T18:38:00Z" }
```

### Type_Dictionary_DurationValue_get

- Endpoint: `get /type/dictionary/duration`

Expected dictionary response body:

```json
{ "k1": "P123DT22H14M12.011S" }
```

### Type_Dictionary_DurationValue_put

- Endpoint: `put /type/dictionary/duration`

Expected dictionary input body:

```json
{ "k1": "P123DT22H14M12.011S" }
```

### Type_Dictionary_UnknownValue_get

- Endpoint: `get /type/dictionary/unknown`

Expected dictionary response body:

```json
{ "k1": 1, "k2": "hello", "k3": null }
```

### Type_Dictionary_UnknownValue_put

- Endpoint: `put /type/dictionary/unknown`

Expected dictionary input body:

```json
{ "k1": 1, "k2": "hello", "k3": null }
```

### Type_Dictionary_ModelValue_get

- Endpoint: `get /type/dictionary/model`

Expected dictionary response body:

```json
{ "k1": { "property": "hello" }, "k2": { "property": "world" } }
```

### Type_Dictionary_ModelValue_put

- Endpoint: `put /type/dictionary/model`

Expected dictionary input body:

```json
{ "k1": { "property": "hello" }, "k2": { "property": "world" } }
```

### Type_Dictionary_RecursiveModelValue_get

- Endpoint: `get /type/dictionary/model/recursive`

Expected dictionary response body:

```json
{
  "k1": { "property": "hello", "children": {} },
  "k2": {
    "property": "world",
    "children": { "k2.1": { "property": "inner world" } }
  }
}
```

### Type_Dictionary_RecursiveModelValue_put

- Endpoint: `put /type/dictionary/model/recursive`

Expected dictionary input body:

```json
{
  "k1": { "property": "hello", "children": {} },
  "k2": {
    "property": "world",
    "children": { "k2.1": { "property": "inner world" } }
  }
}
```

### Type_Dictionary_NullableFloatValue_get

- Endpoint: `get /type/dictionary/nullable-float`

Expected dictionary response body:

```json
{ "k1": 1.2, "k2": 0.5, "k3": null }
```

### Type_Dictionary_NullableFloatValue_put

- Endpoint: `put /type/dictionary/nullable-float`

Expected dictionary input body:

```json
{ "k1": 1.2, "k2": 0.5, "k3": null }
```

### Type_Enum_Extensible_String_getKnownValue

- Endpoint: `get /type/enum/extensible/string/known-value`

Expect to handle a known value. Mock api will return 'Monday'

### Type_Enum_Extensible_String_getUnknownValue

- Endpoint: `get /type/enum/extensible/string/unknown-value`

Expect to handle an unknown value. Mock api will return 'Weekend'

### Type_Enum_Extensible_String_putKnownValue

- Endpoint: `put /type/enum/extensible/string/known-value`

Expect to send a known value. Mock api expect to receive 'Monday'

### Type_Enum_Extensible_String_putUnknownValue

- Endpoint: `put /type/enum/extensible/string/unknown-value`

Expect to handle an unknown value. Mock api expect to receive 'Weekend'

### Type_Enum_Fixed_String_getKnownValue

- Endpoint: `get /type/enum/fixed/string/known-value`

Expect to handle a known value. Mock api will return 'Monday'

### Type_Enum_Fixed_String_putKnownValue

- Endpoint: `put /type/enum/fixed/string/known-value`

Expect to send a known value. Mock api expect to receive 'Monday'

### Type_Enum_Fixed_String_putUnknownValue

- Endpoint: `put /type/enum/fixed/string/unknown-value`

Expect to handle an unknown value. Mock api expect to receive 'Weekend'

### Type_Model_Inheritance_Discriminated_getModel

- Endpoint: `get /type/model/inheritance/discriminated/model`

Generate and receive polymorphic model in multiple levels inheritance with 2 discriminators.
Expected response body:

```json
{ "age": 1, "kind": "shark", "sharktype": "goblin" }
```

### Type_Model_Inheritance_Discriminated_putModel

- Endpoint: `put /type/model/inheritance/discriminated/model`

Generate and send polymorphic model in multiple levels inheritance with 2 discriminators.
Expected input body:

```json
{ "age": 1, "kind": "shark", "sharktype": "goblin" }
```

### Type_Model_Inheritance_Discriminated_getRecursiveModel

- Endpoint: `get /type/model/inheritance/discriminated/recursivemodel`

Generate and receive polymorphic models has collection and dictionary properties referring to other polymorphic models.
Expected response body:

```json
{
  "age": 1,
  "kind": "salmon",
  "partner": {
    "age": 2,
    "kind": "shark",
    "sharktype": "saw"
  },
  "friends": [
    {
      "age": 2,
      "kind": "salmon",
      "partner": {
        "age": 3,
        "kind": "salmon"
      },
      "hate": {
        "key1": {
          "age": 4,
          "kind": "salmon"
        },
        "key2": {
          "age": 2,
          "kind": "shark",
          "sharktype": "goblin"
        }
      }
    },
    {
      "age": 3,
      "kind": "shark",
      "sharktype": "goblin"
    }
  ],
  "hate": {
    "key3": {
      "age": 3,
      "kind": "shark",
      "sharktype": "saw"
    },
    "key4": {
      "age": 2,
      "kind": "salmon",
      "friends": [
        {
          "age": 1,
          "kind": "salmon"
        },
        {
          "age": 4,
          "kind": "shark",
          "sharktype": "goblin"
        }
      ]
    }
  }
}
```

### Type_Model_Inheritance_Discriminated_putRecursiveModel

- Endpoint: `put /type/model/inheritance/discriminated/recursivemodel`

Generate and send polymorphic models has collection and dictionary properties referring to other polymorphic models.
Expected input body:

```json
{
  "age": 1,
  "kind": "salmon",
  "partner": {
    "age": 2,
    "kind": "shark",
    "sharktype": "saw"
  },
  "friends": [
    {
      "age": 2,
      "kind": "salmon",
      "partner": {
        "age": 3,
        "kind": "salmon"
      },
      "hate": {
        "key1": {
          "age": 4,
          "kind": "salmon"
        },
        "key2": {
          "age": 2,
          "kind": "shark",
          "sharktype": "goblin"
        }
      }
    },
    {
      "age": 3,
      "kind": "shark",
      "sharktype": "goblin"
    }
  ],
  "hate": {
    "key3": {
      "age": 3,
      "kind": "shark",
      "sharktype": "saw"
    },
    "key4": {
      "age": 2,
      "kind": "salmon",
      "friends": [
        {
          "age": 1,
          "kind": "salmon"
        },
        {
          "age": 4,
          "kind": "shark",
          "sharktype": "goblin"
        }
      ]
    }
  }
}
```

### Type_Model_Inheritance_Discriminated_getMissingDiscriminator

- Endpoint: `get /type/model/inheritance/discriminated/missingdiscriminator`

Get a model omitting the discriminator.
Expected response body:

```json
{ "age": 1 }
```

### Type_Model_Inheritance_Discriminated_getWrongDiscriminator

- Endpoint: `get /type/model/inheritance/discriminated/wrongdiscriminator`

Get a model containing discriminator value never defined.
Expected response body:

```json
{ "age": 1, "kind": "wrongKind" }
```

### Type_Model_Inheritance_postValid

- Endpoint: `post /type/model/inheritance/valid`

Generate and send model.
Expected input body:

```json
{ "name": "abc", "age": 32, "smart": true }
```

### Type_Model_Inheritance_getValid

- Endpoint: `get /type/model/inheritance/valid`

Generate and receive model.
Expected response body:

```json
{ "name": "abc", "age": 32, "smart": true }
```

### Type_Model_Inheritance_putValid

- Endpoint: `put /type/model/inheritance/valid`

Generate, send, and receive round-trip bottom model.

### Type_Model_Usage_input

- Endpoint: `get /type/model/usage/input`

Send a POST request with the following body {requiredProp: "example-value"}

### Type_Model_Usage_output

- Endpoint: `get /type/model/usage/output`

Send a GET request which return the following body {requiredProp: "example-value"}

### Type_Model_Usage_inputAndOutput

- Endpoint: `get /type/model/usage/input-output`

Send a POST request which return the following body {requiredProp: "example-value"} and return the same.

### Type_Model_Visibility_getModel

- Endpoint: `get /type/model/visibility`

Generate and receive output model with readonly properties.
Expected input body:

```json
{
  "queryProp": 123
}
```

Expected response body:

```json
{
  "readProp": "abc"
}
```

### Type_Model_Visibility_headModel

- Endpoint: `head /type/model/visibility`

Generate abd send put model with write/create properties.
Expected input body:

```json
{
  "queryProp": 123
}
```

### Type_Model_Visibility_putModel

- Endpoint: `put /type/model/visibility`

Generate abd send put model with write/create/update properties.
Expected input body:

```json
{
  "createProp": ["foo", "bar"],
  "updateProp": [1, 2]
}
```

### Type_Model_Visibility_patchModel

- Endpoint: `patch /type/model/visibility`

Generate abd send put model with write/update properties.
Expected input body:

```json
{
  "updateProp": [1, 2]
}
```

### Type_Model_Visibility_postModel

- Endpoint: `post /type/model/visibility`

Generate abd send put model with write/create properties.
Expected input body:

```json
{
  "createProp": ["foo", "bar"]
}
```

### Type_Model_Visibility_deleteModel

- Endpoint: `delete /type/model/visibility`

Generate abd send put model with write/create properties.
Expected input body:

```json
{
  "deleteProp": true
}
```

### Type_Property_Nullable_String_getNonNull

- Endpoint: `get /type/property/nullable/string/non-null`

Expected response body:

```json
{ "requiredProperty": "foo", "nullableProperty": hello}
```

### Type_Property_Nullable_String_getNull

- Endpoint: `get /type/property/nullable/string/null`

Expected response body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Type_Property_Nullable_String_patchNonNull

- Endpoint: `patch /type/property/nullable/string/non-null`

Expected request body:

```json
{ "requiredProperty": "foo", "nullableProperty": hello}
```

### Type_Property_Nullable_String_patchNull

- Endpoint: `patch /type/property/nullable/string/null`

Expected request body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Type_Property_Nullable_Bytes_getNonNull

- Endpoint: `get /type/property/nullable/bytes/non-null`

Expected response body:

```json
{ "requiredProperty": "foo", "nullableProperty": aGVsbG8sIHdvcmxkIQ==}
```

### Type_Property_Nullable_Bytes_getNull

- Endpoint: `get /type/property/nullable/bytes/null`

Expected response body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Type_Property_Nullable_Bytes_patchNonNull

- Endpoint: `patch /type/property/nullable/bytes/non-null`

Expected request body:

```json
{ "requiredProperty": "foo", "nullableProperty": aGVsbG8sIHdvcmxkIQ==}
```

### Type_Property_Nullable_Bytes_patchNull

- Endpoint: `patch /type/property/nullable/bytes/null`

Expected request body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Type_Property_Nullable_Datetime_getNonNull

- Endpoint: `get /type/property/nullable/datetime/non-null`

Expected response body:

```json
{ "requiredProperty": "foo", "nullableProperty": 2022-08-26T18:38:00Z}
```

### Type_Property_Nullable_Datetime_getNull

- Endpoint: `get /type/property/nullable/datetime/null`

Expected response body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Type_Property_Nullable_Datetime_patchNonNull

- Endpoint: `patch /type/property/nullable/datetime/non-null`

Expected request body:

```json
{ "requiredProperty": "foo", "nullableProperty": 2022-08-26T18:38:00Z}
```

### Type_Property_Nullable_Datetime_patchNull

- Endpoint: `patch /type/property/nullable/datetime/null`

Expected request body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Type_Property_Nullable_Duration_getNonNull

- Endpoint: `get /type/property/nullable/duration/non-null`

Expected response body:

```json
{ "requiredProperty": "foo", "nullableProperty": P123DT22H14M12.011S}
```

### Type_Property_Nullable_Duration_getNull

- Endpoint: `get /type/property/nullable/duration/null`

Expected response body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Type_Property_Nullable_Duration_patchNonNull

- Endpoint: `patch /type/property/nullable/duration/non-null`

Expected request body:

```json
{ "requiredProperty": "foo", "nullableProperty": P123DT22H14M12.011S}
```

### Type_Property_Nullable_Duration_patchNull

- Endpoint: `patch /type/property/nullable/duration/null`

Expected request body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Type_Property_Nullable_CollectionsByte_getNonNull

- Endpoint: `get /type/property/nullable/collections/bytes/non-null`

Expected response body:

```json
{ "requiredProperty": "foo", "nullableProperty": [aGVsbG8sIHdvcmxkIQ==, aGVsbG8sIHdvcmxkIQ==]}
```

### Type_Property_Nullable_CollectionsByte_getNull

- Endpoint: `get /type/property/nullable/collections/bytes/null`

Expected response body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Type_Property_Nullable_CollectionsByte_patchNonNull

- Endpoint: `patch /type/property/nullable/collections/bytes/non-null`

Expected request body:

```json
{ "requiredProperty": "foo", "nullableProperty": [aGVsbG8sIHdvcmxkIQ==, aGVsbG8sIHdvcmxkIQ==]}
```

### Type_Property_Nullable_CollectionsByte_patchNull

- Endpoint: `patch /type/property/nullable/collections/bytes/null`

Expected request body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Type_Property_Nullable_CollectionsModel_getNonNull

- Endpoint: `get /type/property/nullable/collections/model/non-null`

Expected response body:

```json
{
  "requiredProperty": "foo",
  "nullableProperty": [{ "property": "hello" }, { "property": "world" }]
}
```

### Type_Property_Nullable_CollectionsModel_getNull

- Endpoint: `get /type/property/nullable/collections/model/null`

Expected response body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Type_Property_Nullable_CollectionsModel_patchNonNull

- Endpoint: `patch /type/property/nullable/collections/model/non-null`

Expected request body:

```json
{
  "requiredProperty": "foo",
  "nullableProperty": [{ "property": "hello" }, { "property": "world" }]
}
```

### Type_Property_Nullable_CollectionsModel_patchNull

- Endpoint: `patch /type/property/nullable/collections/model/null`

Expected request body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Type_Property_Optional_String_getAll

- Endpoint: `get /type/property/optional/string/all`

Expected response body:

```json
{"property": doc}
```

### Type_Property_Optional_String_getDefault

- Endpoint: `get /type/property/optional/string/default`

Expected response body:

```json
{}
```

### Type_Property_Optional_String_putAll

- Endpoint: `put /type/property/optional/string/all`

Expected request body:

```json
{"property": hello}
```

### Type_Property_Optional_String_putDefault

- Endpoint: `put /type/property/optional/string/default`

Expected request body:

```json
{}
```

### Type_Property_Optional_Bytes_getAll

- Endpoint: `get /type/property/optional/bytes/all`

Expected response body:

```json
{"property": doc}
```

### Type_Property_Optional_Bytes_getDefault

- Endpoint: `get /type/property/optional/bytes/default`

Expected response body:

```json
{}
```

### Type_Property_Optional_Bytes_putAll

- Endpoint: `put /type/property/optional/bytes/all`

Expected request body:

```json
{"property": aGVsbG8sIHdvcmxkIQ==}
```

### Type_Property_Optional_Bytes_putDefault

- Endpoint: `put /type/property/optional/bytes/default`

Expected request body:

```json
{}
```

### Type_Property_Optional_Datetime_getAll

- Endpoint: `get /type/property/optional/datetime/all`

Expected response body:

```json
{"property": doc}
```

### Type_Property_Optional_Datetime_getDefault

- Endpoint: `get /type/property/optional/datetime/default`

Expected response body:

```json
{}
```

### Type_Property_Optional_Datetime_putAll

- Endpoint: `put /type/property/optional/datetime/all`

Expected request body:

```json
{"property": 2022-08-26T18:38:00Z}
```

### Type_Property_Optional_Datetime_putDefault

- Endpoint: `put /type/property/optional/datetime/default`

Expected request body:

```json
{}
```

### Type_Property_Optional_Duration_getAll

- Endpoint: `get /type/property/optional/duration/all`

Expected response body:

```json
{"property": doc}
```

### Type_Property_Optional_Duration_getDefault

- Endpoint: `get /type/property/optional/duration/default`

Expected response body:

```json
{}
```

### Type_Property_Optional_Duration_putAll

- Endpoint: `put /type/property/optional/duration/all`

Expected request body:

```json
{"property": P123DT22H14M12.011S}
```

### Type_Property_Optional_Duration_putDefault

- Endpoint: `put /type/property/optional/duration/default`

Expected request body:

```json
{}
```

### Type_Property_Optional_CollectionsByte_getAll

- Endpoint: `get /type/property/optional/collections/bytes/all`

Expected response body:

```json
{"property": doc}
```

### Type_Property_Optional_CollectionsByte_getDefault

- Endpoint: `get /type/property/optional/collections/bytes/default`

Expected response body:

```json
{}
```

### Type_Property_Optional_CollectionsByte_putAll

- Endpoint: `put /type/property/optional/collections/bytes/all`

Expected request body:

```json
{"property": [aGVsbG8sIHdvcmxkIQ==, aGVsbG8sIHdvcmxkIQ==]}
```

### Type_Property_Optional_CollectionsByte_putDefault

- Endpoint: `put /type/property/optional/collections/bytes/default`

Expected request body:

```json
{}
```

### Type_Property_Optional_CollectionsModel_getAll

- Endpoint: `get /type/property/optional/collections/model/all`

Expected response body:

```json
{"property": doc}
```

### Type_Property_Optional_CollectionsModel_getDefault

- Endpoint: `get /type/property/optional/collections/model/default`

Expected response body:

```json
{}
```

### Type_Property_Optional_CollectionsModel_putAll

- Endpoint: `put /type/property/optional/collections/model/all`

Expected request body:

```json
{ "property": [{ "property": "hello" }, { "property": "world" }] }
```

### Type_Property_Optional_CollectionsModel_putDefault

- Endpoint: `put /type/property/optional/collections/model/default`

Expected request body:

```json
{}
```

### Type_Property_Optional_RequiredAndOptional_getAll

- Endpoint: `get /type/property/optional/requiredAndOptional/all`

Expected response body:

```json
{ "optionalProperty": "hello", "requiredProperty": 42 }
```

### Type_Property_Optional_RequiredAndOptional_getRequiredOnly

- Endpoint: `get /type/property/optional/requiredAndOptional/requiredOnly`

Expected response body:

```json
{ "requiredProperty": 42 }
```

### Type_Property_Optional_RequiredAndOptional_putAll

- Endpoint: `put /type/property/optional/requiredAndOptional/all`

Expected request body:

```json
{ "optionalProperty": "hello", "requiredProperty": 42 }
```

### Type_Property_Optional_RequiredAndOptional_putRequiredOnly

- Endpoint: `put /type/property/optional/requiredAndOptional/requiredOnly`

Expected request body:

```json
{ "requiredProperty": 42 }
```

### Type_Property_ValueTypes_Boolean_get

- Endpoint: `get /type/property/value-types/boolean`

Expected response body:

```json
{ "property": true }
```

### Type_Property_ValueTypes_Boolean_put

- Endpoint: `put /type/property/value-types/boolean`

Expected input body:

```json
{ "property": true }
```

### Type_Property_ValueTypes_String_get

- Endpoint: `get /type/property/value-types/string`

Expected response body:

```json
{"property": hello}
```

### Type_Property_ValueTypes_String_put

- Endpoint: `put /type/property/value-types/string`

Expected input body:

```json
{"property": hello}
```

### Type_Property_ValueTypes_Bytes_get

- Endpoint: `get /type/property/value-types/bytes`

Expected response body:

```json
{"property": aGVsbG8sIHdvcmxkIQ==}
```

### Type_Property_ValueTypes_Bytes_put

- Endpoint: `put /type/property/value-types/bytes`

Expected input body:

```json
{"property": aGVsbG8sIHdvcmxkIQ==}
```

### Type_Property_ValueTypes_Int_get

- Endpoint: `get /type/property/value-types/int`

Expected response body:

```json
{ "property": 42 }
```

### Type_Property_ValueTypes_Int_put

- Endpoint: `put /type/property/value-types/int`

Expected input body:

```json
{ "property": 42 }
```

### Type_Property_ValueTypes_Float_get

- Endpoint: `get /type/property/value-types/float`

Expected response body:

```json
{ "property": 42.42 }
```

### Type_Property_ValueTypes_Float_put

- Endpoint: `put /type/property/value-types/float`

Expected input body:

```json
{ "property": 42.42 }
```

### Type_Property_ValueTypes_Datetime_get

- Endpoint: `get /type/property/value-types/datetime`

Expected response body:

```json
{"property": 2022-08-26T18:38:00Z}
```

### Type_Property_ValueTypes_Datetime_put

- Endpoint: `put /type/property/value-types/datetime`

Expected input body:

```json
{"property": 2022-08-26T18:38:00Z}
```

### Type_Property_ValueTypes_Duration_get

- Endpoint: `get /type/property/value-types/duration`

Expected response body:

```json
{"property": P123DT22H14M12.011S}
```

### Type_Property_ValueTypes_Duration_put

- Endpoint: `put /type/property/value-types/duration`

Expected input body:

```json
{"property": P123DT22H14M12.011S}
```

### Type_Property_ValueTypes_Enum_get

- Endpoint: `get /type/property/value-types/enum`

Expected response body:

```json
{"property": ValueOne}
```

### Type_Property_ValueTypes_Enum_put

- Endpoint: `put /type/property/value-types/enum`

Expected input body:

```json
{"property": ValueOne}
```

### Type_Property_ValueTypes_ExtensibleEnum_get

- Endpoint: `get /type/property/value-types/extensible-enum`

Expected response body:

```json
{"property": UnknownValue}
```

### Type_Property_ValueTypes_ExtensibleEnum_put

- Endpoint: `put /type/property/value-types/extensible-enum`

Expected input body:

```json
{"property": UnknownValue}
```

### Type_Property_ValueTypes_Model_get

- Endpoint: `get /type/property/value-types/model`

Expected response body:

```json
{ "property": { "property": "hello" } }
```

### Type_Property_ValueTypes_Model_put

- Endpoint: `put /type/property/value-types/model`

Expected input body:

```json
{ "property": { "property": "hello" } }
```

### Type_Property_ValueTypes_CollectionsString_get

- Endpoint: `get /type/property/value-types/collections/string`

Expected response body:

```json
{ "property": ["hello", "world"] }
```

### Type_Property_ValueTypes_CollectionsString_put

- Endpoint: `put /type/property/value-types/collections/string`

Expected input body:

```json
{ "property": ["hello", "world"] }
```

### Type_Property_ValueTypes_CollectionsInt_get

- Endpoint: `get /type/property/value-types/collections/int`

Expected response body:

```json
{ "property": [1, 2] }
```

### Type_Property_ValueTypes_CollectionsInt_put

- Endpoint: `put /type/property/value-types/collections/int`

Expected input body:

```json
{ "property": [1, 2] }
```

### Type_Property_ValueTypes_CollectionsModel_get

- Endpoint: `get /type/property/value-types/collections/model`

Expected response body:

```json
{ "property": [{ "property": "hello" }, { "property": "world" }] }
```

### Type_Property_ValueTypes_CollectionsModel_put

- Endpoint: `put /type/property/value-types/collections/model`

Expected input body:

```json
{ "property": [{ "property": "hello" }, { "property": "world" }] }
```

### Type_Property_ValueTypes_DictionaryString_get

- Endpoint: `get /type/property/value-types/dictionary/string`

Expected response body:

```json
{ "property": { "k1": "hello", "k2": "world" } }
```

### Type_Property_ValueTypes_DictionaryString_put

- Endpoint: `put /type/property/value-types/dictionary/string`

Expected input body:

```json
{ "property": { "k1": "hello", "k2": "world" } }
```

### Type_Property_ValueTypes_Never_get

- Endpoint: `get /type/property/value-types/never`

Expected response body:

```json
{"property": <don't include this property>}
```

### Type_Property_ValueTypes_Never_put

- Endpoint: `put /type/property/value-types/never`

Expected input body:

```json
{"property": <don't include this property>}
```

### Type_Union_sendInt

- Endpoint: `post /type/union/int`

This test is testing sending an int value in simple union property.

```json
{ "simpleUnion": 1 }
```

### Type_Union_sendIntArray

- Endpoint: `post /type/union/int-array`

This test is testing sending an int array value in simple union property.

```json
{ "simpleUnion": [1, 2] }
```

### Type_Union_sendFirstNamedUnionValue

- Endpoint: `post /type/union/model1`

This test is testing sending the first union value in named union property.

```json
{ "namedUnion": { "name": "model1", "prop1": 1 } }
```

### Type_Union_sendSecondNamedUnionValue

- Endpoint: `post /type/union/model2`

This test is testing sending the second union value in named union property.

```json
{ "namedUnion": { "name": "model2", "prop2": 2 } }
```
