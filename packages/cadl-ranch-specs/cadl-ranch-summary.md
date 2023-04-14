# Cadl Ranch Project summary

### Arrays_ItemTypes_Int32Value_get

- Endpoint: `get /arrays/item-types/int32`

Expected Array response body:

```json
[1, 2]
```

### Arrays_ItemTypes_Int32Value_put

- Endpoint: `put /arrays/item-types/int32`

Expected Array input body:

```json
[1, 2]
```

### Arrays_ItemTypes_Int64Value_get

- Endpoint: `get /arrays/item-types/int64`

Expected Array response body:

```json
[0x7fffffffffffffff, -0x7fffffffffffffff]
```

### Arrays_ItemTypes_Int64Value_put

- Endpoint: `put /arrays/item-types/int64`

Expected Array input body:

```json
[0x7fffffffffffffff, -0x7fffffffffffffff]
```

### Arrays_ItemTypes_BooleanValue_get

- Endpoint: `get /arrays/item-types/boolean`

Expected Array response body:

```json
[true, false]
```

### Arrays_ItemTypes_BooleanValue_put

- Endpoint: `put /arrays/item-types/boolean`

Expected Array input body:

```json
[true, false]
```

### Arrays_ItemTypes_StringValue_get

- Endpoint: `get /arrays/item-types/string`

Expected Array response body:

```json
["hello", ""]
```

### Arrays_ItemTypes_StringValue_put

- Endpoint: `put /arrays/item-types/string`

Expected Array input body:

```json
["hello", ""]
```

### Arrays_ItemTypes_Float32Value_get

- Endpoint: `get /arrays/item-types/float32`

Expected Array response body:

```json
[42.42]
```

### Arrays_ItemTypes_Float32Value_put

- Endpoint: `put /arrays/item-types/float32`

Expected Array input body:

```json
[42.42]
```

### Arrays_ItemTypes_DatetimeValue_get

- Endpoint: `get /arrays/item-types/datetime`

Expected Array response body:

```json
["2022-08-26T18:38:00Z"]
```

### Arrays_ItemTypes_DatetimeValue_put

- Endpoint: `put /arrays/item-types/datetime`

Expected Array input body:

```json
["2022-08-26T18:38:00Z"]
```

### Arrays_ItemTypes_DurationValue_get

- Endpoint: `get /arrays/item-types/duration`

Expected Array response body:

```json
["P123DT22H14M12.011S"]
```

### Arrays_ItemTypes_DurationValue_put

- Endpoint: `put /arrays/item-types/duration`

Expected Array input body:

```json
["P123DT22H14M12.011S"]
```

### Arrays_ItemTypes_UnknownValue_get

- Endpoint: `get /arrays/item-types/unknown`

Expected Array response body:

```json
[1, 'hello', 'k3': null]
```

### Arrays_ItemTypes_UnknownValue_put

- Endpoint: `put /arrays/item-types/unknown`

Expected Array input body:

```json
[1, 'hello', 'k3': null]
```

### Arrays_ItemTypes_ModelValue_get

- Endpoint: `get /arrays/item-types/model`

Expected Array response body:

```json
[{ "property": "hello" }, { "property": "world" }]
```

### Arrays_ItemTypes_ModelValue_put

- Endpoint: `put /arrays/item-types/model`

Expected Array input body:

```json
[{ "property": "hello" }, { "property": "world" }]
```

### Arrays_ItemTypes_NullableFloatValue_get

- Endpoint: `get /arrays/item-types/nullable-float`

Expected Array response body:

```json
[1.2, null, 3.0]
```

### Arrays_ItemTypes_NullableFloatValue_put

- Endpoint: `put /arrays/item-types/nullable-float`

Expected Array input body:

```json
[1.2, null, 3.0]
```

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

### Azure_Core_createOrUpdate

- Endpoint: `get /azure/core`

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

### Azure_Core_createOrReplace

- Endpoint: `get /azure/core`

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

### Azure_Core_get

- Endpoint: `get /azure/core`

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

### Azure_Core_list

- Endpoint: `get /azure/core`

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

### Azure_Core_listWithPage

- Endpoint: `get /azure/core/page`

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

### Azure_Core_delete

- Endpoint: `get /azure/core`

Expected path parameter: id=1

Expected query parameter: api-version=2022-12-01-preview

Expected response of status code 204 with empty body.

### Azure_Core_export

- Endpoint: `get /azure/core`

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

### Azure_Traits_get

- Endpoint: `get /azure/traits`

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

### Azure_Traits_delete

- Endpoint: `get /azure/traits`

Expected path parameter:

- id=1
- api-version=2022-12-01-preview
  Expected header parameters:
- x-ms-client-request-id=<any string>

Expected response headers:

- x-ms-client-request-id=<any string>
- Repeatability-Result=Accepted

### Dictionary_Int32Value_get

- Endpoint: `get /dictionary/int32`

Expected dictionary response body:

```json
{ "k1": 1, "k2": 2 }
```

### Dictionary_Int32Value_put

- Endpoint: `put /dictionary/int32`

Expected dictionary input body:

```json
{ "k1": 1, "k2": 2 }
```

### Dictionary_Int64Value_get

- Endpoint: `get /dictionary/int64`

Expected dictionary response body:

```json
{ "k1": 0x7fffffffffffffff, "k2": -0x7fffffffffffffff }
```

### Dictionary_Int64Value_put

- Endpoint: `put /dictionary/int64`

Expected dictionary input body:

```json
{ "k1": 0x7fffffffffffffff, "k2": -0x7fffffffffffffff }
```

### Dictionary_BooleanValue_get

- Endpoint: `get /dictionary/boolean`

Expected dictionary response body:

```json
{ "k1": true, "k2": false }
```

### Dictionary_BooleanValue_put

- Endpoint: `put /dictionary/boolean`

Expected dictionary input body:

```json
{ "k1": true, "k2": false }
```

### Dictionary_StringValue_get

- Endpoint: `get /dictionary/string`

Expected dictionary response body:

```json
{ "k1": "hello", "k2": "" }
```

### Dictionary_StringValue_put

- Endpoint: `put /dictionary/string`

Expected dictionary input body:

```json
{ "k1": "hello", "k2": "" }
```

### Dictionary_Float32Value_get

- Endpoint: `get /dictionary/float32`

Expected dictionary response body:

```json
{ "k1": 42.42 }
```

### Dictionary_Float32Value_put

- Endpoint: `put /dictionary/float32`

Expected dictionary input body:

```json
{ "k1": 42.42 }
```

### Dictionary_DatetimeValue_get

- Endpoint: `get /dictionary/datetime`

Expected dictionary response body:

```json
{ "k1": "2022-08-26T18:38:00Z" }
```

### Dictionary_DatetimeValue_put

- Endpoint: `put /dictionary/datetime`

Expected dictionary input body:

```json
{ "k1": "2022-08-26T18:38:00Z" }
```

### Dictionary_DurationValue_get

- Endpoint: `get /dictionary/duration`

Expected dictionary response body:

```json
{ "k1": "P123DT22H14M12.011S" }
```

### Dictionary_DurationValue_put

- Endpoint: `put /dictionary/duration`

Expected dictionary input body:

```json
{ "k1": "P123DT22H14M12.011S" }
```

### Dictionary_UnknownValue_get

- Endpoint: `get /dictionary/unknown`

Expected dictionary response body:

```json
{ "k1": 1, "k2": "hello", "k3": null }
```

### Dictionary_UnknownValue_put

- Endpoint: `put /dictionary/unknown`

Expected dictionary input body:

```json
{ "k1": 1, "k2": "hello", "k3": null }
```

### Dictionary_ModelValue_get

- Endpoint: `get /dictionary/model`

Expected dictionary response body:

```json
{ "k1": { "property": "hello" }, "k2": { "property": "world" } }
```

### Dictionary_ModelValue_put

- Endpoint: `put /dictionary/model`

Expected dictionary input body:

```json
{ "k1": { "property": "hello" }, "k2": { "property": "world" } }
```

### Dictionary_RecursiveModelValue_get

- Endpoint: `get /dictionary/model/recursive`

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

### Dictionary_RecursiveModelValue_put

- Endpoint: `put /dictionary/model/recursive`

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

### Dictionary_NullableFloatValue_get

- Endpoint: `get /dictionary/nullable-float`

Expected dictionary response body:

```json
{ "k1": 1.2, "k2": 0.5, "k3": null }
```

### Dictionary_NullableFloatValue_put

- Endpoint: `put /dictionary/nullable-float`

Expected dictionary input body:

```json
{ "k1": 1.2, "k2": 0.5, "k3": null }
```

### Enums_Extensible_String_getKnownValue

- Endpoint: `get /enums/extensible/string/known-value`

Expect to handle a known value. Mock api will return 'Monday'

### Enums_Extensible_String_getUnknownValue

- Endpoint: `get /enums/extensible/string/unknown-value`

Expect to handle an unknown value. Mock api will return 'Weekend'

### Enums_Extensible_String_putKnownValue

- Endpoint: `put /enums/extensible/string/known-value`

Expect to send a known value. Mock api expect to receive 'Monday'

### Enums_Extensible_String_putUnknownValue

- Endpoint: `put /enums/extensible/string/unknown-value`

Expect to handle an unknown value. Mock api expect to receive 'Weekend'

### Enums_Fixed_String_getKnownValue

- Endpoint: `get /enums/fixed/string/known-value`

Expect to handle a known value. Mock api will return 'Monday'

### Enums_Fixed_String_putKnownValue

- Endpoint: `put /enums/fixed/string/known-value`

Expect to send a known value. Mock api expect to receive 'Monday'

### Enums_Fixed_String_putUnknownValue

- Endpoint: `put /enums/fixed/string/unknown-value`

Expect to handle an unknown value. Mock api expect to receive 'Weekend'

### Hello_world

- Endpoint: `get /hello/world`

This test is testing this payload is returned from the server

```json
"hello world"
```

### Internal_getInternal

- Endpoint: `get /internal/getInternal`

This test is testing an internal operation using an internal response model. The operation and model should be generated but not exposed.
Expected query parameter: name=<any string>
Expected response body:

```json
{
  "name": <any string>
}
```

### Internal_postInternal

- Endpoint: `post /internal/postInternal`

This test is testing an internal operation using a non-internal model. The model is only used in this internal operation. The operation and model should be generated but not exposed.
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

### Azure_Lro_PollingSuccess

- Endpoints:
  - `put /lro/basic/put`
  - `put /lro/basic/put/polling`
  - `put /lro/basic/put`

Expected final response body:

```json
{
  "name": "bob"
}
```

### Azure_Lro_Core_createOrReplace

- Endpoint: `get /azure/lro/core`

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

### Azure_Lro_Core_delete

- Endpoint: `get /azure/lro/core`

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

### Azure_Lro_Core_export

- Endpoint: `get /azure/lro/core`

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

### Azure_Lro_Rpc_SamePollResult

- Endpoints:
  - `get /azure/lro/rpc/same-poll-result/jobs`
  - `get /azure/lro/rpc/same-poll-result`

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

### Azure_Lro_Rpc_DifferentPollResult

- Endpoints:
  - `get /azure/lro/rpc/different-poll-result/jobs`
  - `get /azure/lro/rpc/different-poll-result`

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

### Models_Inheritance_Discriminated_getModel

- Endpoint: `get /models/inheritance/discriminated/model`

Generate and receive polymorphic model in multiple levels inheritance with 2 discriminators.
Expected response body:

```json
{ "age": 1, "kind": "shark", "sharktype": "goblin" }
```

### Models_Inheritance_Discriminated_putModel

- Endpoint: `put /models/inheritance/discriminated/model`

Generate and send polymorphic model in multiple levels inheritance with 2 discriminators.
Expected input body:

```json
{ "age": 1, "kind": "shark", "sharktype": "goblin" }
```

### Models_Inheritance_Discriminated_getRecursiveModel

- Endpoint: `get /models/inheritance/discriminated/recursivemodel`

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

### Models_Inheritance_Discriminated_putRecursiveModel

- Endpoint: `put /models/inheritance/discriminated/recursivemodel`

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

### Models_Inheritance_Discriminated_getMissingDiscriminator

- Endpoint: `get /models/inheritance/discriminated/missingdiscriminator`

Get a model omitting the discriminator.
Expected response body:

```json
{ "age": 1 }
```

### Models_Inheritance_Discriminated_getWrongDiscriminator

- Endpoint: `get /models/inheritance/discriminated/wrongdiscriminator`

Get a model containing discriminator value never defined.
Expected response body:

```json
{ "age": 1, "kind": "wrongKind" }
```

### Models_Inheritance_postValid

- Endpoint: `post /models/inheritance/valid`

Generate and send model.
Expected input body:

```json
{ "name": "abc", "age": 32, "smart": true }
```

### Models_Inheritance_getValid

- Endpoint: `get /models/inheritance/valid`

Generate and receive model.
Expected response body:

```json
{ "name": "abc", "age": 32, "smart": true }
```

### Models_Inheritance_putValid

- Endpoint: `put /models/inheritance/valid`

Generate, send, and receive round-trip bottom model.

### Models_Property_Nullable_String_getNonNull

- Endpoint: `get /models/properties/nullable/string/non-null`

Expected response body:

```json
{ "requiredProperty": "foo", "nullableProperty": hello}
```

### Models_Property_Nullable_String_getNull

- Endpoint: `get /models/properties/nullable/string/null`

Expected response body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Models_Property_Nullable_String_patchNonNull

- Endpoint: `patch /models/properties/nullable/string/non-null`

Expected request body:

```json
{ "requiredProperty": "foo", "nullableProperty": hello}
```

### Models_Property_Nullable_String_patchNull

- Endpoint: `patch /models/properties/nullable/string/null`

Expected request body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Models_Property_Nullable_Bytes_getNonNull

- Endpoint: `get /models/properties/nullable/bytes/non-null`

Expected response body:

```json
{ "requiredProperty": "foo", "nullableProperty": aGVsbG8sIHdvcmxkIQ==}
```

### Models_Property_Nullable_Bytes_getNull

- Endpoint: `get /models/properties/nullable/bytes/null`

Expected response body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Models_Property_Nullable_Bytes_patchNonNull

- Endpoint: `patch /models/properties/nullable/bytes/non-null`

Expected request body:

```json
{ "requiredProperty": "foo", "nullableProperty": aGVsbG8sIHdvcmxkIQ==}
```

### Models_Property_Nullable_Bytes_patchNull

- Endpoint: `patch /models/properties/nullable/bytes/null`

Expected request body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Models_Property_Nullable_Datetime_getNonNull

- Endpoint: `get /models/properties/nullable/datetime/non-null`

Expected response body:

```json
{ "requiredProperty": "foo", "nullableProperty": 2022-08-26T18:38:00Z}
```

### Models_Property_Nullable_Datetime_getNull

- Endpoint: `get /models/properties/nullable/datetime/null`

Expected response body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Models_Property_Nullable_Datetime_patchNonNull

- Endpoint: `patch /models/properties/nullable/datetime/non-null`

Expected request body:

```json
{ "requiredProperty": "foo", "nullableProperty": 2022-08-26T18:38:00Z}
```

### Models_Property_Nullable_Datetime_patchNull

- Endpoint: `patch /models/properties/nullable/datetime/null`

Expected request body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Models_Property_Nullable_Duration_getNonNull

- Endpoint: `get /models/properties/nullable/duration/non-null`

Expected response body:

```json
{ "requiredProperty": "foo", "nullableProperty": P123DT22H14M12.011S}
```

### Models_Property_Nullable_Duration_getNull

- Endpoint: `get /models/properties/nullable/duration/null`

Expected response body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Models_Property_Nullable_Duration_patchNonNull

- Endpoint: `patch /models/properties/nullable/duration/non-null`

Expected request body:

```json
{ "requiredProperty": "foo", "nullableProperty": P123DT22H14M12.011S}
```

### Models_Property_Nullable_Duration_patchNull

- Endpoint: `patch /models/properties/nullable/duration/null`

Expected request body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Models_Property_Nullable_CollectionsByte_getNonNull

- Endpoint: `get /models/properties/nullable/collections/bytes/non-null`

Expected response body:

```json
{ "requiredProperty": "foo", "nullableProperty": [aGVsbG8sIHdvcmxkIQ==, aGVsbG8sIHdvcmxkIQ==]}
```

### Models_Property_Nullable_CollectionsByte_getNull

- Endpoint: `get /models/properties/nullable/collections/bytes/null`

Expected response body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Models_Property_Nullable_CollectionsByte_patchNonNull

- Endpoint: `patch /models/properties/nullable/collections/bytes/non-null`

Expected request body:

```json
{ "requiredProperty": "foo", "nullableProperty": [aGVsbG8sIHdvcmxkIQ==, aGVsbG8sIHdvcmxkIQ==]}
```

### Models_Property_Nullable_CollectionsByte_patchNull

- Endpoint: `patch /models/properties/nullable/collections/bytes/null`

Expected request body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Models_Property_Nullable_CollectionsModel_getNonNull

- Endpoint: `get /models/properties/nullable/collections/model/non-null`

Expected response body:

```json
{
  "requiredProperty": "foo",
  "nullableProperty": [{ "property": "hello" }, { "property": "world" }]
}
```

### Models_Property_Nullable_CollectionsModel_getNull

- Endpoint: `get /models/properties/nullable/collections/model/null`

Expected response body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Models_Property_Nullable_CollectionsModel_patchNonNull

- Endpoint: `patch /models/properties/nullable/collections/model/non-null`

Expected request body:

```json
{
  "requiredProperty": "foo",
  "nullableProperty": [{ "property": "hello" }, { "property": "world" }]
}
```

### Models_Property_Nullable_CollectionsModel_patchNull

- Endpoint: `patch /models/properties/nullable/collections/model/null`

Expected request body:

```json
{ "requiredProperty": "foo", "nullableProperty": null }
```

### Models_Property_Optional_String_getAll

- Endpoint: `get /models/properties/optional/string/all`

Expected response body:

```json
{"property": doc}
```

### Models_Property_Optional_String_getDefault

- Endpoint: `get /models/properties/optional/string/default`

Expected response body:

```json
{}
```

### Models_Property_Optional_String_putAll

- Endpoint: `put /models/properties/optional/string/all`

Expected request body:

```json
{"property": hello}
```

### Models_Property_Optional_String_putDefault

- Endpoint: `put /models/properties/optional/string/default`

Expected request body:

```json
{}
```

### Models_Property_Optional_Bytes_getAll

- Endpoint: `get /models/properties/optional/bytes/all`

Expected response body:

```json
{"property": doc}
```

### Models_Property_Optional_Bytes_getDefault

- Endpoint: `get /models/properties/optional/bytes/default`

Expected response body:

```json
{}
```

### Models_Property_Optional_Bytes_putAll

- Endpoint: `put /models/properties/optional/bytes/all`

Expected request body:

```json
{"property": aGVsbG8sIHdvcmxkIQ==}
```

### Models_Property_Optional_Bytes_putDefault

- Endpoint: `put /models/properties/optional/bytes/default`

Expected request body:

```json
{}
```

### Models_Property_Optional_Datetime_getAll

- Endpoint: `get /models/properties/optional/datetime/all`

Expected response body:

```json
{"property": doc}
```

### Models_Property_Optional_Datetime_getDefault

- Endpoint: `get /models/properties/optional/datetime/default`

Expected response body:

```json
{}
```

### Models_Property_Optional_Datetime_putAll

- Endpoint: `put /models/properties/optional/datetime/all`

Expected request body:

```json
{"property": 2022-08-26T18:38:00Z}
```

### Models_Property_Optional_Datetime_putDefault

- Endpoint: `put /models/properties/optional/datetime/default`

Expected request body:

```json
{}
```

### Models_Property_Optional_Duration_getAll

- Endpoint: `get /models/properties/optional/duration/all`

Expected response body:

```json
{"property": doc}
```

### Models_Property_Optional_Duration_getDefault

- Endpoint: `get /models/properties/optional/duration/default`

Expected response body:

```json
{}
```

### Models_Property_Optional_Duration_putAll

- Endpoint: `put /models/properties/optional/duration/all`

Expected request body:

```json
{"property": P123DT22H14M12.011S}
```

### Models_Property_Optional_Duration_putDefault

- Endpoint: `put /models/properties/optional/duration/default`

Expected request body:

```json
{}
```

### Models_Property_Optional_CollectionsByte_getAll

- Endpoint: `get /models/properties/optional/collections/bytes/all`

Expected response body:

```json
{"property": doc}
```

### Models_Property_Optional_CollectionsByte_getDefault

- Endpoint: `get /models/properties/optional/collections/bytes/default`

Expected response body:

```json
{}
```

### Models_Property_Optional_CollectionsByte_putAll

- Endpoint: `put /models/properties/optional/collections/bytes/all`

Expected request body:

```json
{"property": [aGVsbG8sIHdvcmxkIQ==, aGVsbG8sIHdvcmxkIQ==]}
```

### Models_Property_Optional_CollectionsByte_putDefault

- Endpoint: `put /models/properties/optional/collections/bytes/default`

Expected request body:

```json
{}
```

### Models_Property_Optional_CollectionsModel_getAll

- Endpoint: `get /models/properties/optional/collections/model/all`

Expected response body:

```json
{"property": doc}
```

### Models_Property_Optional_CollectionsModel_getDefault

- Endpoint: `get /models/properties/optional/collections/model/default`

Expected response body:

```json
{}
```

### Models_Property_Optional_CollectionsModel_putAll

- Endpoint: `put /models/properties/optional/collections/model/all`

Expected request body:

```json
{ "property": [{ "property": "hello" }, { "property": "world" }] }
```

### Models_Property_Optional_CollectionsModel_putDefault

- Endpoint: `put /models/properties/optional/collections/model/default`

Expected request body:

```json
{}
```

### Models_Property_Optional_RequiredAndOptional_getAll

- Endpoint: `get /models/properties/optional/requiredAndOptional/all`

Expected response body:

```json
{ "optionalProperty": "hello", "requiredProperty": 42 }
```

### Models_Property_Optional_RequiredAndOptional_getRequiredOnly

- Endpoint: `get /models/properties/optional/requiredAndOptional/requiredOnly`

Expected response body:

```json
{ "requiredProperty": 42 }
```

### Models_Property_Optional_RequiredAndOptional_putAll

- Endpoint: `put /models/properties/optional/requiredAndOptional/all`

Expected request body:

```json
{ "optionalProperty": "hello", "requiredProperty": 42 }
```

### Models_Property_Optional_RequiredAndOptional_putRequiredOnly

- Endpoint: `put /models/properties/optional/requiredAndOptional/requiredOnly`

Expected request body:

```json
{ "requiredProperty": 42 }
```

### Models_Property_Types_Boolean_get

- Endpoint: `get /models/properties/types/boolean`

Expected response body:

```json
{ "property": true }
```

### Models_Property_Types_Boolean_put

- Endpoint: `put /models/properties/types/boolean`

Expected input body:

```json
{ "property": true }
```

### Models_Property_Types_String_get

- Endpoint: `get /models/properties/types/string`

Expected response body:

```json
{"property": hello}
```

### Models_Property_Types_String_put

- Endpoint: `put /models/properties/types/string`

Expected input body:

```json
{"property": hello}
```

### Models_Property_Types_Bytes_get

- Endpoint: `get /models/properties/types/bytes`

Expected response body:

```json
{"property": aGVsbG8sIHdvcmxkIQ==}
```

### Models_Property_Types_Bytes_put

- Endpoint: `put /models/properties/types/bytes`

Expected input body:

```json
{"property": aGVsbG8sIHdvcmxkIQ==}
```

### Models_Property_Types_Int_get

- Endpoint: `get /models/properties/types/int`

Expected response body:

```json
{ "property": 42 }
```

### Models_Property_Types_Int_put

- Endpoint: `put /models/properties/types/int`

Expected input body:

```json
{ "property": 42 }
```

### Models_Property_Types_Float_get

- Endpoint: `get /models/properties/types/float`

Expected response body:

```json
{ "property": 42.42 }
```

### Models_Property_Types_Float_put

- Endpoint: `put /models/properties/types/float`

Expected input body:

```json
{ "property": 42.42 }
```

### Models_Property_Types_Datetime_get

- Endpoint: `get /models/properties/types/datetime`

Expected response body:

```json
{"property": 2022-08-26T18:38:00Z}
```

### Models_Property_Types_Datetime_put

- Endpoint: `put /models/properties/types/datetime`

Expected input body:

```json
{"property": 2022-08-26T18:38:00Z}
```

### Models_Property_Types_Duration_get

- Endpoint: `get /models/properties/types/duration`

Expected response body:

```json
{"property": P123DT22H14M12.011S}
```

### Models_Property_Types_Duration_put

- Endpoint: `put /models/properties/types/duration`

Expected input body:

```json
{"property": P123DT22H14M12.011S}
```

### Models_Property_Types_Enum_get

- Endpoint: `get /models/properties/types/enum`

Expected response body:

```json
{"property": ValueOne}
```

### Models_Property_Types_Enum_put

- Endpoint: `put /models/properties/types/enum`

Expected input body:

```json
{"property": ValueOne}
```

### Models_Property_Types_ExtensibleEnum_get

- Endpoint: `get /models/properties/types/extensible-enum`

Expected response body:

```json
{"property": UnknownValue}
```

### Models_Property_Types_ExtensibleEnum_put

- Endpoint: `put /models/properties/types/extensible-enum`

Expected input body:

```json
{"property": UnknownValue}
```

### Models_Property_Types_Model_get

- Endpoint: `get /models/properties/types/model`

Expected response body:

```json
{ "property": { "property": "hello" } }
```

### Models_Property_Types_Model_put

- Endpoint: `put /models/properties/types/model`

Expected input body:

```json
{ "property": { "property": "hello" } }
```

### Models_Property_Types_CollectionsString_get

- Endpoint: `get /models/properties/types/collections/string`

Expected response body:

```json
{ "property": ["hello", "world"] }
```

### Models_Property_Types_CollectionsString_put

- Endpoint: `put /models/properties/types/collections/string`

Expected input body:

```json
{ "property": ["hello", "world"] }
```

### Models_Property_Types_CollectionsInt_get

- Endpoint: `get /models/properties/types/collections/int`

Expected response body:

```json
{ "property": [1, 2] }
```

### Models_Property_Types_CollectionsInt_put

- Endpoint: `put /models/properties/types/collections/int`

Expected input body:

```json
{ "property": [1, 2] }
```

### Models_Property_Types_CollectionsModel_get

- Endpoint: `get /models/properties/types/collections/model`

Expected response body:

```json
{ "property": [{ "property": "hello" }, { "property": "world" }] }
```

### Models_Property_Types_CollectionsModel_put

- Endpoint: `put /models/properties/types/collections/model`

Expected input body:

```json
{ "property": [{ "property": "hello" }, { "property": "world" }] }
```

### Models_Property_Types_DictionaryString_get

- Endpoint: `get /models/properties/types/dictionary/string`

Expected response body:

```json
{ "property": { "k1": "hello", "k2": "world" } }
```

### Models_Property_Types_DictionaryString_put

- Endpoint: `put /models/properties/types/dictionary/string`

Expected input body:

```json
{ "property": { "k1": "hello", "k2": "world" } }
```

### Models_Property_Types_Never_get

- Endpoint: `get /models/properties/types/never`

Expected response body:

```json
{"property": <don't include this property>}
```

### Models_Property_Types_Never_put

- Endpoint: `put /models/properties/types/never`

Expected input body:

```json
{"property": <don't include this property>}
```

### Models_Usage_input

- Endpoint: `get /models/usage/input`

Send a POST request with the following body {requiredProp: "example-value"}

### Models_Usage_output

- Endpoint: `get /models/usage/output`

Send a GET request which return the following body {requiredProp: "example-value"}

### Models_Usage_inputAndOutput

- Endpoint: `get /models/usage/input-output`

Send a POST request which return the following body {requiredProp: "example-value"} and return the same.

### Models_Visibility_Automatic_getModel

- Endpoint: `get /models/visibility/automatic`

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

### Models_Visibility_Automatic_headModel

- Endpoint: `head /models/visibility/automatic`

Generate abd send put model with write/create properties.
Expected input body:

```json
{
  "queryProp": 123
}
```

### Models_Visibility_Automatic_putModel

- Endpoint: `put /models/visibility/automatic`

Generate abd send put model with write/create/update properties.
Expected input body:

```json
{
  "createProp": ["foo", "bar"],
  "updateProp": [1, 2]
}
```

### Models_Visibility_Automatic_patchModel

- Endpoint: `patch /models/visibility/automatic`

Generate abd send put model with write/update properties.
Expected input body:

```json
{
  "updateProp": [1, 2]
}
```

### Models_Visibility_Automatic_postModel

- Endpoint: `post /models/visibility/automatic`

Generate abd send put model with write/create properties.
Expected input body:

```json
{
  "createProp": ["foo", "bar"]
}
```

### Models_Visibility_Automatic_deleteModel

- Endpoint: `delete /models/visibility/automatic`

Generate abd send put model with write/create properties.
Expected input body:

```json
{
  "deleteProp": true
}
```

### Parameters_CollectionFormat_Query_multi

- Endpoint: `get /parameters/collection-format/query/multi`

This test is testing sending a multi collection format array query parameters

### Parameters_CollectionFormat_Query_csv

- Endpoint: `get /parameters/collection-format/query/csv`

This test is testing sending a csv collection format array query parameters

### Parameters_CollectionFormat_Header_csv

- Endpoint: `get /parameters/collection-format/header/csv`

This test is testing sending a csv collection format array header parameters

### ProjectedName_jsonProjection

- Endpoint: `post /projection/json`

CADL name is SDK, Projection is JSON name. Send:

```json
{ "codegen": "DPG" }
```

### ProjectedName_clientProjection

- Endpoint: `post /projection/client`

CADL name is JSON, Projection is client name. Send:

```json
{ "builtfrom": "DPG" }
```

### ProjectedName_languageProjection

- Endpoint: `post /projection/language`

CADL name is JSON, Projection is client name per language override. Send:

```json
{ "wasMadeFor": "customers" }
```

### Resiliency_DevDriven_getModel

- Endpoint: `get /resiliency/devdriven/customization/model/{mode}`

Show that you can support both protocol methods and convenience method for a HTTP GET.
This method requires to write 2 tests.

- Test 1 is a call with "raw" and confirm you can read a JSON `{"received": "raw"}`
- Test 2 varies:
  - With DPG 1.0, write your own model to parse `{"received": "model"}`
  - With DPG 2.0, generate the convenience method to read Product model with "received" to "model"

### Resiliency_DevDriven_postModel

- Endpoint: `post /resiliency/devdriven/customization/model/{mode}`

Show that you can support both protocol methods and convenience method for a HTTP POST.
This method requires to write 2 tests.

- Test 1 is a call with "raw" with body `{"hello": "world!"}` and confirm you can read a JSON `{"received": "raw"}`
- Test 2 varies:
  - With DPG 1.0, write a model Input("world!"), serialize to input write your own model to parse `{"received": "model"}`
  - With DPG 2.0, generate the convenience method to pass Input("world!") and read Product model with "received" to "model"

### Resiliency_DevDriven_getProtocolPages

- Endpoint: `get /resiliency/devdriven/customization/paging/protocol`

Show that you can support protocol methods for a Paging operation.
Call with "protocol" and confirm you can read a JSON `{"received": "protocol"}` on page 2.

### Resiliency_DevDriven_getConveniencePages

- Endpoint: `get /resiliency/devdriven/customization/paging/convenience`

Show that you can support convenience methods for a Paging operation.
This test varies:

- With DPG 1.0, iterate to page 2 and write your own model to parse `{"received": "convenience"}`
- With DPG 2.0, generate the convenience method to read Product model with "received" to "convenience" on page 2

### Resiliency_DevDriven_lro

- Endpoint: `put /resiliency/devdriven/customization/lro/{mode}`

Show that you can support both protocol methods and convenience method for a LRO.
This method requires to write 2 tests.

- Test 1 is a call with "raw" and confirm you can read a JSON `{"received": "raw"}` as final result.
- Test 2 varies:
  - With DPG 1.0, poll to final state and write your own model to parse `{"received": "model"}`
  - With DPG 2.0, generate the convenience method to poll a Product model with "received" to "model"

### Resiliency_ServiceDriven_AddOptionalParams_fromNone

- Endpoint: `head /add-optional-params/from-none`

Need the following two calls:

- Pass in `serviceDeploymentVersion="v2"` and `apiVersion="v1"` with no parameters.
- Pass in `serviceDeploymentVersion="v2"` and `apiVersion="v2"` with query parameter `new-parameter="new"`.

There are three concepts that should be clarified:

1. Client spec version: refers to the spec that the client is generated from. 'v1' is a client generated from srv-driven-1/main.tsp and 'v2' is a client generated from srv-driven-2/main.tsp.
2. Service deployment version: refers to a deployment version of the service. 'v1' represents the initial deployment of the service with a single api version. 'v2' represents the new deployment of a service with multiple api versions
3. Api version: The initial deployment of the service only supports api version 'v1'. The new deployment of the service supports api versions 'v1' and 'v2'.

With the above two calls, we test the following configurations from this service spec:

- A client generated from the second service spec can call the second deployment of a service with api version v1
- A client generated from the second service spec can call the second deployment of a service with api version v2 with the updated changes

Tests that we can grow up an operation from accepting no parameters to accepting an optional input parameter.

### Resiliency_ServiceDriven_AddOptionalParams_fromOneRequired

- Endpoint: `get /add-optional-params/from-one-required`

Need the following two calls:

- Pass in `serviceDeploymentVersion="v2"` and `apiVersion="v1"` with query parameter `parameter="required"`.
- Pass in `serviceDeploymentVersion="v2"` and `apiVersion="v2"` with query parameter `parameter="required"` and query parameter `new-parameter="new"`.

There are three concepts that should be clarified:

1. Client spec version: refers to the spec that the client is generated from. 'v1' is a client generated from srv-driven-1/main.tsp and 'v2' is a client generated from srv-driven-2/main.tsp.
2. Service deployment version: refers to a deployment version of the service. 'v1' represents the initial deployment of the service with a single api version. 'v2' represents the new deployment of a service with multiple api versions
3. Api version: The initial deployment of the service only supports api version 'v1'. The new deployment of the service supports api versions 'v1' and 'v2'.

With the above two calls, we test the following configurations from this service spec:

- A client generated from the second service spec can call the second deployment of a service with api version v1
- A client generated from the second service spec can call the second deployment of a service with api version v2 with the updated changes

Tests that we can grow up an operation from accepting one required parameter to accepting a required parameter and an optional parameter.

### Resiliency_ServiceDriven_AddOptionalParams_fromOneOptional

- Endpoint: `get /add-optional-params/from-one-optional`

Need the following two calls:

- Pass in `serviceDeploymentVersion="v2"` and `apiVersion="v1"` with query parameter `parameter="optional"`.
- Pass in `serviceDeploymentVersion="v2"` and `apiVersion="v2"` with query parameter `parameter="optional"` and query parameter `new-parameter="new"`.

There are three concepts that should be clarified:

1. Client spec version: refers to the spec that the client is generated from. 'v1' is a client generated from srv-driven-1/main.tsp and 'v2' is a client generated from srv-driven-2/main.tsp.
2. Service deployment version: refers to a deployment version of the service. 'v1' represents the initial deployment of the service with a single api version. 'v2' represents the new deployment of a service with multiple api versions
3. Api version: The initial deployment of the service only supports api version 'v1'. The new deployment of the service supports api versions 'v1' and 'v2'.

With the above two calls, we test the following configurations from this service spec:

- A client generated from the second service spec can call the second deployment of a service with api version v1
- A client generated from the second service spec can call the second deployment of a service with api version v2 with the updated changes

Tests that we can grow up an operation from accepting one optional parameter to accepting two optional parameters.

### Resiliency_ServiceDriven_addContentType

- Endpoint: `post /add-content-type`

Show that you can call a POST HTTP endpoint.
This test now accept both image/jpeg and application/json and is expected keeping backward compat with srv-driven-1.
Pass the JSON: `{"url": "http://example.org/myimage.jpeg"}` or a binary with content-type image/jpeg. The server do not check the binary.

### Resiliency_ServiceDriven_addOperation

- Endpoint: `delete /add-operation`

Need the following two calls:

- Call with client spec version "v1" with `serviceDeploymentVersion="v2"` and `apiVersion="v2"`
- Call with client spec version "v2" with `serviceDeploymentVersion="v2"` and `apiVersion="v2"`

There are three concepts that should be clarified:

1. Client spec version: refers to the spec that the client is generated from. 'v1' is a client generated from srv-driven-1/main.tsp and 'v2' is a client generated from srv-driven-2/main.tsp.
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

### Unions_sendInt

- Endpoint: `post /unions/int`

This test is testing sending an int value in simple union property.

```json
{ "simpleUnion": 1 }
```

### Unions_sendIntArray

- Endpoint: `post /unions/int-array`

This test is testing sending an int array value in simple union property.

```json
{ "simpleUnion": [1, 2] }
```

### Unions_sendFirstNamedUnionValue

- Endpoint: `post /unions/model1`

This test is testing sending the first union value in named union property.

```json
{ "namedUnion": { "name": "model1", "prop1": 1 } }
```

### Unions_sendSecondNamedUnionValue

- Endpoint: `post /unions/model2`

This test is testing sending the second union value in named union property.

```json
{ "namedUnion": { "name": "model2", "prop2": 2 } }
```
