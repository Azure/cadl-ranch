# Cadl Ranch Project summary

### MultiInterfaceClient_dogs_getDogs

Illustrate grouping operations on subclient.

### MultiInterfaceClient_dogs_setDogs

Illustrate grouping operations on subclient.

### MultiInterfaceClient_cats_getCats

Illustrate grouping operations on subclient.

### MultiInterfaceClient_cats_setCats

Illustrate grouping operations on subclient.

### ExtensibleEnums_String_getKnownValue

Expect to handle a known value. Mock api will return 'Monday'

### ExtensibleEnums_String_getUnknownValue

Expect to handle a unknown value. Mock api will return 'Weekend'

### ExtensibleEnums_String_putKnownValue

Expect to send a known value. Mock api expect to receive 'Monday'

### ExtensibleEnums_String_putUnknownValue

Expect to handle a unknown value. Mock api expect to receive 'Weekend'

### Hello_world

This test is testing this payload is returned from the server

```json
"hello world"
```

### CollectionPropertiesBasic_sendCollectionModel

Generate and send input model with required collection properties.

### CollectionPropertiesBasic_getCollectionModel

Generate and receive output model with required collection properties.

### CollectionPropertiesBasic_setCollectionModel

Generate, send, and receive round-trip model with required collection properties.

### ModelCollectionProperties_sendCollectionModel

Generate and send input model with model collection properties.

### ModelCollectionProperties_getCollectionModel

Generate and receive output model with model collection properties.

### ModelCollectionProperties_setCollectionModel

Generate, send, and receive round-trip model with model collection properties.

### EnumPropertiesBasic_sendEnumPropertyModel

Generate and send input model with required enum properties.

### EnumPropertiesBasic_getEnumPropertModel

Generate and receive output model with required enum properties.

### EnumPropertiesBasic_setEnumPropertModel

Generate, send, and receive round-trip model with required enum properties.

### BasicPolymorphicModels_setValue

Generate, send, and receive round-trip inherited model.

### BasicPolymorphicModels_setValueWithPolymorphicProperty

Generate, send, and receive round-trip model with a polymorphic property.

### InputBasic_getModel

Generate and send an input-only model with required reference and value type properties.

### NestedModelsBasic_sendNestedModel

Generate and send input model with required nested model properties.

### NestedModelsBasic_getNestedModel

Generate and receive output model with required nested model properties.

### NestedModelsBasic_setNestedModel

Generate, send, and receive round-trip model with required nested model properties.

### OptionalProperties_sendOptionalPropertyModel

Generate and send input model with optional properties.

### OptionalProperties_getOptionalPropertyModel

Generate and receive output model with optional properties.

### OptionalProperties_setOptionalPropertyModel

Generate, send, and receive round-trip model with optional properties.

### OutputBasic_getModel

Generate and receive an output-only model with required reference and value type properties.

### PrimitiveProperties_getModel

Generate/send a round-trip model with basic Cadl primitive type properties.

### ReadonlyProperties_getOptionalPropertyModel

Generate and receive output model with readonly properties.

### ReadonlyProperties_setOptionalPropertyModel

Generate, send, and receive round-trip model with readonly properties.

### RoundTripBasic_getModel

Generate, send, and receive a round-trip model with required reference and value type properties.

### DevDriven_getModel

Show that you can support both protocol methods and convenience method for a HTTP GET.
This method requires to write 2 tests.

- Test 1 is a call with "raw" and confirm you can read a JSON `{"received": "raw"}`
- Test 2 varies:
  - With DPG 1.0, write your own model to parse `{"received": "model"}`
  - With DPG 2.0, generate the convenience method to read Product model with "received" to "model"

### DevDriven_postModel

Show that you can support both protocol methods and convenience method for a HTTP POST.
This method requires to write 2 tests.

- Test 1 is a call with "raw" with body `{"hello": "world!"}` and confirm you can read a JSON `{"received": "raw"}`
- Test 2 varies:
  - With DPG 1.0, write a model Input("world!"), serialize to input write your own model to parse `{"received": "model"}`
  - With DPG 2.0, generate the convenience method to pass Input("world!") and read Product model with "received" to "model"

### DevDriven_getPages

Show that you can support both protocol methods and convenience method for a Paging operation.
This method requires to write 2 tests.

- Test 1 is a call with "raw" and confirm you can read a JSON `{"received": "raw"}` on page 2.
- Test 2 varies:
  - With DPG 1.0, iterate to page 2 and write your own model to parse `{"received": "model"}`
  - With DPG 2.0, generate the convenience method to read Product model with "received" to "model" on page 2

### DevDriven_lro

Show that you can support both protocol methods and convenience method for a LRO.
This method requires to write 2 tests.

- Test 1 is a call with "raw" and confirm you can read a JSON `{"received": "raw"}` as final result.
- Test 2 varies:
  - With DPG 1.0, poll to final state and write your own model to parse `{"received": "model"}`
  - With DPG 2.0, generate the convenience method to poll a Product model with "received" to "model"

### ServiceDriven1_params_headNoParams

Show that you can call a HEAD HTTP endpoint.
This test is expected to grow to a new optional parameter while keeping backward compat in srv-driven-2.

### ServiceDriven1_params_getRequired

Show that you can call a GET HTTP endpoint.
This test is expected to grow to a new optional parameter while keeping backward compat in srv-driven-2.

### ServiceDriven1_params_putRequiredOptional

Show that you can call a PUT HTTP endpoint.
This test is expected to grow to a new optional parameter while keeping backward compat in srv-driven-2.
The value you pass for the parameter is not verified by the mock server.

### ServiceDriven1_params_postParameters

Show that you can call a POST HTTP endpoint.
This test is expected to grow to a new content-type as acceptable input while keeping backward compat in srv-driven-2.
Pass the JSON: `{"url": "http://example.org/myimage.jpeg"}`

### ServiceDriven1_params_getOptional

Show that you can call a GET HTTP endpoint.
This version has his main parameter optional first, making the grow-up story to two optionals.
The value you pass for the parameter is not verified by the mock server.

### ServiceDriven2_params_headNoParams

Show that you can call a HEAD HTTP endpoint.
This test has grow to a new optional parameter, and the generated code should be backward compatible with srv-driven-1.
The value you pass for the parameter is not verified by the mock server.

### ServiceDriven2_params_getRequired

Show that you can call a GET HTTP endpoint.
This test has grow to a new optional parameter, and the generated code should be backward compatible with srv-driven-1.
The value you pass for the parameter is not verified by the mock server.

### ServiceDriven2_params_putRequiredOptional

Show that you can call a PUT HTTP endpoint.
This test has grow to a new optional parameter, and the generated code should be backward compatible with srv-driven-1.
The value you pass for the parameter is not verified by the mock server.

### ServiceDriven2_params_postParameters

Show that you can call a POST HTTP endpoint.
This test now accept both image/jpeg and applicat/json and is expected keeping backward compat with srv-driven-1.
Pass the JSON: `{"url": "http://example.org/myimage.jpeg"}` or a binary with content-type image/jpeg. The server do not check the binary.

### ServiceDriven2_params_deleteParameters

Show that you can support a new method in the same operation group.

### ServiceDriven2_params_getOptional

Show that you can call a GET HTTP endpoint.
This version has his main parameter optional first, making the grow-up story to two optionals.
The value you pass for the parameter is not verified by the mock server.

### ServiceDriven2_params_getNewOperation

Show that you can call a GET HTTP endpoint.
This is a totally new operation in this API version.

### Hello2_world

This test is testing 'hello world' is being returned from the server
