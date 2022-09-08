# Cadl Ranch Project summary

### ApiKeyAuthentication_authenticated

- Endpoint: `get /authentication/api-key/authenticated`

Expect to handle an authenticated call. Mock api expect to receive header 'x-ms-api-key: valid-key'.

### ApiKeyAuthentication_invalidAuthentication

- Endpoint: `get /authentication/api-key/invalid-authentication`

Expect to handle an unauthenticated call. Mock api will always respond with status code 403.

### MultiInterfaceClient_dogs_getDogs

- Endpoint: `get /multi-interface/dogs`

Illustrate grouping operations on subclient.

### MultiInterfaceClient_dogs_setDogs

- Endpoint: `put /multi-interface/dogs/models`

Illustrate grouping operations on subclient.

### MultiInterfaceClient_cats_getCats

- Endpoint: `get /multi-interface/cats`

Illustrate grouping operations on subclient.

### MultiInterfaceClient_cats_setCats

- Endpoint: `put /multi-interface/cats`

Illustrate grouping operations on subclient.

### ExtensibleEnums_String_getKnownValue

- Endpoint: `get /extensible-enums/string/known-value`

Expect to handle a known value. Mock api will return 'Monday'

### ExtensibleEnums_String_getUnknownValue

- Endpoint: `get /extensible-enums/string/unknown-value`

Expect to handle a unknown value. Mock api will return 'Weekend'

### ExtensibleEnums_String_putKnownValue

- Endpoint: `put /extensible-enums/string/known-value`

Expect to send a known value. Mock api expect to receive 'Monday'

### ExtensibleEnums_String_putUnknownValue

- Endpoint: `put /extensible-enums/string/unknown-value`

Expect to handle a unknown value. Mock api expect to receive 'Weekend'

### Hello_world

- Endpoint: `get /hello/world`

This test is testing this payload is returned from the server

```json
"hello world"
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

### Models_Inheritance_getPolymorphicModel

- Endpoint: `get /models/inheritance/polymorphism/valid`

Generate and receive polymorphic model in multiple levels inheritance with 2 discriminators.
Expected response body:

```json
{ "age": 1, "kind": "shark", "sharktype": "goblin" }
```

### Models_Inheritance_putPolymorphicModel

- Endpoint: `put /models/inheritance/polymorphism/valid`

Generate and send polymorphic model in multiple levels inheritance with 2 discriminators.
Expected input body:

```json
{ "age": 1, "kind": "shark", "sharktype": "goblin" }
```

### Models_Inheritance_setPolymorphismRecursively

- Endpoint: `put /models/inheritance/polymorphism/recursive`

Generate, send, and receive round-trip models has collection and dictionary properties referring to models in three levels inheritance with 2 discriminator.
Expected input and response body:

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

### Models_Inheritance_getPolymorphismMissingDiscriminator

- Endpoint: `get /models/inheritance/polymorphism/missingdiscriminator`

Get a model omitting the discriminator.

### InputBasic_getModel

- Endpoint: `get /input-basic/models`

Generate and send an input-only model with required reference and value type properties.

### NestedModelsBasic_sendNestedModel

- Endpoint: `post /nested-models/models`

Generate and send input model with required nested model properties.

### NestedModelsBasic_getNestedModel

- Endpoint: `get /nested-models/models`

Generate and receive output model with required nested model properties.

### NestedModelsBasic_setNestedModel

- Endpoint: `put /nested-models/models`

Generate, send, and receive round-trip model with required nested model properties.

### OutputBasic_getModel

- Endpoint: `get /output-basic/models`

Generate and receive an output-only model with required reference and value type properties.

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
hello
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
aGVsbG8sIHdvcmxkIQ==
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
2022-08-26T18:38:00Z
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
P123DT22H14M12.011S
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
[aGVsbG8sIHdvcmxkIQ==, aGVsbG8sIHdvcmxkIQ==]
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
[{ "property": "hello" }, { "property": "world" }]
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

### Models_Property_Types_DictionaryInt_get

- Endpoint: `get /models/properties/types/dictionary/int`

Expected response body:

```json
{ "property": { "k1": 1, "k2": 2 } }
```

### Models_Property_Types_DictionaryInt_put

- Endpoint: `put /models/properties/types/dictionary/int`

Expected input body:

```json
{ "property": { "k1": 1, "k2": 2 } }
```

### Models_Property_Types_DictionaryModel_get

- Endpoint: `get /models/properties/types/dictionary/model`

Expected response body:

```json
{ "property": { "k1": { "property": "hello" }, "k2": { "property": "world" } } }
```

### Models_Property_Types_DictionaryModel_put

- Endpoint: `put /models/properties/types/dictionary/model`

Expected input body:

```json
{ "property": { "k1": { "property": "hello" }, "k2": { "property": "world" } } }
```

### ReadonlyProperties_getOptionalPropertyModel

- Endpoint: `get /readonly-properties/models`

Generate and receive output model with readonly properties.

### ReadonlyProperties_setOptionalPropertyModel

- Endpoint: `put /readonly-properties/models`

Generate, send, and receive round-trip model with readonly properties.

### RoundTripBasic_getModel

- Endpoint: `get /roundtrip-basic/models`

Generate, send, and receive a round-trip model with required reference and value type properties.

### Resiliency_DevDriven_getModel

- Endpoint: `get /resilency/devdriven/customization/model/{mode}`

Show that you can support both protocol methods and convenience method for a HTTP GET.
This method requires to write 2 tests.

- Test 1 is a call with "raw" and confirm you can read a JSON `{"received": "raw"}`
- Test 2 varies:
  - With DPG 1.0, write your own model to parse `{"received": "model"}`
  - With DPG 2.0, generate the convenience method to read Product model with "received" to "model"

### Resiliency_DevDriven_postModel

- Endpoint: `post /resilency/devdriven/customization/model/{mode}`

Show that you can support both protocol methods and convenience method for a HTTP POST.
This method requires to write 2 tests.

- Test 1 is a call with "raw" with body `{"hello": "world!"}` and confirm you can read a JSON `{"received": "raw"}`
- Test 2 varies:
  - With DPG 1.0, write a model Input("world!"), serialize to input write your own model to parse `{"received": "model"}`
  - With DPG 2.0, generate the convenience method to pass Input("world!") and read Product model with "received" to "model"

### Resiliency_DevDriven_getPages

- Endpoint: `get /resilency/devdriven/customization/paging/{mode}`

Show that you can support both protocol methods and convenience method for a Paging operation.
This method requires to write 2 tests.

- Test 1 is a call with "raw" and confirm you can read a JSON `{"received": "raw"}` on page 2.
- Test 2 varies:
  - With DPG 1.0, iterate to page 2 and write your own model to parse `{"received": "model"}`
  - With DPG 2.0, generate the convenience method to read Product model with "received" to "model" on page 2

### Resiliency_DevDriven_lro

- Endpoint: `put /resilency/devdriven/customization/lro/{mode}`

Show that you can support both protocol methods and convenience method for a LRO.
This method requires to write 2 tests.

- Test 1 is a call with "raw" and confirm you can read a JSON `{"received": "raw"}` as final result.
- Test 2 varies:
  - With DPG 1.0, poll to final state and write your own model to parse `{"received": "model"}`
  - With DPG 2.0, generate the convenience method to poll a Product model with "received" to "model"

### Resiliency_ServiceDriven1_params_headNoParams

- Endpoint: `head /resilency/servicedriven1/parameters`

Show that you can call a HEAD HTTP endpoint.
This test is expected to grow to a new optional parameter while keeping backward compat in srv-driven-2.

### Resiliency_ServiceDriven1_params_getRequired

- Endpoint: `get /resilency/servicedriven1/parameters`

Show that you can call a GET HTTP endpoint.
This test is expected to grow to a new optional parameter while keeping backward compat in srv-driven-2.

### Resiliency_ServiceDriven1_params_putRequiredOptional

- Endpoint: `put /resilency/servicedriven1/parameters`

Show that you can call a PUT HTTP endpoint.
This test is expected to grow to a new optional parameter while keeping backward compat in srv-driven-2.
The value you pass for the parameter is not verified by the mock server.

### Resiliency_ServiceDriven1_params_postParameters

- Endpoint: `post /resilency/servicedriven1/parameters/{contentTypePath}`

Show that you can call a POST HTTP endpoint.
This test is expected to grow to a new content-type as acceptable input while keeping backward compat in srv-driven-2.
Pass the JSON: `{"url": "http://example.org/myimage.jpeg"}`

### Resiliency_ServiceDriven1_params_getOptional

- Endpoint: `get /resilency/servicedriven1/moreParameters`

Show that you can call a GET HTTP endpoint.
This version has his main parameter optional first, making the grow-up story to two optionals.
The value you pass for the parameter is not verified by the mock server.

### Resiliency_ServiceDriven2_params_headNoParams

- Endpoint: `head /serviceDriven2/serviceDriven/parameters`

Show that you can call a HEAD HTTP endpoint.
This test has grow to a new optional parameter, and the generated code should be backward compatible with srv-driven-1.
The value you pass for the parameter is not verified by the mock server.

### Resiliency_ServiceDriven2_params_getRequired

- Endpoint: `get /serviceDriven2/serviceDriven/parameters`

Show that you can call a GET HTTP endpoint.
This test has grow to a new optional parameter, and the generated code should be backward compatible with srv-driven-1.
The value you pass for the parameter is not verified by the mock server.

### Resiliency_ServiceDriven2_params_putRequiredOptional

- Endpoint: `put /serviceDriven2/serviceDriven/parameters`

Show that you can call a PUT HTTP endpoint.
This test has grow to a new optional parameter, and the generated code should be backward compatible with srv-driven-1.
The value you pass for the parameter is not verified by the mock server.

### Resiliency_ServiceDriven2_params_postParameters

- Endpoint: `post /serviceDriven2/serviceDriven/parameters/{contentTypePath}`

Show that you can call a POST HTTP endpoint.
This test now accept both image/jpeg and applicat/json and is expected keeping backward compat with srv-driven-1.
Pass the JSON: `{"url": "http://example.org/myimage.jpeg"}` or a binary with content-type image/jpeg. The server do not check the binary.

### Resiliency_ServiceDriven2_params_deleteParameters

- Endpoint: `delete /serviceDriven2/serviceDriven/parameters`

Show that you can support a new method in the same operation group.

### Resiliency_ServiceDriven2_params_getOptional

- Endpoint: `get /serviceDriven2/serviceDriven/moreParameters`

Show that you can call a GET HTTP endpoint.
This version has his main parameter optional first, making the grow-up story to two optionals.
The value you pass for the parameter is not verified by the mock server.

### Resiliency_ServiceDriven2_params_getNewOperation

- Endpoint: `get /serviceDriven2/serviceDriven/newPath`

Show that you can call a GET HTTP endpoint.
This is a totally new operation in this API version.
