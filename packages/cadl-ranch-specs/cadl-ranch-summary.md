# Cadl Ranch Project summary

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

### CollectionPropertiesBasic_sendCollectionModel

- Endpoint: `post /collection-properties-basic/models`

Generate and send input model with required collection properties.

### CollectionPropertiesBasic_getCollectionModel

- Endpoint: `get /collection-properties-basic/models`

Generate and receive output model with required collection properties.

### CollectionPropertiesBasic_setCollectionModel

- Endpoint: `put /collection-properties-basic/models`

Generate, send, and receive round-trip model with required collection properties.

### ModelCollectionProperties_sendCollectionModel

- Endpoint: `post /collection-models/models`

Generate and send input model with model collection properties.

### ModelCollectionProperties_getCollectionModel

- Endpoint: `get /collection-models/models`

Generate and receive output model with model collection properties.

### ModelCollectionProperties_setCollectionModel

- Endpoint: `put /collection-models/models`

Generate, send, and receive round-trip model with model collection properties.

### EnumPropertiesBasic_sendEnumPropertyModel

- Endpoint: `post /enum-properties-basic/models`

Generate and send input model with required enum properties.

### EnumPropertiesBasic_getEnumPropertModel

- Endpoint: `get /enum-properties-basic/models`

Generate and receive output model with required enum properties.

### EnumPropertiesBasic_setEnumPropertModel

- Endpoint: `put /enum-properties-basic/models`

Generate, send, and receive round-trip model with required enum properties.

### BasicPolymorphicModels_setValue

- Endpoint: `put /polymorphic/model`

Generate, send, and receive round-trip inherited model.

### BasicPolymorphicModels_setValueWithPolymorphicProperty

- Endpoint: `put /polymorphic/property`

Generate, send, and receive round-trip model with a polymorphic property.

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

### OptionalProperties_sendOptionalPropertyModel

- Endpoint: `post /optional-properties/models`

Generate and send input model with optional properties.

### OptionalProperties_getOptionalPropertyModel

- Endpoint: `get /optional-properties/models`

Generate and receive output model with optional properties.

### OptionalProperties_setOptionalPropertyModel

- Endpoint: `put /optional-properties/models`

Generate, send, and receive round-trip model with optional properties.

### OutputBasic_getModel

- Endpoint: `get /output-basic/models`

Generate and receive an output-only model with required reference and value type properties.

### PrimitiveProperties_getModel

- Endpoint: `get /primitive-properties/models`

Generate/send a round-trip model with basic Cadl primitive type properties.

### ReadonlyProperties_getOptionalPropertyModel

- Endpoint: `get /readonly-properties/models`

Generate and receive output model with readonly properties.

### ReadonlyProperties_setOptionalPropertyModel

- Endpoint: `put /readonly-properties/models`

Generate, send, and receive round-trip model with readonly properties.

### RoundTripBasic_getModel

- Endpoint: `get /roundtrip-basic/models`

Generate, send, and receive a round-trip model with required reference and value type properties.

### DevDriven_getModel

- Endpoint: `get /resilency/devdriven/customization/model/{mode}`

Show that you can support both protocol methods and convenience method for a HTTP GET.
This method requires to write 2 tests.

- Test 1 is a call with "raw" and confirm you can read a JSON `{"received": "raw"}`
- Test 2 varies:
  - With DPG 1.0, write your own model to parse `{"received": "model"}`
  - With DPG 2.0, generate the convenience method to read Product model with "received" to "model"

### DevDriven_postModel

- Endpoint: `post /resilency/devdriven/customization/model/{mode}`

Show that you can support both protocol methods and convenience method for a HTTP POST.
This method requires to write 2 tests.

- Test 1 is a call with "raw" with body `{"hello": "world!"}` and confirm you can read a JSON `{"received": "raw"}`
- Test 2 varies:
  - With DPG 1.0, write a model Input("world!"), serialize to input write your own model to parse `{"received": "model"}`
  - With DPG 2.0, generate the convenience method to pass Input("world!") and read Product model with "received" to "model"

### DevDriven_getPages

- Endpoint: `get /resilency/devdriven/customization/paging/{mode}`

Show that you can support both protocol methods and convenience method for a Paging operation.
This method requires to write 2 tests.

- Test 1 is a call with "raw" and confirm you can read a JSON `{"received": "raw"}` on page 2.
- Test 2 varies:
  - With DPG 1.0, iterate to page 2 and write your own model to parse `{"received": "model"}`
  - With DPG 2.0, generate the convenience method to read Product model with "received" to "model" on page 2

### DevDriven_lro

- Endpoint: `put /resilency/devdriven/customization/lro/{mode}`

Show that you can support both protocol methods and convenience method for a LRO.
This method requires to write 2 tests.

- Test 1 is a call with "raw" and confirm you can read a JSON `{"received": "raw"}` as final result.
- Test 2 varies:
  - With DPG 1.0, poll to final state and write your own model to parse `{"received": "model"}`
  - With DPG 2.0, generate the convenience method to poll a Product model with "received" to "model"

### ServiceDriven1_params_headNoParams

- Endpoint: `head /resilency/servicedriven1/parameters`

Show that you can call a HEAD HTTP endpoint.
This test is expected to grow to a new optional parameter while keeping backward compat in srv-driven-2.

### ServiceDriven1_params_getRequired

- Endpoint: `get /resilency/servicedriven1/parameters`

Show that you can call a GET HTTP endpoint.
This test is expected to grow to a new optional parameter while keeping backward compat in srv-driven-2.

### ServiceDriven1_params_putRequiredOptional

- Endpoint: `put /resilency/servicedriven1/parameters`

Show that you can call a PUT HTTP endpoint.
This test is expected to grow to a new optional parameter while keeping backward compat in srv-driven-2.
The value you pass for the parameter is not verified by the mock server.

### ServiceDriven1_params_postParameters

- Endpoint: `post /resilency/servicedriven1/parameters/{contentTypePath}`

Show that you can call a POST HTTP endpoint.
This test is expected to grow to a new content-type as acceptable input while keeping backward compat in srv-driven-2.
Pass the JSON: `{"url": "http://example.org/myimage.jpeg"}`

### ServiceDriven1_params_getOptional

- Endpoint: `get /resilency/servicedriven1/moreParameters`

Show that you can call a GET HTTP endpoint.
This version has his main parameter optional first, making the grow-up story to two optionals.
The value you pass for the parameter is not verified by the mock server.

### ServiceDriven2_params_headNoParams

- Endpoint: `head /serviceDriven2/serviceDriven/parameters`

Show that you can call a HEAD HTTP endpoint.
This test has grow to a new optional parameter, and the generated code should be backward compatible with srv-driven-1.
The value you pass for the parameter is not verified by the mock server.

### ServiceDriven2_params_getRequired

- Endpoint: `get /serviceDriven2/serviceDriven/parameters`

Show that you can call a GET HTTP endpoint.
This test has grow to a new optional parameter, and the generated code should be backward compatible with srv-driven-1.
The value you pass for the parameter is not verified by the mock server.

### ServiceDriven2_params_putRequiredOptional

- Endpoint: `put /serviceDriven2/serviceDriven/parameters`

Show that you can call a PUT HTTP endpoint.
This test has grow to a new optional parameter, and the generated code should be backward compatible with srv-driven-1.
The value you pass for the parameter is not verified by the mock server.

### ServiceDriven2_params_postParameters

- Endpoint: `post /serviceDriven2/serviceDriven/parameters/{contentTypePath}`

Show that you can call a POST HTTP endpoint.
This test now accept both image/jpeg and applicat/json and is expected keeping backward compat with srv-driven-1.
Pass the JSON: `{"url": "http://example.org/myimage.jpeg"}` or a binary with content-type image/jpeg. The server do not check the binary.

### ServiceDriven2_params_deleteParameters

- Endpoint: `delete /serviceDriven2/serviceDriven/parameters`

Show that you can support a new method in the same operation group.

### ServiceDriven2_params_getOptional

- Endpoint: `get /serviceDriven2/serviceDriven/moreParameters`

Show that you can call a GET HTTP endpoint.
This version has his main parameter optional first, making the grow-up story to two optionals.
The value you pass for the parameter is not verified by the mock server.

### ServiceDriven2_params_getNewOperation

- Endpoint: `get /serviceDriven2/serviceDriven/newPath`

Show that you can call a GET HTTP endpoint.
This is a totally new operation in this API version.

### Hello2_world

- Endpoint: `get /hello2/world`

This test is testing 'hello world' is being returned from the server
