# Cadl Ranch Project summary

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

### Authentication_ApiKey_valid

- Endpoint: `get /authentication/api-key/valid`

Expects header 'x-ms-api-key': 'valid-key'

### Authentication_Http_Custom_invalid

- Endpoint: `get /authentication/http/custom/invalid`

Expect error code 403 and error body:

```json
{
  "error": "invalid-api-key"
}
```

### Authentication_Http_Custom_valid

- Endpoint: `get /authentication/http/custom/valid`

Expects header 'Authorization': 'SharedAccessKey valid-key'

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

### Authentication_OAuth2_valid

- Endpoint: `get /authentication/oauth2/valid`

Expects header 'authorization': 'Bearer https://security.microsoft.com/.default'

### Authentication_Union_validKey

- Endpoint: `get /authentication/union/validkey`

Expects header 'x-ms-api-key': 'valid-key'

### Authentication_Union_validToken

- Endpoint: `get /authentication/union/validtoken`

Expects header 'authorization': 'Bearer https://security.microsoft.com/.default'

### Azure_ClientGenerator_Core_Internal_internalOnly

- Endpoint: `get /azure/client-generator-core/internal/internal`

This scenario contains an internal operation. It should be generated but not exposed.
Expected query parameter: name=<any string>
Expected response body:

```json
{
  "name": <any string>
}
```

### Azure_ClientGenerator_Core_Internal_publicOnly

- Endpoint: `get /azure/client-generator-core/internal/public`

This scenario contains a public operation. It should be generatated and exported.
Expected query parameter: name=<any string>
Expected response body:

```json
{
  "name": <any string>
}
```

### Azure_ClientGenerator_Core_Internal_Shared

- Endpoints:
  - `get /azure/client-generator-core/internal/shared/public`
  - `get /azure/client-generator-core/internal/shared/internal`

This scenario contains two operations, one public, another internal. The public one should be generatated and exported while the internal one should be generated but not exposed.
Expected query parameter: name=<any string>
Expected response body:

```json
{
  "name": <any string>
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

### Azure_Core_Basic_listWithCustomPageModel

- Endpoint: `get /azure/core/basic/custom-page`

Should ideally only generate models named User and UserOrder. If your language has to, you can also generate CustomPageModel

Expected query parameter: api-version=2022-12-01-preview

Expected response body:

````json
{
  "items":[
     {
        "id":1,
        "name":"Madge",
        "etag": "11bdc430-65e8-45ad-81d9-8ffa60d55b59"
     }
  ]
}

### Azure_Core_Basic_listWithPage

- Endpoint: `get /azure/core/basic/page`

Should only generate models named User and UserOrder.

Should not generate visible model like Page.

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

### Azure_Core_Lro_Rpc_Legacy_CreateResourcePollViaOperationLocation

- Endpoint: `post /azure/core/lro/rpc/legacy/create-resource-poll-via-operation-location/jobs`

POST to create resource.
Poll URL via operation-location header in response.
Poll response is the (InProgress) created resource. Poll ends when resource status property is Succeeded. Last poll response could be used for final result.

Expected verb: POST
Expected request body:
```json
{
  "comment": "async job"
}
````

Expected status code: 202
Expected response header: operation-location={endpoint}/create-resource-poll-via-operation-location/jobs/job1
No response body.

Expected verb: GET
Expected URL: {endpoint}/create-resource-poll-via-operation-location/jobs/job1

Expected status code: 200
Expected response body:

```json
{
  "jobId": "job1",
  "comment": "async job",
  "status": "running"
}
```

Expected verb: GET
Expected URL: {endpoint}/create-resource-poll-via-operation-location/jobs/job1

Expected status code: 200
Expected response body:

```json
{
  "jobId": "job1",
  "comment": "async job",
  "status": "succeeded",
  "results": ["job1 result"]
}
```

### Azure_Core_Lro_Rpc_longRunningRpc

- Endpoint: `post /azure/core/lro/rpc/generations:submit`

Should generate model GenerationOptions and GenerationResult.
GenerationResponse could be generated, depending on implementation.

Expected verb: POST
Expected request body:

```json
{
  "prompt": "text"
}
```

Expected status code: 202
Expected response header: operation-location={endpoint}/generations/operations/operation1
Expected response body:

```json
{
  "id": "operation1",
  "status": "InProgress"
}
```

Expected verb: GET
Expected URL: {endpoint}/generations/operations/operation1

Expected status code: 200
Expected response body:

```json
{
  "id": "operation1",
  "status": "InProgress"
}
```

Expected verb: GET
Expected URL: {endpoint}/generations/operations/operation1

Expected status code: 200
Expected response body:

```json
{
  "id": "operation1",
  "status": "Succeeded",
  "result": {
    "data": "text data"
  }
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

### Azure_Core_Traits_repeatableAction

- Endpoint: `get /azure/core/traits`

Expected path parameter: id=1
Expected header parameters:

- repeatability-request-id=<any uuid>
- repeatability-first-sent=<any HTTP header date>
  Expected request body:

```json
{
  "userActionValue": "test"
}
```

Expected response header:

- repeatability-result=accepted
  Expected response body:

```json
{
  "userActionResult": "test"
}
```

### Azure_Core_Traits_smokeTest

- Endpoint: `get /azure/core/traits`

SDK should not genreate `clientRequestId` paramerter but use policy to auto-set the header.
Expected path parameter: id=1
Expected query parameter: api-version=2022-12-01-preview
Expected header parameters:

- foo=123
- if-match=valid
- if-none-match=invalid
- if-unmodified-since=Fri, 26 Aug 2022 14:38:00 GMT
- if-modified-since=Thu, 26 Aug 2021 14:38:00 GMT
- x-ms-client-request-id=<any uuid string>

Expected response header:

- bar="456"
- x-ms-client-request-id=<uuid string same with request header>
- etag="11bdc430-65e8-45ad-81d9-8ffa60d55b59"

Expected response body:

```json
{
  "id": 1,
  "name": "Madge"
}
```

### Client_Structure_MultiClient

- Endpoints:
  - `post /client/structure/{client}/one`
  - `post /client/structure/{client}/three`
  - `post /client/structure/{client}/five`
  - `post /client/structure/{client}/two`
  - `post /client/structure/{client}/four`
  - `post /client/structure/{client}/six`

Include multiple clients in the same spec.

```ts
const clientA = new ClientAClient("multi-client");
const clientB = new ClientBClient("multi-client");

clientA.renamedOne();
clientA.renamedThree();
clientA.renamedFive();

clientB.renamedTwo();
clientB.renamedFour();
clientB.renamedSix();
```

### Client_Structure_RenamedOperation

- Endpoints:
  - `post /client/structure/{client}/two`
  - `post /client/structure/{client}/four`
  - `post /client/structure/{client}/six`
  - `post /client/structure/{client}/one`
  - `post /client/structure/{client}/three`
  - `post /client/structure/{client}/five`

This is to show we can have more than one operation group in a client. The client side should be able to call the api like

```ts
const client = new RenamedOperationClient("renamed-operation");

client.renamedOne();
client.renamedThree();
client.renamedFive();

client.group.renamedTwo();
client.group.renamedFour();
client.group.renamedSix();
```

### Client_Structure_Service

- Endpoints:
  - `post /client/structure/{client}/three`
  - `post /client/structure/{client}/four`
  - `post /client/structure/{client}/five`
  - `post /client/structure/{client}/six`
  - `post /client/structure/{client}/one`
  - `post /client/structure/{client}/two`

This is to show that if we don't do any customization. The client side should be able to call the api like

```ts
const client = new MultiClient("default");
client.one();
client.two();
client.three();
client.four();
client.five();
client.six();
```

### Client_Structure_TwoOperationGroup

- Endpoints:
  - `post /client/structure/{client}/one`
  - `post /client/structure/{client}/three`
  - `post /client/structure/{client}/four`
  - `post /client/structure/{client}/two`
  - `post /client/structure/{client}/five`
  - `post /client/structure/{client}/six`

This is to show we can have more than one operation group in a client. The client side should be able to call the api like

```ts
const client = new TwoOperationGroupClient("two-operation-group");

client.group1.one();
client.group1.three();
client.group1.four();

client.group2.two();
client.group2.five();
client.group2.six();
```

### Encode_Bytes_Header_base64

- Endpoint: `get /encode/bytes/header/base64`

Test base64 encode for bytes header.
Expected header:
value=dGVzdA== (base64 encode of test)

### Encode_Bytes_Header_base64url

- Endpoint: `get /encode/bytes/header/base64url`

Test base64url encode for bytes header.
Expected header:
value=dGVzdA (base64url encode of test)

### Encode_Bytes_Header_base64urlArray

- Endpoint: `get /encode/bytes/header/base64url-array`

Test base64url encode for bytes array header.
Expected header:
value=dGVzdA,dGVzdA

### Encode_Bytes_Header_default

- Endpoint: `get /encode/bytes/header/default`

Test default encode (base64) for bytes header.
Expected header:
value=dGVzdA== (base64 encode of test)

### Encode_Bytes_Property_base64

- Endpoint: `post /encode/bytes/property/base64`

Test operation with request and response model contains bytes properties with base64 encode.
Expected request body:

```json
{
  "value": "dGVzdA==" // base64 encode of test
}
```

Expected response body:

```json
{
  "value": "dGVzdA=="
}
```

### Encode_Bytes_Property_base64url

- Endpoint: `post /encode/bytes/property/base64url`

Test operation with request and response model contains bytes properties with base64url encode.
Expected request body:

```json
{
  "value": "dGVzdA" // base64url encode of test
}
```

Expected response body:

```json
{
  "value": "dGVzdA"
}
```

### Encode_Bytes_Property_base64urlArray

- Endpoint: `post /encode/bytes/property/base64url-array`

Test operation with request and response model contains bytes array properties with base64url encode.
Expected request body:

```json
{
  "value": ["dGVzdA", "dGVzdA"]
}
```

Expected response body:

```json
{
  "value": ["dGVzdA", "dGVzdA"]
}
```

### Encode_Bytes_Property_default

- Endpoint: `post /encode/bytes/property/default`

Test operation with request and response model contains bytes properties with default encode (base64).
Expected request body:

```json
{
  "value": "dGVzdA==" // base64 encode of test
}
```

Expected response body:

```json
{
  "value": "dGVzdA=="
}
```

### Encode_Bytes_Query_base64

- Endpoint: `get /encode/bytes/query/base64`

Test base64 encode for bytes query parameter.
Expected query parameter:
value=dGVzdA== (base64 encode of test)

### Encode_Bytes_Query_base64url

- Endpoint: `get /encode/bytes/query/base64url`

Test base64url encode for bytes query parameter.
Expected query parameter:
value=dGVzdA (base64url encode of test)

### Encode_Bytes_Query_base64urlArray

- Endpoint: `get /encode/bytes/query/base64url-array`

Test base64url encode for bytes array query parameter.
Expected query parameter:
value=dGVzdA, dGVzdA

### Encode_Bytes_Query_default

- Endpoint: `get /encode/bytes/query/default`

Test default encode (base64) for bytes query parameter.
Expected query parameter:
value=dGVzdA== (base64 encode of test)

### Encode_Datetime_Header_default

- Endpoint: `get /encode/datetime/header/default`

Test default encode (rfc7231) for datetime header.
Expected header:
value=Fri, 26 Aug 2022 14:38:00 GMT

### Encode_Datetime_Header_rfc3339

- Endpoint: `get /encode/datetime/header/rfc3339`

Test rfc3339 encode for datetime header.
Expected header:
value=2022-08-26T18:38:00.000Z

### Encode_Datetime_Header_rfc7231

- Endpoint: `get /encode/datetime/header/rfc7231`

Test rfc7231 encode for datetime header.
Expected header:
value=Fri, 26 Aug 2022 14:38:00 GMT

### Encode_Datetime_Header_unixTimestamp

- Endpoint: `get /encode/datetime/header/unix-timestamp`

Test unixTimestamp encode for datetime header.
Expected header:
value=1686566864

### Encode_Datetime_Header_unixTimestampArray

- Endpoint: `get /encode/datetime/header/unix-timestamp-array`

Test unixTimestamp encode for datetime array header.
Expected header:
value=1686566864,1686734256

### Encode_Datetime_Property_default

- Endpoint: `post /encode/datetime/property/default`

Test operation with request and response model contains datetime property with default encode (rfc3339).
Expected request body:

```json
{
  "value": "2022-08-26T18:38:00.000Z"
}
```

Expected response body:

```json
{
  "value": "2022-08-26T18:38:00.000Z"
}
```

### Encode_Datetime_Property_rfc3339

- Endpoint: `post /encode/datetime/property/rfc3339`

Test operation with request and response model contains datetime property with rfc3339 encode.
Expected request body:

```json
{
  "value": "2022-08-26T18:38:00.000Z"
}
```

Expected response body:

```json
{
  "value": "2022-08-26T18:38:00.000Z"
}
```

### Encode_Datetime_Property_rfc7231

- Endpoint: `post /encode/datetime/property/rfc7231`

Test operation with request and response model contains datetime property with rfc7231 encode.
Expected request body:

```json
{
  "value": "Fri, 26 Aug 2022 14:38:00 GMT"
}
```

Expected response body:

```json
{
  "value": "Fri, 26 Aug 2022 14:38:00 GMT"
}
```

### Encode_Datetime_Property_unixTimestamp

- Endpoint: `post /encode/datetime/property/unix-timestamp`

Test operation with request and response model contains datetime property with unixTimestamp encode.
Expected request body:

```json
{
  "value": 1686566864
}
```

Expected response body:

```json
{
  "value": 1686566864
}
```

### Encode_Datetime_Property_unixTimestampArray

- Endpoint: `post /encode/datetime/property/unix-timestamp-array`

Test operation with request and response model contains datetime array property with unixTimestamp encode.
Expected request body:f

```json
{
  "value": [1686566864, 1686734256]
}
```

Expected response body:

```json
{
  "value": [1686566864, 1686734256]
}
```

### Encode_Datetime_Query_default

- Endpoint: `get /encode/datetime/query/default`

Test default encode (rfc3339) for datetime query parameter.
Expected query parameter:
value=2022-08-26T18:38:00.000Z

### Encode_Datetime_Query_rfc3339

- Endpoint: `get /encode/datetime/query/rfc3339`

Test rfc3339 encode for datetime query parameter.
Expected query parameter:
value=2022-08-26T18:38:00.000Z

### Encode_Datetime_Query_rfc7231

- Endpoint: `get /encode/datetime/query/rfc7231`

Test rfc7231 encode for datetime query parameter.
Expected query parameter:
value=Fri, 26 Aug 2022 14:38:00 GMT

### Encode_Datetime_Query_unixTimestamp

- Endpoint: `get /encode/datetime/query/unix-timestamp`

Test unixTimestamp encode for datetime query parameter.
Expected query parameter:
value=1686566864

### Encode_Datetime_Query_unixTimestampArray

- Endpoint: `get /encode/datetime/query/unix-timestamp-array`

Test unixTimestamp encode for datetime array query parameter.
Expected query parameter:
value=1686566864, 1686734256

### Encode_Duration_Header_default

- Endpoint: `get /encode/duration/header/default`

Test default encode for a duration header.
Expected header `input=P40D`

### Encode_Duration_Header_floatSeconds

- Endpoint: `get /encode/duration/header/float-seconds`

Test float seconds encode for a duration header.
Expected header `duration: 35.621`

### Encode_Duration_Header_int32Seconds

- Endpoint: `get /encode/duration/header/int32-seconds`

Test int32 seconds encode for a duration header.
Expected header `duration: 36`

### Encode_Duration_Header_iso8601

- Endpoint: `get /encode/duration/header/iso8601`

Test iso8601 encode for a duration header.
Expected header `duration: P40D`

### Encode_Duration_Header_iso8601Array

- Endpoint: `get /encode/duration/header/iso8601-array`

Test iso8601 encode for a duration array header.
Expected header `duration: [P40D,P50D]`

### Encode_Duration_Property_default

- Endpoint: `post /encode/duration/property/default`

Test operation with request and response model contains a duration property with default encode.
Expected request body:

```json
{
  "value": "P40D"
}
```

Expected response body:

```json
{
  "value": "P40D"
}
```

### Encode_Duration_Property_floatSeconds

- Endpoint: `get /encode/duration/property/float-seconds`

Test operation with request and response model contains a duration property with float seconds encode.
Expected request body:

```json
{
  "value": 35.621
}
```

Expected response body:

```json
{
  "value": 35.621
}
```

### Encode_Duration_Property_floatSecondsArray

- Endpoint: `get /encode/duration/property/float-seconds-array`

Test operation with request and response model contains an array property which elements are duration with float seconds encode.
Expected request body:

```json
{
  "value": [35.621, 46.781]
}
```

Expected response body:

```json
{
  "value": [35.621, 46.781]
}
```

### Encode_Duration_Property_int32Seconds

- Endpoint: `get /encode/duration/property/int32-seconds`

Test operation with request and response model contains a duration property with int32 seconds encode.
Expected request body:

```json
{
  "value": 36
}
```

Expected response body:

```json
{
  "value": 36
}
```

### Encode_Duration_Property_iso8601

- Endpoint: `post /encode/duration/property/iso8601`

Test operation with request and response model contains a duration property with iso8601 encode.
Expected request body:

```json
{
  "value": "P40D"
}
```

Expected response body:

```json
{
  "value": "P40D"
}
```

### Encode_Duration_Query_default

- Endpoint: `get /encode/duration/query/default`

Test default encode for a duration parameter.
Expected query parameter `input=P40D`

### Encode_Duration_Query_floatSeconds

- Endpoint: `get /encode/duration/query/float-seconds`

Test float seconds encode for a duration parameter.
Expected query parameter `input=35.621`

### Encode_Duration_Query_int32Seconds

- Endpoint: `get /encode/duration/query/int32-seconds`

Test int32 seconds encode for a duration parameter.
Expected query parameter `input=36`

### Encode_Duration_Query_int32SecondsArray

- Endpoint: `get /encode/duration/query/int32-seconds-array`

Test int32 seconds encode for a duration array parameter.
Expected query parameter `input=36,47`

### Encode_Duration_Query_iso8601

- Endpoint: `get /encode/duration/query/iso8601`

Test iso8601 encode for a duration parameter.
Expected query parameter `input=P40D`

### Parameters_BodyOptionality_OptionalExplicit

- Endpoints:
  - `post /parameters/body-optionality/optional-explicit/set`
  - `post /parameters/body-optionality/optional-explicit/omit`

Scenario defining how an explicit optional body parameter is specified.

Expected request body for `set`

```json
{ "name": "foo" }
```

Expected no request body for `omit`

### Parameters_BodyOptionality_requiredExplicit

- Endpoint: `post /parameters/body-optionality/required-explicit`

Scenario defining how an explicit required body parameter is specified.

Expected request body:

```json
{ "name": "foo" }
```

### Parameters_BodyOptionality_requiredImplicit

- Endpoint: `post /parameters/body-optionality/required-implicit`

Scenario defining how an implicit required body parameter is specified.

Expected request body:

```json
{ "name": "foo" }
```

### Parameters_CollectionFormat_Header_csv

- Endpoint: `get /parameters/collection-format/header/csv`

This test is testing sending a csv collection format array header parameters

### Parameters_CollectionFormat_Query_csv

- Endpoint: `get /parameters/collection-format/query/csv`

This test is testing sending a csv collection format array query parameters

### Parameters_CollectionFormat_Query_multi

- Endpoint: `get /parameters/collection-format/query/multi`

This test is testing sending a multi collection format array query parameters

### Parameters_CollectionFormat_Query_pipes

- Endpoint: `get /parameters/collection-format/query/pipes`

This test is testing sending a pipes collection format array query parameters

### Parameters_CollectionFormat_Query_ssv

- Endpoint: `get /parameters/collection-format/query/ssv`

This test is testing sending a ssv collection format array query parameters

### Parameters_CollectionFormat_Query_tsv

- Endpoint: `get /parameters/collection-format/query/tsv`

This test is testing sending a tsv collection format array query parameters

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

### Payload_ContentNegotiation_DifferentBody

- Endpoints:
  - `get /content-negotiation/different-body`
  - `get /content-negotiation/different-body`

Scenario that a different payload depending on the accept header.

- application/json return a png image in a Json object
- image/png return the png image

### Payload_ContentNegotiation_SameBody

- Endpoints:
  - `get /content-negotiation/same-body`
  - `get /content-negotiation/same-body`

Scenario that returns a different file encoding depending on the accept header.

- image/png return a png image
- image/jpeg return a jpeg image

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

### Projection_ProjectedName_Property_client

- Endpoint: `post /projection/projected-name/property/client`

Testing that we can project the client name in our generated SDKs.
Your generated SDK should generate ClientProjectedNameModel with one property `clientName` with wire name `defaultName`.

Expected request body:

```json
{ "defaultName": true }
```

### Projection_ProjectedName_Property_json

- Endpoint: `post /projection/projected-name/property/json`

Testing that we can project the JSON name on the wire from defaultName -> wireName.
Your generated SDK should generate JsonProjectedNameModel with one property `defaultName` with wire name `wireName`.

Expected request body:

```json
{ "wireName": true }
```

### Projection_ProjectedName_Property_jsonAndClient

- Endpoint: `post /projection/projected-name/property/json-and-client`

Testing that we can project the client name and the wire name.
Your generated SDK should generate JsonAndClientProjectedNameModel with one property with client name `clientName` and wire name `wireName`.

Expected request body:

```json
{ "wireName": true }
```

### Projection_ProjectedName_Property_language

- Endpoint: `post /projection/projected-name/property/language`

Testing that we can project the language specific name in our generated SDKs.
Your generated SDK should generate ClientProjectedNameModel with one property with your language specific property name and wire name `defaultName`.

Expected request body:

```json
{ "defaultName": true }
```

### Resiliency_ServiceDriven_addOperation

- Endpoint: `delete /resiliency/service-driven/client:v2/service:{serviceDeploymentVersion}/api-version:{apiVersion}/add-operation`

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

### Resiliency_ServiceDriven_AddOptionalParam_fromNone

- Endpoint: `head /resiliency/service-driven/client:v2/service:{serviceDeploymentVersion}/api-version:{apiVersion}/add-optional-param/from-none`

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

### Resiliency_ServiceDriven_AddOptionalParam_fromOneOptional

- Endpoint: `get /resiliency/service-driven/client:v2/service:{serviceDeploymentVersion}/api-version:{apiVersion}/add-optional-param/from-one-optional`

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

### Resiliency_ServiceDriven_AddOptionalParam_fromOneRequired

- Endpoint: `get /resiliency/service-driven/client:v2/service:{serviceDeploymentVersion}/api-version:{apiVersion}/add-optional-param/from-one-required`

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

### Server_Path_Multiple_noOperationParams

- Endpoint: `get /server/path/multiple/{apiVersion}`

Operation with client path parameters.

Expected path parameter: apiVersion=v1.0

### Server_Path_Multiple_withOperationPathParam

- Endpoint: `get /server/path/multiple/{apiVersion}`

Operation with client and method path parameters.

Expected path parameter: apiVersion=v1.0, keyword=test

### Server_Path_Single_myOp

- Endpoint: `head /server/path/single/myOp`

An simple operation in a parameterized server.

### SpecialHeaders_ClientRequestId

- Endpoint: `get /special-headers/client-request-id/`

Test case for azure client request id header. SDK should not genreate `clientRequestId` paramerter but use policy to auto-set the header.
Expected header parameters:

- client-request-id=<any uuid string>
  Expected response header:
- client-request-id=<uuid string same with request header>

### SpecialHeaders_Repeatability_immediateSuccess

- Endpoint: `post /special-headers/repeatability/immediateSuccess`

Check we recognize Repeatability-Request-ID and Repeatability-First-Sent.

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

### SpecialWords_Operation_for

- Endpoint: `get /special-words/operation/for`

A operation name of `for` should work.

### SpecialWords_Parameter_getWithFilter

- Endpoint: `get /special-words/parameter/filter`

Expect input parameter `filter='abc*.'`

### SpecialWords_Parameter_getWithIf

- Endpoint: `get /special-words/parameter/if`

Expect input parameter `if='weekend'`

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

### Type_Model_Empty_getEmpty

- Endpoint: `get /type/model/empty/alone`

Send a GET request which returns the following body {}

### Type_Model_Empty_postRoundTripEmpty

- Endpoint: `post /type/model/empty/round-trip`

Send a POST request with the following body {} which returns the same.

### Type_Model_Empty_putEmpty

- Endpoint: `put /type/model/empty/alone`

Send a PUT request with the following body {}

### Type_Model_Inheritance_EnumDiscriminator_getExtensibleModel

- Endpoint: `get /type/model/inheritance/enum-discriminator/extensible-enum`

Receive model with extensible enum discriminator type.
Expected response body:

```json
{ "kind": "golden", "weight": 10 }
```

### Type_Model_Inheritance_EnumDiscriminator_getExtensibleModelMissingDiscriminator

- Endpoint: `get /type/model/inheritance/enum-discriminator/extensible-enum/missingdiscriminator`

Get a model omitting the discriminator.
Expected response body:

```json
{ "weight": 10 }
```

### Type_Model_Inheritance_EnumDiscriminator_getExtensibleModelWrongDiscriminator

- Endpoint: `get /type/model/inheritance/enum-discriminator/extensible-enum/wrongdiscriminator`

Get a model containing discriminator value never defined.
Expected response body:

```json
{ "weight": 8, "kind": "wrongKind" }
```

### Type_Model_Inheritance_EnumDiscriminator_getFixedModel

- Endpoint: `get /type/model/inheritance/enum-discriminator/fixed-enum`

Receive model with fixed enum discriminator type.
Expected response body:

```json
{ "kind": "cobra", "length": 10 }
```

### Type_Model_Inheritance_EnumDiscriminator_getFixedModelMissingDiscriminator

- Endpoint: `get /type/model/inheritance/enum-discriminator/fixed-enum/missingdiscriminator`

Get a model omitting the discriminator.
Expected response body:

```json
{ "length": 10 }
```

### Type_Model_Inheritance_EnumDiscriminator_getFixedModelWrongDiscriminator

- Endpoint: `get /type/model/inheritance/enum-discriminator/fixed-enum/wrongdiscriminator`

Get a model containing discriminator value never defined.
Expected response body:

```json
{ "length": 8, "kind": "wrongKind" }
```

### Type_Model_Inheritance_EnumDiscriminator_putExtensibleModel

- Endpoint: `put /type/model/inheritance/enum-discriminator/extensible-enum`

Send model with extensible enum discriminator type.
Expected request body:

```json
{ "kind": "golden", "weight": 10 }
```

### Type_Model_Inheritance_EnumDiscriminator_putFixedModel

- Endpoint: `put /type/model/inheritance/enum-discriminator/fixed-enum`

Send model with fixed enum discriminator type.
Expected request body:

```json
{ "kind": "cobra", "length": 10 }
```

### Type_Model_Inheritance_NestedDiscriminator_getMissingDiscriminator

- Endpoint: `get /type/model/inheritance/nested-discriminator/missingdiscriminator`

Get a model omitting the discriminator.
Expected response body:

```json
{ "age": 1 }
```

### Type_Model_Inheritance_NestedDiscriminator_getModel

- Endpoint: `get /type/model/inheritance/nested-discriminator/model`

Generate and receive polymorphic model in multiple levels inheritance with 2 discriminators.
Expected response body:

```json
{ "age": 1, "kind": "shark", "sharktype": "goblin" }
```

### Type_Model_Inheritance_NestedDiscriminator_getRecursiveModel

- Endpoint: `get /type/model/inheritance/nested-discriminator/recursivemodel`

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

### Type_Model_Inheritance_NestedDiscriminator_getWrongDiscriminator

- Endpoint: `get /type/model/inheritance/nested-discriminator/wrongdiscriminator`

Get a model containing discriminator value never defined.
Expected response body:

```json
{ "age": 1, "kind": "wrongKind" }
```

### Type_Model_Inheritance_NestedDiscriminator_putModel

- Endpoint: `put /type/model/inheritance/nested-discriminator/model`

Generate and send polymorphic model in multiple levels inheritance with 2 discriminators.
Expected input body:

```json
{ "age": 1, "kind": "shark", "sharktype": "goblin" }
```

### Type_Model_Inheritance_NestedDiscriminator_putRecursiveModel

- Endpoint: `put /type/model/inheritance/nested-discriminator/recursivemodel`

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

### Type_Model_Inheritance_NotDiscriminated_getValid

- Endpoint: `get /type/model/inheritance/not-discriminated/valid`

Generate and receive model.
Expected response body:

```json
{ "name": "abc", "age": 32, "smart": true }
```

### Type_Model_Inheritance_NotDiscriminated_postValid

- Endpoint: `post /type/model/inheritance/not-discriminated/valid`

Generate and send model.
Expected input body:

```json
{ "name": "abc", "age": 32, "smart": true }
```

### Type_Model_Inheritance_NotDiscriminated_putValid

- Endpoint: `put /type/model/inheritance/not-discriminated/valid`

Generate, send, and receive round-trip bottom model.

### Type_Model_Inheritance_SingleDiscriminator_getLegacyModel

- Endpoint: `get /type/model/inheritance/single-discriminator/legacy-model`

Generate and receive polymorphic model defined in legacy way.
Expected response body:

```json
{ "size": 20, "kind": "t-rex" }
```

### Type_Model_Inheritance_SingleDiscriminator_getMissingDiscriminator

- Endpoint: `get /type/model/inheritance/single-discriminator/missingdiscriminator`

Get a model omitting the discriminator.
Expected response body:

```json
{ "wingspan": 1 }
```

### Type_Model_Inheritance_SingleDiscriminator_getModel

- Endpoint: `get /type/model/inheritance/single-discriminator/model`

Generate and receive polymorphic model in single level inheritance with 1 discriminator.
Expected response body:

```json
{ "wingspan": 1, "kind": "sparrow" }
```

### Type_Model_Inheritance_SingleDiscriminator_getRecursiveModel

- Endpoint: `get /type/model/inheritance/single-discriminator/recursivemodel`

Generate and receive polymorphic models has collection and dictionary properties referring to other polymorphic models.
Expected response body:

```json
{
  "wingspan": 5,
  "kind": "eagle",
  "partner": {
    "wingspan": 2,
    "kind": "goose"
  },
  "friends": [
    {
      "wingspan": 2,
      "kind": "seagull"
    }
  ],
  "hate": {
    "key3": {
      "wingspan": 1,
      "kind": "sparrow"
    }
  }
}
```

### Type_Model_Inheritance_SingleDiscriminator_getWrongDiscriminator

- Endpoint: `get /type/model/inheritance/single-discriminator/wrongdiscriminator`

Get a model containing discriminator value never defined.
Expected response body:

```json
{ "wingspan": 1, "kind": "wrongKind" }
```

### Type_Model_Inheritance_SingleDiscriminator_putModel

- Endpoint: `put /type/model/inheritance/single-discriminator/model`

Generate and send polymorphic model in single level inheritance with 1 discriminator.
Expected input body:

```json
{ "wingspan": 1, "kind": "sparrow" }
```

### Type_Model_Inheritance_SingleDiscriminator_putRecursiveModel

- Endpoint: `put /type/model/inheritance/single-discriminator/recursivemodel`

Generate and send polymorphic models has collection and dictionary properties referring to other polymorphic models.
Expected input body:

```json
{
  "wingspan": 5,
  "kind": "eagle",
  "partner": {
    "wingspan": 2,
    "kind": "goose"
  },
  "friends": [
    {
      "wingspan": 2,
      "kind": "seagull"
    }
  ],
  "hate": {
    "key3": {
      "wingspan": 1,
      "kind": "sparrow"
    }
  }
}
```

### Type_Model_Usage_input

- Endpoint: `get /type/model/usage/input`

Send a POST request with the following body {requiredProp: "example-value"}

### Type_Model_Usage_inputAndOutput

- Endpoint: `get /type/model/usage/input-output`

Send a POST request which return the following body {requiredProp: "example-value"} and return the same.

### Type_Model_Usage_output

- Endpoint: `get /type/model/usage/output`

Send a GET request which return the following body {requiredProp: "example-value"}

### Type_Model_Visibility_deleteModel

- Endpoint: `delete /type/model/visibility`

Generate abd send put model with write/create properties.
Expected input body:

```json
{
  "deleteProp": true
}
```

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

### Type_Primitive_Boolean_getBooleanValue

- Endpoint: `get /type/primitive/boolean`

Expect to handle a boolean value. Mock api will return true

### Type_Primitive_Boolean_putBooleanValue

- Endpoint: `put /type/primitive/boolean`

Expect to send a boolean value. Mock api expect to receive 'true'

### Type_Primitive_String_getStringValue

- Endpoint: `get /type/primitive/string`

Expect to handle a string value. Mock api will return 'ok'

### Type_Primitive_String_putStringValue

- Endpoint: `put /type/primitive/string`

Expect to send a string value. Mock api expect to receive 'test'

### Type_Primitive_Unknown_getUnknownValue

- Endpoint: `get /type/primitive/unknown`

Expect to handle a unknown type value. Mock api will return 'test'

### Type_Primitive_Unknown_putUnknownValue

- Endpoint: `put /type/primitive/unknown`

Expect to send a string value. Mock api expect to receive 'test'

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

### Type_Property_ValueTypes_UnknownArray_get

- Endpoint: `get /type/property/value-types/unknown/array`

Expected response body:

```json
{ "property": ["hello", "world"] }
```

### Type_Property_ValueTypes_UnknownArray_put

- Endpoint: `put /type/property/value-types/unknown/array`

Expected input body:

```json
{ "property": ["hello", "world"] }
```

### Type_Property_ValueTypes_UnknownDict_get

- Endpoint: `get /type/property/value-types/unknown/dict`

Expected response body:

```json
{ "property": { "k1": "hello", "k2": 42 } }
```

### Type_Property_ValueTypes_UnknownDict_put

- Endpoint: `put /type/property/value-types/unknown/dict`

Expected input body:

```json
{ "property": { "k1": "hello", "k2": 42 } }
```

### Type_Property_ValueTypes_UnknownInt_get

- Endpoint: `get /type/property/value-types/unknown/int`

Expected response body:

```json
{ "property": 42 }
```

### Type_Property_ValueTypes_UnknownInt_put

- Endpoint: `put /type/property/value-types/unknown/int`

Expected input body:

```json
{ "property": 42 }
```

### Type_Property_ValueTypes_UnknownString_get

- Endpoint: `get /type/property/value-types/unknown/string`

Expected response body:

```json
{ "property": "hello" }
```

### Type_Property_ValueTypes_UnknownString_put

- Endpoint: `put /type/property/value-types/unknown/string`

Expected input body:

```json
{ "property": "hello" }
```

### Type_Union_sendFirstNamedUnionValue

- Endpoint: `post /type/union/model1`

This test is testing sending the first union value in named union property.

```json
{ "namedUnion": { "name": "model1", "prop1": 1 } }
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

### Type_Union_sendSecondNamedUnionValue

- Endpoint: `post /type/union/model2`

This test is testing sending the second union value in named union property.

```json
{ "namedUnion": { "name": "model2", "prop2": 2 } }
```
