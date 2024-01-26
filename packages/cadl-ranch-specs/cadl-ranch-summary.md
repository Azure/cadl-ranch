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

### Azure_ClientGenerator_Core_Access_InternalOperation

- Endpoints:
  - `get /azure/client-generator-core/access/internalOperation/noDecoratorInInternal`
  - `get /azure/client-generator-core/access/internalOperation/internalDecoratorInInternal`
  - `get /azure/client-generator-core/access/internalOperation/publicDecoratorInInternal`

This scenario contains internal operations. All should be generated but not exposed.
Expected query parameter: name=<any string>
Expected response body:

```json
{
  "name": <any string>
}
```

### Azure_ClientGenerator_Core_Access_PublicOperation

- Endpoints:
  - `get /azure/client-generator-core/access/publicOperation/noDecoratorInPublic`
  - `get /azure/client-generator-core/access/publicOperation/publicDecoratorInPublic`

This scenario contains public operations. It should be generated and exported.
Expected query parameter: name=<any string>
Expected response body:

```json
{
  "name": <any string>
}
```

### Azure_ClientGenerator_Core_Access_RelativeModelInOperation

- Endpoints:
  - `get /azure/client-generator-core/access/relativeModelInOperation/operation`
  - `get /azure/client-generator-core/access/relativeModelInOperation/discriminator`

This scenario contains internal operations. All should be generated but not exposed.

### Azure_ClientGenerator_Core_Access_SharedModelInOperation

- Endpoints:
  - `get /azure/client-generator-core/access/sharedModelInOperation/public`
  - `get /azure/client-generator-core/access/sharedModelInOperation/internal`

This scenario contains two operations, one public, another internal. The public one should be generated and exported while the internal one should be generated but not exposed.
Expected query parameter: name=<any string>
Expected response body:

```json
{
  "name": <any string>
}
```

### Azure_ClientGenerator_Core_Usage_ModelInOperation

- Endpoints:
  - `post /azure/client-generator-core/usage/inputToInputOutput`
  - `post /azure/client-generator-core/usage/outputToInputOutput`

This scenario contains two public operations. Both should be generated and exported.
The models are override to roundtrip, so they should be generated and exported as well.

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

### Azure_Core_Basic_listWithParameters

- Endpoint: `get /azure/core/basic/parameters`

Expected query parameter: api-version=2022-12-01-preview&another=Second

Expected body parameter: {"inputName": "Madge"}

Expected response body:
```json
{
  "value":[
     {
        "id": 1,
        "name": "Madge",
        "etag": "11bdc430-65e8-45ad-81d9-8ffa60d55b59"
     }
  ]
}

### Azure_Core_Basic_TwoModelsAsPageItem

- Endpoints:
  - `get /azure/core/basic/first-item`
  - `get /azure/core/basic/second-item`

This scenario is to test two operations with two different page item types.

### Azure_Core_Lro_Rpc_Legacy_CreateResourcePollViaOperationLocation

- Endpoints:
  - `get /azure/core/lro/rpc/legacy/create-resource-poll-via-operation-location`
  - `get /azure/core/lro/rpc/legacy/create-resource-poll-via-operation-location/jobs`

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
  - `post /client/structure/{client}/seven`
  - `post /client/structure/{client}/nine`
  - `post /client/structure/{client}/eight`
  - `post /client/structure/{client}/three`
  - `post /client/structure/{client}/four`
  - `post /client/structure/{client}/five`
  - `post /client/structure/{client}/six`
  - `post /client/structure/{client}/one`
  - `post /client/structure/{client}/two`

This is to show that if we don't do any customization. The client side should be able to call the api like

```ts
const client = new ServiceClient("default");
client.one();
client.two();
client.foo.three();
client.foo.four();
client.bar.five();
client.bar.six();
client.baz.foo.seven();
client.qux.eight();
client.qux.bar.nine();
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

### Encode_Bytes_RequestBody_base64

- Endpoint: `post /encode/bytes/body/request/base64`

Test base64 encode for bytes body.
Expected body:
"dGVzdA==" (base64 encode of test, in JSON string)

### Encode_Bytes_RequestBody_base64url

- Endpoint: `post /encode/bytes/body/request/base64url`

Test base64url encode for bytes body.
Expected body:
"dGVzdA" (base64url encode of test, in JSON string)

### Encode_Bytes_RequestBody_customContentType

- Endpoint: `post /encode/bytes/body/request/custom-content-type`

When content type is a custom type(image/png here) and body is `bytes` the payload is a binary file.
File should match packages/cadl-ranch-specs/assets/image.png

### Encode_Bytes_RequestBody_default

- Endpoint: `post /encode/bytes/body/request/default`

Test default encode (base64) for bytes in a json body.
Expected body:
"dGVzdA==" (base64 encode of test, in JSON string)

### Encode_Bytes_RequestBody_octetStream

- Endpoint: `post /encode/bytes/body/request/octet-stream`

When content type is application/octet-stream and body is `bytes` the payload is a binary file.
File should match packages/cadl-ranch-specs/assets/image.png

### Encode_Bytes_ResponseBody_base64

- Endpoint: `get /encode/bytes/body/response/base64`

Test base64 encode for bytes body.
Expected body:
"dGVzdA==" (base64 encode of test, in JSON string)

### Encode_Bytes_ResponseBody_base64url

- Endpoint: `get /encode/bytes/body/response/base64url`

Test base64url encode for bytes body.
Expected body:
"dGVzdA" (base64url encode of test, in JSON string)

### Encode_Bytes_ResponseBody_customContentType

- Endpoint: `get /encode/bytes/body/response/custom-content-type`

When content type is a custom type(image/png here) and body is `bytes` the payload is a binary file.
File should match packages/cadl-ranch-specs/assets/image.png

### Encode_Bytes_ResponseBody_default

- Endpoint: `get /encode/bytes/body/response/default`

Test default encode (base64) for bytes in a json body.
Expected body:
"dGVzdA==" (base64 encode of test, in JSON string)

### Encode_Bytes_ResponseBody_octetStream

- Endpoint: `get /encode/bytes/body/response/octet-stream`

When content type is application/octet-stream and body is `bytes` the payload is a binary file.
File should match packages/cadl-ranch-specs/assets/image.png

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

### Encode_Datetime_ResponseHeader_default

- Endpoint: `get /encode/datetime/responseheader/default`

Test default encode (rfc7231) for datetime header.
Expected response header:
value=Fri, 26 Aug 2022 14:38:00 GMT

### Encode_Datetime_ResponseHeader_rfc3339

- Endpoint: `get /encode/datetime/responseheader/rfc3339`

Test rfc3339 encode for datetime header.
Expected response header:
value=2022-08-26T18:38:00.000Z

### Encode_Datetime_ResponseHeader_rfc7231

- Endpoint: `get /encode/datetime/responseheader/rfc7231`

Test rfc7231 encode for datetime header.
Expected response header:
value=Fri, 26 Aug 2022 14:38:00 GMT

### Encode_Datetime_ResponseHeader_unixTimestamp

- Endpoint: `get /encode/datetime/responseheader/unix-timestamp`

Test unixTimestamp encode for datetime header.
Expected response header:
value=1686566864

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

### Payload_MediaType_StringBody_getAsJson

- Endpoint: `get /payload/media-type/string-body/getAsJson`

Expected response body is "foo".

### Payload_MediaType_StringBody_getAsText

- Endpoint: `get /payload/media-type/string-body/getAsText`

Expected response body is a string '{cat}'.

### Payload_MediaType_StringBody_sendAsJson

- Endpoint: `post /payload/media-type/string-body/sendAsJson`

Expected request body is "foo".

### Payload_MediaType_StringBody_sendAsText

- Endpoint: `post /payload/media-type/string-body/sendAsText`

Expected request body is a string '{cat}'.

### Payload_MultiPart_FormData_basic

- Endpoint: `post /multipart/form-data/mixed-parts`

Expect request (

- according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.4, content-type of file part shall be labeled with
  appropriate media type, cadl-ranch will check it; content-type of other parts is optional, cadl-ranch will ignore it.
- according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.2, filename of file part SHOULD be supplied.
  If there are duplicated filename in same filedName, cadl-ranch can't parse them all.
  ):

```
POST /upload HTTP/1.1
Content-Length: 428
Content-Type: multipart/form-data; boundary=abcde12345

--abcde12345
Content-Disposition: form-data; name="id"
Content-Type: text/plain

123
--abcde12345
Content-Disposition: form-data; name="profileImage"; filename="<any-name-is-ok>"
Content-Type: application/octet-stream;

{…file content…}
--abcde12345--
```

### Payload_MultiPart_FormData_binaryArrayParts

- Endpoint: `post /multipart/form-data/binary-array-parts`

Expect request (

- according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.4, content-type of file part shall be labeled with
  appropriate media type, cadl-ranch will check it; content-type of other parts is optional, cadl-ranch will ignore it.
- according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.2, filename of file part SHOULD be supplied.
  If there are duplicated filename in same filedName, cadl-ranch can't parse them all.
  ):

```
POST /upload HTTP/1.1
Content-Length: 428
Content-Type: multipart/form-data; boundary=abcde12345

--abcde12345
Content-Disposition: form-data; name="id"
Content-Type: text/plain

123
--abcde12345
Content-Disposition: form-data; name="pictures"; filename="<any-name-is-ok>"
Content-Type: application/octet-stream

{…file content…}
--abcde12345
Content-Disposition: form-data; name="pictures"; filename="<any-name-is-ok>"
Content-Type: application/octet-stream

{…file content…}
--abcde12345--
```

### Payload_MultiPart_FormData_checkFileNameAndContentType

- Endpoint: `post /multipart/form-data/check-filename-and-content-type`

this case will check filename and content-type of file part, so expect request:

```
POST /upload HTTP/1.1
Content-Length: 428
Content-Type: multipart/form-data; boundary=abcde12345

--abcde12345
Content-Disposition: form-data; name="id"
Content-Type: text/plain

123
--abcde12345
Content-Disposition: form-data; name="profileImage"; filename="hello.jpg"
Content-Type: image/jpg

{…file content…}
--abcde12345--
```

### Payload_MultiPart_FormData_complex

- Endpoint: `post /multipart/form-data/complex-parts`

Expect request (

- according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.4, content-type of file part shall be labeled with
  appropriate media type, cadl-ranch will check it; content-type of other parts is optional, cadl-ranch will ignore it.
- according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.2, filename of file part SHOULD be supplied.
  If there are duplicated filename in same filedName, cadl-ranch can't parse them all.
  ):

```
POST /upload HTTP/1.1
Content-Length: 428
Content-Type: multipart/form-data; boundary=abcde12345

--abcde12345
Content-Disposition: form-data; name="id"
Content-Type: text/plain

123
--abcde12345
Content-Disposition: form-data; name="address"
Content-Type: application/json

{
  "city": "X"
}
--abcde12345
Content-Disposition: form-data; name="profileImage"; filename="<any-name-is-ok>"
Content-Type: application/octet-stream

{…file content…}
--abcde12345--
Content-Disposition: form-data; name="previousAddresses"
Content-Type: application/json

[{
  "city": "Y"
},{
  "city": "Z"
}]
--abcde12345
Content-Disposition: form-data; name="pictures"; filename="<any-name-is-ok>"
Content-Type: application/octet-stream

{…file content…}
--abcde12345
Content-Disposition: form-data; name="pictures"; filename="<any-name-is-ok>"
Content-Type: application/octet-stream

{…file content…}
--abcde12345--
```

### Payload_MultiPart_FormData_jsonArrayParts

- Endpoint: `post /multipart/form-data/json-array-parts`

Expect request (

- according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.4, content-type of file part shall be labeled with
  appropriate media type, cadl-ranch will check it; content-type of other parts is optional, cadl-ranch will ignore it.
- according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.2, filename of file part SHOULD be supplied.
  If there are duplicated filename in same filedName, cadl-ranch can't parse them all.
  ):

```
POST /upload HTTP/1.1
Content-Length: 428
Content-Type: multipart/form-data; boundary=abcde12345

--abcde12345
Content-Disposition: form-data; name="profileImage"; filename="<any-name-is-ok>"
Content-Type: application/octet-stream

{…file content…}
--abcde12345
Content-Disposition: form-data; name="previousAddresses"
Content-Type: application/json

[{
  "city": "Y"
},{
  "city": "Z"
}]
--abcde12345--
```

### Payload_MultiPart_FormData_jsonPart

- Endpoint: `post /multipart/form-data/json-part`

Expect request (

- according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.4, content-type of file part shall be labeled with
  appropriate media type, cadl-ranch will check it; content-type of other parts is optional, cadl-ranch will ignore it.
- according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.2, filename of file part SHOULD be supplied.
  If there are duplicated filename in same filedName, cadl-ranch can't parse them all.
  ):

```
POST /upload HTTP/1.1
Content-Length: 428
Content-Type: multipart/form-data; boundary=abcde12345

--abcde12345
Content-Disposition: form-data; name="address"
Content-Type: application/json

{
  "city": "X"
}
--abcde12345
Content-Disposition: form-data; name="profileImage"; filename="<any-name-is-ok>"
Content-Type: application/octet-stream

{…file content…}
--abcde12345--
```

### Payload_MultiPart_FormData_multiBinaryParts

- Endpoint: `post /multipart/form-data/multi-binary-parts`

Please send request twice, first time with only profileImage, second time with both profileImage and picture(

- according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.4, content-type of file part shall be labeled with
  appropriate media type, cadl-ranch will check it; content-type of other parts is optional, cadl-ranch will ignore it.
- according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.2, filename of file part SHOULD be supplied.
  If there are duplicated filename in same filedName, cadl-ranch can't parse them all.
  ):

```
POST /upload HTTP/1.1
Content-Length: 428
Content-Type: multipart/form-data; boundary=abcde12345

--abcde12345
Content-Disposition: form-data; name="profileImage"; filename="<any-name-is-ok>"
Content-Type: application/octet-stream

{…file content…}
--abcde12345
Content-Disposition: form-data; name="picture"; filename="<any-name-is-ok>"
Content-Type: application/octet-stream

{…file content…}
--abcde12345--
```

### Payload_Pageable_list

- Endpoint: `get /payload/pageable`

List users.

SDK may hide the "maxpagesize" from API signature. The functionality of "maxpagesize" could be in related language Page model.

Expected query parameter:
maxpagesize=3

Expected response body:

```json
{
  "value": [
    {
      "name": "user5"
    },
    {
      "name": "user6"
    },
    {
      "name": "user7"
    }
  ],
  "nextLink": "{endpoint}/payload/pageable?skipToken=name-user7&maxpagesize=3"
}
```

Expected query parameter:
skipToken=name-user7
maxpagesize=3

```json
{
  "value": [
    {
      "name": "user8"
    }
  ]
}
```

### Projection_ProjectedName_Model_client

- Endpoint: `post /projection/projected-name/model/client`

Testing that we can project the client name in our generated SDKs.
Your generated SDK should generate the model with name `ClientModel`.

Expected request body:

```json
{ "defaultName": true }
```

### Projection_ProjectedName_Model_language

- Endpoint: `post /projection/projected-name/model/language`

Testing that we can project the language specific name in our generated SDKs.
Your generated SDK should generate the model with your language specific model name.

Expected request body:

```json
{ "defaultName": true }
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

### Server_Versions_NotVersioned_withoutApiVersion

- Endpoint: `head /server/versions/not-versioned/without-api-version`

A simple operation without api-version. Expected url: '/without-api-version', it should not contain any api-version.

### Server_Versions_NotVersioned_withPathApiVersion

- Endpoint: `head /server/versions/not-versioned/with-path-api-version`

A simple operation with path api-version, which doesn't have any default value. Expected url: '/with-path-api-version/v1.0'.

### Server_Versions_NotVersioned_withQueryApiVersion

- Endpoint: `head /server/versions/not-versioned/with-query-api-version`

A simple operation with query api-version, which doesn't have any default value. Expected url: '/with-query-api-version?api-version=v1.0'.

### Server_Versions_Versioned_withoutApiVersion

- Endpoint: `head /server/versions/versioned/without-api-version`

A simple operation without api-version. Expected url: '/without-api-version', it should not contain any api-version.

### Server_Versions_Versioned_withPathApiVersion

- Endpoint: `head /server/versions/versioned/with-path-api-version`

A simple operation with path api-version, whose default value is defined as '2022-12-01-preview'. Expected url: '/with-path-api-version/2022-12-01-preview'.

### Server_Versions_Versioned_withQueryApiVersion

- Endpoint: `head /server/versions/versioned/with-query-api-version`

A simple operation with query api-version, whose default value is defined as '2022-12-01-preview'. Expected url: '/with-query-api-version?api-version=2022-12-01-preview'.

### SpecialHeaders_ClientRequestId

- Endpoint: `get /special-headers/client-request-id/`

Test case for azure client request id header. SDK should not genreate `clientRequestId` paramerter but use policy to auto-set the header.
Expected header parameters:

- client-request-id=<any uuid string>
  Expected response header:
- client-request-id=<uuid string same with request header>

### SpecialHeaders_ConditionalRequest_postIfMatch

- Endpoint: `post /special-headers/conditional-request/if-match`

Check when only If-Match in header is defined.
Expected header parameters:

- if-match="valid"

### SpecialHeaders_ConditionalRequest_postIfNoneMatch

- Endpoint: `post /special-headers/conditional-request/if-none-match`

Check when only If-None-Match in header is defined.
Expected header parameters:

- if-nonematch="invalid"

### SpecialHeaders_Repeatability_immediateSuccess

- Endpoint: `post /special-headers/repeatability/immediateSuccess`

Check we recognize Repeatability-Request-ID and Repeatability-First-Sent.

### SpecialWords_ModelProperties_sameAsModel

- Endpoint: `get /special-words/model-properties/same-as-model`

Verify that a property can be called the same as the model name. This can be an issue in some languages where the class name is the constructor.

Send

```json
{ "SameAsModel": "ok" }
```

### SpecialWords_Models_and

- Endpoint: `get /special-words/models/and`

Verify that the name "and" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_as

- Endpoint: `get /special-words/models/as`

Verify that the name "as" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_assert

- Endpoint: `get /special-words/models/assert`

Verify that the name "assert" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_async

- Endpoint: `get /special-words/models/async`

Verify that the name "async" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_await

- Endpoint: `get /special-words/models/await`

Verify that the name "await" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_break

- Endpoint: `get /special-words/models/break`

Verify that the name "break" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_class

- Endpoint: `get /special-words/models/class`

Verify that the name "class" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_constructor

- Endpoint: `get /special-words/models/constructor`

Verify that the name "constructor" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_continue

- Endpoint: `get /special-words/models/continue`

Verify that the name "continue" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_def

- Endpoint: `get /special-words/models/def`

Verify that the name "def" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_del

- Endpoint: `get /special-words/models/del`

Verify that the name "del" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_elif

- Endpoint: `get /special-words/models/elif`

Verify that the name "elif" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_else

- Endpoint: `get /special-words/models/else`

Verify that the name "else" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_except

- Endpoint: `get /special-words/models/except`

Verify that the name "except" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_exec

- Endpoint: `get /special-words/models/exec`

Verify that the name "exec" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_finally

- Endpoint: `get /special-words/models/finally`

Verify that the name "finally" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_for

- Endpoint: `get /special-words/models/for`

Verify that the name "for" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_from

- Endpoint: `get /special-words/models/from`

Verify that the name "from" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_global

- Endpoint: `get /special-words/models/global`

Verify that the name "global" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_if

- Endpoint: `get /special-words/models/if`

Verify that the name "if" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_import

- Endpoint: `get /special-words/models/import`

Verify that the name "import" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_in

- Endpoint: `get /special-words/models/in`

Verify that the name "in" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_is

- Endpoint: `get /special-words/models/is`

Verify that the name "is" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_lambda

- Endpoint: `get /special-words/models/lambda`

Verify that the name "lambda" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_not

- Endpoint: `get /special-words/models/not`

Verify that the name "not" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_or

- Endpoint: `get /special-words/models/or`

Verify that the name "or" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_pass

- Endpoint: `get /special-words/models/pass`

Verify that the name "pass" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_raise

- Endpoint: `get /special-words/models/raise`

Verify that the name "raise" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_return

- Endpoint: `get /special-words/models/return`

Verify that the name "return" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_try

- Endpoint: `get /special-words/models/try`

Verify that the name "try" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_while

- Endpoint: `get /special-words/models/while`

Verify that the name "while" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_with

- Endpoint: `get /special-words/models/with`

Verify that the name "with" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Models_yield

- Endpoint: `get /special-words/models/yield`

Verify that the name "yield" works. Send

```json
{ "name": "ok" }
```

### SpecialWords_Operations_and

- Endpoint: `get /special-words/operations/and`

Verify that the name "and" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_as

- Endpoint: `get /special-words/operations/as`

Verify that the name "as" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_assert

- Endpoint: `get /special-words/operations/assert`

Verify that the name "assert" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_async

- Endpoint: `get /special-words/operations/async`

Verify that the name "async" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_await

- Endpoint: `get /special-words/operations/await`

Verify that the name "await" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_break

- Endpoint: `get /special-words/operations/break`

Verify that the name "break" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_class

- Endpoint: `get /special-words/operations/class`

Verify that the name "class" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_constructor

- Endpoint: `get /special-words/operations/constructor`

Verify that the name "constructor" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_continue

- Endpoint: `get /special-words/operations/continue`

Verify that the name "continue" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_def

- Endpoint: `get /special-words/operations/def`

Verify that the name "def" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_del

- Endpoint: `get /special-words/operations/del`

Verify that the name "del" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_elif

- Endpoint: `get /special-words/operations/elif`

Verify that the name "elif" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_else

- Endpoint: `get /special-words/operations/else`

Verify that the name "else" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_except

- Endpoint: `get /special-words/operations/except`

Verify that the name "except" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_exec

- Endpoint: `get /special-words/operations/exec`

Verify that the name "exec" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_finally

- Endpoint: `get /special-words/operations/finally`

Verify that the name "finally" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_for

- Endpoint: `get /special-words/operations/for`

Verify that the name "for" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_from

- Endpoint: `get /special-words/operations/from`

Verify that the name "from" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_global

- Endpoint: `get /special-words/operations/global`

Verify that the name "global" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_if

- Endpoint: `get /special-words/operations/if`

Verify that the name "if" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_import

- Endpoint: `get /special-words/operations/import`

Verify that the name "import" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_in

- Endpoint: `get /special-words/operations/in`

Verify that the name "in" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_is

- Endpoint: `get /special-words/operations/is`

Verify that the name "is" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_lambda

- Endpoint: `get /special-words/operations/lambda`

Verify that the name "lambda" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_not

- Endpoint: `get /special-words/operations/not`

Verify that the name "not" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_or

- Endpoint: `get /special-words/operations/or`

Verify that the name "or" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_pass

- Endpoint: `get /special-words/operations/pass`

Verify that the name "pass" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_raise

- Endpoint: `get /special-words/operations/raise`

Verify that the name "raise" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_return

- Endpoint: `get /special-words/operations/return`

Verify that the name "return" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_try

- Endpoint: `get /special-words/operations/try`

Verify that the name "try" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_while

- Endpoint: `get /special-words/operations/while`

Verify that the name "while" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_with

- Endpoint: `get /special-words/operations/with`

Verify that the name "with" works as an operation name. Call this operation to pass.

### SpecialWords_Operations_yield

- Endpoint: `get /special-words/operations/yield`

Verify that the name "yield" works as an operation name. Call this operation to pass.

### SpecialWords_Parameters_and

- Endpoint: `get /special-words/parameters/and`

Verify that the name "and" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_as

- Endpoint: `get /special-words/parameters/as`

Verify that the name "as" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_assert

- Endpoint: `get /special-words/parameters/assert`

Verify that the name "assert" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_async

- Endpoint: `get /special-words/parameters/async`

Verify that the name "async" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_await

- Endpoint: `get /special-words/parameters/await`

Verify that the name "await" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_break

- Endpoint: `get /special-words/parameters/break`

Verify that the name "break" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_cancellationToken

- Endpoint: `get /special-words/parameters/cancellationToken`

Verify that the name "cancellationToken" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_class

- Endpoint: `get /special-words/parameters/class`

Verify that the name "class" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_constructor

- Endpoint: `get /special-words/parameters/constructor`

Verify that the name "constructor" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_continue

- Endpoint: `get /special-words/parameters/continue`

Verify that the name "continue" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_def

- Endpoint: `get /special-words/parameters/def`

Verify that the name "def" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_del

- Endpoint: `get /special-words/parameters/del`

Verify that the name "del" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_elif

- Endpoint: `get /special-words/parameters/elif`

Verify that the name "elif" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_else

- Endpoint: `get /special-words/parameters/else`

Verify that the name "else" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_except

- Endpoint: `get /special-words/parameters/except`

Verify that the name "except" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_exec

- Endpoint: `get /special-words/parameters/exec`

Verify that the name "exec" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_finally

- Endpoint: `get /special-words/parameters/finally`

Verify that the name "finally" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_for

- Endpoint: `get /special-words/parameters/for`

Verify that the name "for" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_from

- Endpoint: `get /special-words/parameters/from`

Verify that the name "from" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_global

- Endpoint: `get /special-words/parameters/global`

Verify that the name "global" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_if

- Endpoint: `get /special-words/parameters/if`

Verify that the name "if" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_import

- Endpoint: `get /special-words/parameters/import`

Verify that the name "import" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_in

- Endpoint: `get /special-words/parameters/in`

Verify that the name "in" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_is

- Endpoint: `get /special-words/parameters/is`

Verify that the name "is" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_lambda

- Endpoint: `get /special-words/parameters/lambda`

Verify that the name "lambda" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_not

- Endpoint: `get /special-words/parameters/not`

Verify that the name "not" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_or

- Endpoint: `get /special-words/parameters/or`

Verify that the name "or" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_pass

- Endpoint: `get /special-words/parameters/pass`

Verify that the name "pass" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_raise

- Endpoint: `get /special-words/parameters/raise`

Verify that the name "raise" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_return

- Endpoint: `get /special-words/parameters/return`

Verify that the name "return" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_try

- Endpoint: `get /special-words/parameters/try`

Verify that the name "try" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_while

- Endpoint: `get /special-words/parameters/while`

Verify that the name "while" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_with

- Endpoint: `get /special-words/parameters/with`

Verify that the name "with" works. Send this parameter to pass with value `ok`.

### SpecialWords_Parameters_yield

- Endpoint: `get /special-words/parameters/yield`

Verify that the name "yield" works. Send this parameter to pass with value `ok`.

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

### Type_Model_Flatten_putFlattenModel

- Endpoint: `put /type/model/flatten/flattenModel`

Update and receive model with 1 level of flattening.
Expected input body:

```json
{
  "name": "foo",
  "properties": {
    "description": "bar",
    "age": 10
  }
}
```

Expected response body:

```json
{
  "name": "test",
  "properties": {
    "description": "test",
    "age": 1
  }
}
```

### Type_Model_Flatten_putNestedFlattenModel

- Endpoint: `put /type/model/flatten/nestedFlattenModel`

Update and receive model with 2 levels of flattening.
Expected input body:

```json
{
  "name": "foo",
  "properties": {
    "summary": "bar",
    "properties": {
      "description": "test",
      "age": 10
    }
  }
}
```

Expected response body:

```json
{
  "name": "test",
  "properties": {
    "summary": "test",
    "properties": {
      "description": "foo",
      "age": 1
    }
  }
}
```

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

### Type_Model_Inheritance_Recursive_get

- Endpoint: `get /type/model/inheritance/recursive`

Send a GET request which returns the following body:
Expected response body:

```json
{
  "level": 0,
  "extension": [
    {
      "level": 1,
      "extension": [
        {
          "level": 2
        }
      ]
    },
    {
      "level": 1
    }
  ]
}
```

### Type_Model_Inheritance_Recursive_put

- Endpoint: `put /type/model/inheritance/recursive`

Send a PUT request with the following body:
Expected input body:

```json
{
  "level": 0,
  "extension": [
    {
      "level": 1,
      "extension": [
        {
          "level": 2
        }
      ]
    },
    {
      "level": 1
    }
  ]
}
```

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

### Type_Property_AdditionalProperties_ExtendsFloat_get

- Endpoint: `get /type/property/additionalProperties/extendsRecordFloat`

Expected response body:

```json
{ "id": 42.42, "prop": 42.42 }
```

### Type_Property_AdditionalProperties_ExtendsFloat_put

- Endpoint: `put /type/property/additionalProperties/extendsRecordFloat`

Expected input body:

```json
{ "id": 42.42, "prop": 42.42 }
```

### Type_Property_AdditionalProperties_ExtendsModel_get

- Endpoint: `get /type/property/additionalProperties/extendsRecordModel`

Expected response body:

```json
{ "prop": { "state": "ok" } }
```

### Type_Property_AdditionalProperties_ExtendsModel_put

- Endpoint: `put /type/property/additionalProperties/extendsRecordModel`

Expected input body:

```json
{ "prop": { "state": "ok" } }
```

### Type_Property_AdditionalProperties_ExtendsModelArray_get

- Endpoint: `get /type/property/additionalProperties/extendsRecordModelArray`

Expected response body:

```json
{ "prop": [{ "state": "ok" }, { "state": "ok" }] }
```

### Type_Property_AdditionalProperties_ExtendsModelArray_put

- Endpoint: `put /type/property/additionalProperties/extendsRecordModelArray`

Expected input body:

```json
{ "prop": [{ "state": "ok" }, { "state": "ok" }] }
```

### Type_Property_AdditionalProperties_ExtendsString_get

- Endpoint: `get /type/property/additionalProperties/extendsRecordString`

Expected response body:

```json
{ "name": "ExtendsStringAdditionalProperties", "prop": "abc" }
```

### Type_Property_AdditionalProperties_ExtendsString_put

- Endpoint: `put /type/property/additionalProperties/extendsRecordString`

Expected input body:

```json
{ "name": "ExtendsStringAdditionalProperties", "prop": "abc" }
```

### Type_Property_AdditionalProperties_ExtendsUnknown_get

- Endpoint: `get /type/property/additionalProperties/extendsRecordUnknown`

Expected response body:

```json
{
  "name": "ExtendsUnknownAdditionalProperties",
  "prop1": 32,
  "prop2": true,
  "prop3": "abc"
}
```

### Type_Property_AdditionalProperties_ExtendsUnknown_put

- Endpoint: `put /type/property/additionalProperties/extendsRecordUnknown`

Expected input body:

```json
{
  "name": "ExtendsUnknownAdditionalProperties",
  "prop1": 32,
  "prop2": true,
  "prop3": "abc"
}
```

### Type_Property_AdditionalProperties_ExtendsUnknownDerived_get

- Endpoint: `get /type/property/additionalProperties/extendsRecordUnknownDerived`

Expected response body:

```json
{
  "name": "ExtendsUnknownAdditionalProperties",
  "index": 314,
  "age": 2.71828,
  "prop1": 32,
  "prop2": true,
  "prop3": "abc"
}
```

### Type_Property_AdditionalProperties_ExtendsUnknownDerived_put

- Endpoint: `put /type/property/additionalProperties/extendsRecordUnknownDerived`

Expected input body:

```json
{
  "name": "ExtendsUnknownAdditionalProperties",
  "index": 314,
  "age": 2.71828,
  "prop1": 32,
  "prop2": true,
  "prop3": "abc"
}
```

### Type_Property_AdditionalProperties_ExtendsUnknownDiscriminated_get

- Endpoint: `get /type/property/additionalProperties/extendsUnknownDiscriminated`

Expected response body:

```json
{
  "kind": "derived",
  "name": "Derived",
  "index": 314,
  "age": 2.71828,
  "prop1": 32,
  "prop2": true,
  "prop3": "abc"
}
```

### Type_Property_AdditionalProperties_ExtendsUnknownDiscriminated_put

- Endpoint: `put /type/property/additionalProperties/extendsUnknownDiscriminated`

Expected input body:

```json
{
  "kind": "derived",
  "name": "Derived",
  "index": 314,
  "age": 2.71828,
  "prop1": 32,
  "prop2": true,
  "prop3": "abc"
}
```

### Type_Property_AdditionalProperties_IsFloat_get

- Endpoint: `get /type/property/additionalProperties/isRecordFloat`

Expected response body:

```json
{ "id": 42.42, "prop": 42.42 }
```

### Type_Property_AdditionalProperties_IsFloat_put

- Endpoint: `put /type/property/additionalProperties/isRecordFloat`

Expected input body:

```json
{ "id": 42.42, "prop": 42.42 }
```

### Type_Property_AdditionalProperties_IsModel_get

- Endpoint: `get /type/property/additionalProperties/isRecordModel`

Expected response body:

```json
{ "prop": { "state": "ok" } }
```

### Type_Property_AdditionalProperties_IsModel_put

- Endpoint: `put /type/property/additionalProperties/isRecordModel`

Expected input body:

```json
{ "prop": { "state": "ok" } }
```

### Type_Property_AdditionalProperties_IsModelArray_get

- Endpoint: `get /type/property/additionalProperties/isRecordModelArray`

Expected response body:

```json
{ "prop": [{ "state": "ok" }, { "state": "ok" }] }
```

### Type_Property_AdditionalProperties_IsModelArray_put

- Endpoint: `put /type/property/additionalProperties/isRecordModelArray`

Expected input body:

```json
{ "prop": [{ "state": "ok" }, { "state": "ok" }] }
```

### Type_Property_AdditionalProperties_IsString_get

- Endpoint: `get /type/property/additionalProperties/isRecordstring`

Expected response body:

```json
{ "name": "IsStringAdditionalProperties", "prop": "abc" }
```

### Type_Property_AdditionalProperties_IsString_put

- Endpoint: `put /type/property/additionalProperties/isRecordstring`

Expected input body:

```json
{ "name": "IsStringAdditionalProperties", "prop": "abc" }
```

### Type_Property_AdditionalProperties_IsUnknown_get

- Endpoint: `get /type/property/additionalProperties/isRecordUnknown`

Expected response body:

```json
{
  "name": "IsUnknownAdditionalProperties",
  "prop1": 32,
  "prop2": true,
  "prop3": "abc"
}
```

### Type_Property_AdditionalProperties_IsUnknown_put

- Endpoint: `put /type/property/additionalProperties/isRecordUnknown`

Expected input body:

```json
{
  "name": "IsUnknownAdditionalProperties",
  "prop1": 32,
  "prop2": true,
  "prop3": "abc"
}
```

### Type_Property_AdditionalProperties_IsUnknownDerived_get

- Endpoint: `get /type/property/additionalProperties/isRecordUnknownDerived`

Expected response body:

```json
{
  "name": "IsUnknownAdditionalProperties",
  "index": 314,
  "age": 2.71828,
  "prop1": 32,
  "prop2": true,
  "prop3": "abc"
}
```

### Type_Property_AdditionalProperties_IsUnknownDerived_put

- Endpoint: `put /type/property/additionalProperties/isRecordUnknownDerived`

Expected input body:

```json
{
  "name": "IsUnknownAdditionalProperties",
  "index": 314,
  "age": 2.71828,
  "prop1": 32,
  "prop2": true,
  "prop3": "abc"
}
```

### Type_Property_AdditionalProperties_IsUnknownDiscriminated_get

- Endpoint: `get /type/property/additionalProperties/isUnknownDiscriminated`

Expected response body:

```json
{
  "kind": "derived",
  "name": "Derived",
  "index": 314,
  "age": 2.71828,
  "prop1": 32,
  "prop2": true,
  "prop3": "abc"
}
```

### Type_Property_AdditionalProperties_IsUnknownDiscriminated_put

- Endpoint: `put /type/property/additionalProperties/isUnknownDiscriminated`

Expected input body:

```json
{
  "kind": "derived",
  "name": "Derived",
  "index": 314,
  "age": 2.71828,
  "prop1": 32,
  "prop2": true,
  "prop3": "abc"
}
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

### Type_Property_Optional_BooleanLiteral_getAll

- Endpoint: `get /type/property/optional/boolean/literal/all`

Expected response body:

```json
{ "property": true }
```

### Type_Property_Optional_BooleanLiteral_getDefault

- Endpoint: `get /type/property/optional/boolean/literal/default`

Expected response body:

```json
{}
```

### Type_Property_Optional_BooleanLiteral_putAll

- Endpoint: `put /type/property/optional/boolean/literal/all`

Expected request body:

```json
{ "property": true }
```

### Type_Property_Optional_BooleanLiteral_putDefault

- Endpoint: `put /type/property/optional/boolean/literal/default`

Expected request body:

```json
{}
```

### Type_Property_Optional_Bytes_getAll

- Endpoint: `get /type/property/optional/bytes/all`

Expected response body:

```json
{ "property": "aGVsbG8sIHdvcmxkIQ==" }
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
{ "property": "aGVsbG8sIHdvcmxkIQ==" }
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
{ "property": ["aGVsbG8sIHdvcmxkIQ==", "aGVsbG8sIHdvcmxkIQ=="] }
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
{ "property": ["aGVsbG8sIHdvcmxkIQ==", "aGVsbG8sIHdvcmxkIQ=="] }
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
{ "property": [{ "property": "hello" }, { "property": "world" }] }
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
{ "property": "2022-08-26T18:38:00Z" }
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
{ "property": "2022-08-26T18:38:00Z" }
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
{ "property": "P123DT22H14M12.011S" }
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
{ "property": "P123DT22H14M12.011S" }
```

### Type_Property_Optional_Duration_putDefault

- Endpoint: `put /type/property/optional/duration/default`

Expected request body:

```json
{}
```

### Type_Property_Optional_FloatLiteral_getAll

- Endpoint: `get /type/property/optional/float/literal/all`

Expected response body:

```json
{ "property": 1.2 }
```

### Type_Property_Optional_FloatLiteral_getDefault

- Endpoint: `get /type/property/optional/float/literal/default`

Expected response body:

```json
{}
```

### Type_Property_Optional_FloatLiteral_putAll

- Endpoint: `put /type/property/optional/float/literal/all`

Expected request body:

```json
{ "property": 1.2 }
```

### Type_Property_Optional_FloatLiteral_putDefault

- Endpoint: `put /type/property/optional/float/literal/default`

Expected request body:

```json
{}
```

### Type_Property_Optional_IntLiteral_getAll

- Endpoint: `get /type/property/optional/int/literal/all`

Expected response body:

```json
{ "property": 1 }
```

### Type_Property_Optional_IntLiteral_getDefault

- Endpoint: `get /type/property/optional/int/literal/default`

Expected response body:

```json
{}
```

### Type_Property_Optional_IntLiteral_putAll

- Endpoint: `put /type/property/optional/int/literal/all`

Expected request body:

```json
{ "property": 1 }
```

### Type_Property_Optional_IntLiteral_putDefault

- Endpoint: `put /type/property/optional/int/literal/default`

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
{ "property": "hello" }
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
{ "property": "hello" }
```

### Type_Property_Optional_String_putDefault

- Endpoint: `put /type/property/optional/string/default`

Expected request body:

```json
{}
```

### Type_Property_Optional_StringLiteral_getAll

- Endpoint: `get /type/property/optional/string/literal/all`

Expected response body:

```json
{ "property": "hello" }
```

### Type_Property_Optional_StringLiteral_getDefault

- Endpoint: `get /type/property/optional/string/literal/default`

Expected response body:

```json
{}
```

### Type_Property_Optional_StringLiteral_putAll

- Endpoint: `put /type/property/optional/string/literal/all`

Expected request body:

```json
{ "property": "hello" }
```

### Type_Property_Optional_StringLiteral_putDefault

- Endpoint: `put /type/property/optional/string/literal/default`

Expected request body:

```json
{}
```

### Type_Property_Optional_UnionFloatLiteral_getAll

- Endpoint: `get /type/property/optional/union/float/literal/all`

Expected response body:

```json
{ "property": 2.3 }
```

### Type_Property_Optional_UnionFloatLiteral_getDefault

- Endpoint: `get /type/property/optional/union/float/literal/default`

Expected response body:

```json
{}
```

### Type_Property_Optional_UnionFloatLiteral_putAll

- Endpoint: `put /type/property/optional/union/float/literal/all`

Expected request body:

```json
{ "property": 2.3 }
```

### Type_Property_Optional_UnionFloatLiteral_putDefault

- Endpoint: `put /type/property/optional/union/float/literal/default`

Expected request body:

```json
{}
```

### Type_Property_Optional_UnionIntLiteral_getAll

- Endpoint: `get /type/property/optional/union/int/literal/all`

Expected response body:

```json
{ "property": 2 }
```

### Type_Property_Optional_UnionIntLiteral_getDefault

- Endpoint: `get /type/property/optional/union/int/literal/default`

Expected response body:

```json
{}
```

### Type_Property_Optional_UnionIntLiteral_putAll

- Endpoint: `put /type/property/optional/union/int/literal/all`

Expected request body:

```json
{ "property": 2 }
```

### Type_Property_Optional_UnionIntLiteral_putDefault

- Endpoint: `put /type/property/optional/union/int/literal/default`

Expected request body:

```json
{}
```

### Type_Property_Optional_UnionStringLiteral_getAll

- Endpoint: `get /type/property/optional/union/string/literal/all`

Expected response body:

```json
{ "property": "world" }
```

### Type_Property_Optional_UnionStringLiteral_getDefault

- Endpoint: `get /type/property/optional/union/string/literal/default`

Expected response body:

```json
{}
```

### Type_Property_Optional_UnionStringLiteral_putAll

- Endpoint: `put /type/property/optional/union/string/literal/all`

Expected request body:

```json
{ "property": "world" }
```

### Type_Property_Optional_UnionStringLiteral_putDefault

- Endpoint: `put /type/property/optional/union/string/literal/default`

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

### Type_Property_ValueTypes_BooleanLiteral_get

- Endpoint: `get /type/property/value-types/boolean/literal`

Expected response body:

```json
{ "property": true }
```

### Type_Property_ValueTypes_BooleanLiteral_put

- Endpoint: `put /type/property/value-types/boolean/literal`

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

### Type_Property_ValueTypes_Decimal_get

- Endpoint: `get /type/property/value-types/decimal`

Expected response body:

```json
{ "property": 0.33333 }
```

### Type_Property_ValueTypes_Decimal_put

- Endpoint: `put /type/property/value-types/decimal`

Expected input body:

```json
{ "property": 0.33333 }
```

### Type_Property_ValueTypes_Decimal128_get

- Endpoint: `get /type/property/value-types/decimal128`

Expected response body:

```json
{ "property": 0.33333 }
```

### Type_Property_ValueTypes_Decimal128_put

- Endpoint: `put /type/property/value-types/decimal128`

Expected input body:

```json
{ "property": 0.33333 }
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

### Type_Property_ValueTypes_FloatLiteral_get

- Endpoint: `get /type/property/value-types/float/literal`

Expected response body:

```json
{ "property": 42.42 }
```

### Type_Property_ValueTypes_FloatLiteral_put

- Endpoint: `put /type/property/value-types/float/literal`

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

### Type_Property_ValueTypes_IntLiteral_get

- Endpoint: `get /type/property/value-types/int/literal`

Expected response body:

```json
{ "property": 42 }
```

### Type_Property_ValueTypes_IntLiteral_put

- Endpoint: `put /type/property/value-types/int/literal`

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
{ "property": "hello" }
```

### Type_Property_ValueTypes_String_put

- Endpoint: `put /type/property/value-types/string`

Expected input body:

```json
{ "property": "hello" }
```

### Type_Property_ValueTypes_StringLiteral_get

- Endpoint: `get /type/property/value-types/string/literal`

Expected response body:

```json
{ "property": "hello" }
```

### Type_Property_ValueTypes_StringLiteral_put

- Endpoint: `put /type/property/value-types/string/literal`

Expected input body:

```json
{ "property": "hello" }
```

### Type_Property_ValueTypes_UnionFloatLiteral_get

- Endpoint: `get /type/property/value-types/union/float/literal`

Expected response body:

```json
{ "property": 43.43 }
```

### Type_Property_ValueTypes_UnionFloatLiteral_put

- Endpoint: `put /type/property/value-types/union/float/literal`

Expected input body:

```json
{ "property": 43.43 }
```

### Type_Property_ValueTypes_UnionIntLiteral_get

- Endpoint: `get /type/property/value-types/union/int/literal`

Expected response body:

```json
{ "property": 42 }
```

### Type_Property_ValueTypes_UnionIntLiteral_put

- Endpoint: `put /type/property/value-types/union/int/literal`

Expected input body:

```json
{ "property": 42 }
```

### Type_Property_ValueTypes_UnionStringLiteral_get

- Endpoint: `get /type/property/value-types/union/string/literal`

Expected response body:

```json
{ "property": "world" }
```

### Type_Property_ValueTypes_UnionStringLiteral_put

- Endpoint: `put /type/property/value-types/union/string/literal`

Expected input body:

```json
{ "property": "world" }
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

### Type_Scalar_Boolean_get

- Endpoint: `get /type/scalar/boolean`

Expect to handle a boolean value. Mock api will return true

### Type_Scalar_Boolean_put

- Endpoint: `put /type/scalar/boolean`

Expect to send a boolean value. Mock api expect to receive 'true'

### Type_Scalar_Decimal128Type_requestBody

- Endpoint: `put /type/scalar/decimal128/resquest_body`

Expected input body:

```json
0.33333
```

### Type_Scalar_Decimal128Type_requestParameter

- Endpoint: `get /type/scalar/decimal128/request_parameter`

Expected request parameter:
value=0.33333

### Type_Scalar_Decimal128Type_responseBody

- Endpoint: `get /type/scalar/decimal128/response_body`

Expected response body:

```json
0.33333
```

### Type_Scalar_Decimal128Verify_prepareVerify

- Endpoint: `get /type/scalar/decimal128/prepare_verify`

Get verify values:
[0.1, 0.1, 0.1]

### Type_Scalar_Decimal128Verify_verify

- Endpoint: `post /type/scalar/decimal128/verify`

Expected input body:

```json
0.3
```

### Type_Scalar_DecimalType_requestBody

- Endpoint: `put /type/scalar/decimal/resquest_body`

Expected input body:

```json
0.33333
```

### Type_Scalar_DecimalType_requestParameter

- Endpoint: `get /type/scalar/decimal/request_parameter`

Expected request parameter:
value=0.33333

### Type_Scalar_DecimalType_responseBody

- Endpoint: `get /type/scalar/decimal/response_body`

Expected response body:

```json
0.33333
```

### Type_Scalar_DecimalVerify_prepareVerify

- Endpoint: `get /type/scalar/decimal/prepare_verify`

Get verify values:
[0.1, 0.1, 0.1]

### Type_Scalar_DecimalVerify_verify

- Endpoint: `post /type/scalar/decimal/verify`

Expected input body:

```json
0.3
```

### Type_Scalar_String_get

- Endpoint: `get /type/scalar/string`

Expect to handle a string value. Mock api will return 'test'

### Type_Scalar_String_put

- Endpoint: `put /type/scalar/string`

Expect to send a string value. Mock api expect to receive 'test'

### Type_Scalar_Unknown_get

- Endpoint: `get /type/scalar/unknown`

Expect to handle a unknown type value. Mock api will return 'test'

### Type_Scalar_Unknown_put

- Endpoint: `put /type/scalar/unknown`

Expect to send a string value. Mock api expect to receive 'test'

### Type_Union_EnumsOnly_get

- Endpoint: `get /type/union/enums-only`

Verify a union can be processed in a response:

```tsp
Type.Union.LR | Type.Union.UD
```

Expected response body:

```json
{
  "prop": {
    "lr": "right",
    "ud": "up"
  }
}
```

### Type_Union_EnumsOnly_send

- Endpoint: `get /type/union/enums-only`

Verify a union can be processed in a response:

```tsp
Type.Union.LR | Type.Union.UD
```

Expected request to send body:

```json
{
  "prop": {
    "lr": "right",
    "ud": "up"
  }
}
```

### Type_Union_FloatsOnly_get

- Endpoint: `get /type/union/floats-only`

Verify a union can be processed in a response:

```tsp
1.1 | 2.2 | 3.3
```

Expected response body:

```json
{ "prop": 2.2 }
```

### Type_Union_FloatsOnly_send

- Endpoint: `get /type/union/floats-only`

Verify a union can be processed in a response:

```tsp
1.1 | 2.2 | 3.3
```

Expected request to send body:

```json
{ "prop": 2.2 }
```

### Type_Union_IntsOnly_get

- Endpoint: `get /type/union/ints-only`

Verify a union can be processed in a response:

```tsp
1 | 2 | 3
```

Expected response body:

```json
{ "prop": 2 }
```

### Type_Union_IntsOnly_send

- Endpoint: `get /type/union/ints-only`

Verify a union can be processed in a response:

```tsp
1 | 2 | 3
```

Expected request to send body:

```json
{ "prop": 2 }
```

### Type_Union_MixedLiterals_get

- Endpoint: `get /type/union/mixed-literals`

Verify a union can be processed in a response:

```tsp
a | 2 | 3.3 | true
```

Expected response body:

```json
{
  "prop": {
    "stringLiteral": "a",
    "intLiteral": 2,
    "floatLiteral": 3.3,
    "booleanLiteral": true
  }
}
```

### Type_Union_MixedLiterals_send

- Endpoint: `get /type/union/mixed-literals`

Verify a union can be processed in a response:

```tsp
a | 2 | 3.3 | true
```

Expected request to send body:

```json
{
  "prop": {
    "stringLiteral": "a",
    "intLiteral": 2,
    "floatLiteral": 3.3,
    "booleanLiteral": true
  }
}
```

### Type_Union_MixedTypes_get

- Endpoint: `get /type/union/mixed-types`

Verify a union can be processed in a response:

```tsp
Type.Union.Cat | a | int32 | boolean
```

Expected response body:

```json
{
  "prop": {
    "model": {
      "name": "test"
    },
    "literal": "a",
    "int": 2,
    "boolean": true
  }
}
```

### Type_Union_MixedTypes_send

- Endpoint: `get /type/union/mixed-types`

Verify a union can be processed in a response:

```tsp
Type.Union.Cat | a | int32 | boolean
```

Expected request to send body:

```json
{
  "prop": {
    "model": {
      "name": "test"
    },
    "literal": "a",
    "int": 2,
    "boolean": true
  }
}
```

### Type_Union_ModelsOnly_get

- Endpoint: `get /type/union/models-only`

Verify a union can be processed in a response:

```tsp
Type.Union.Cat | Type.Union.Dog
```

Expected response body:

```json
{
  "prop": {
    "name": "test"
  }
}
```

### Type_Union_ModelsOnly_send

- Endpoint: `get /type/union/models-only`

Verify a union can be processed in a response:

```tsp
Type.Union.Cat | Type.Union.Dog
```

Expected request to send body:

```json
{
  "prop": {
    "name": "test"
  }
}
```

### Type_Union_StringAndArray_get

- Endpoint: `get /type/union/string-and-array`

Verify a union can be processed in a response:

```tsp
string | string[]
```

Expected response body:

```json
{
  "prop": {
    "string": "test",
    "array": ["test1", "test2"]
  }
}
```

### Type_Union_StringAndArray_send

- Endpoint: `get /type/union/string-and-array`

Verify a union can be processed in a response:

```tsp
string | string[]
```

Expected request to send body:

```json
{
  "prop": {
    "string": "test",
    "array": ["test1", "test2"]
  }
}
```

### Type_Union_StringExtensible_get

- Endpoint: `get /type/union/string-extensible`

Verify a union can be processed in a response:

```tsp
string | b | c
```

Expected response body:

```json
{ "prop": "custom" }
```

### Type_Union_StringExtensible_send

- Endpoint: `get /type/union/string-extensible`

Verify a union can be processed in a response:

```tsp
string | b | c
```

Expected request to send body:

```json
{ "prop": "custom" }
```

### Type_Union_StringExtensibleNamed_get

- Endpoint: `get /type/union/string-extensible-named`

Verify a union can be processed in a response:

```tsp
Type.Union.StringExtensibleNamedUnion
```

Expected response body:

```json
{ "prop": "custom" }
```

### Type_Union_StringExtensibleNamed_send

- Endpoint: `get /type/union/string-extensible-named`

Verify a union can be processed in a response:

```tsp
Type.Union.StringExtensibleNamedUnion
```

Expected request to send body:

```json
{ "prop": "custom" }
```

### Type_Union_StringsOnly_get

- Endpoint: `get /type/union/strings-only`

Verify a union can be processed in a response:

```tsp
a | b | c
```

Expected response body:

```json
{ "prop": "b" }
```

### Type_Union_StringsOnly_send

- Endpoint: `get /type/union/strings-only`

Verify a union can be processed in a response:

```tsp
a | b | c
```

Expected request to send body:

```json
{ "prop": "b" }
```
