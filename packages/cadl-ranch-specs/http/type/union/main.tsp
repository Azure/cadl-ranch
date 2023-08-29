import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

@doc("Test for type of union.")
@supportedBy("dpg")
@scenarioService("/type/union")
namespace Type.Union;

@doc("This is a base model.")
model BaseModel {
  name: string;
}

@doc("The first one of the unioned model type.")
model Model1 extends BaseModel {
  prop1: int32;
}

@doc("The second one of the unioned model type.")
model Model2 extends BaseModel {
  prop2: int32;
}

union MyNamedUnion {
  one: Model1,
  two: Model2,
}

model ModelWithSimpleUnionProperty {
  simpleUnion: int32 | int32[];
}

model ModelWithNamedUnionProperty {
  namedUnion: MyNamedUnion;
}

model ModelWithSimpleUnionPropertyInResponse {
  simpleUnion: string | int32[];
}

model ModelWithNamedUnionPropertyInResponse {
  namedUnion: MyNamedUnion;
}

@scenario
@scenarioDoc("""
This test is testing sending an int value in simple union property.
```json
{ "simpleUnion": 1 }
```
""")
@route("/int")
@post
op sendInt(@body input: ModelWithSimpleUnionProperty): OkResponse;

@scenario
@scenarioDoc("""
This test is testing sending an int array value in simple union property.
```json
{ "simpleUnion": [1, 2] }
```
""")
@route("/int-array")
@post
op sendIntArray(@body input: ModelWithSimpleUnionProperty): OkResponse;

@scenario
@scenarioDoc("""
This test is testing sending the first union value in named union property.
```json
{ "namedUnion": { "name": "model1", "prop1": 1 } }
```
""")
@route("/model1")
@post
op sendFirstNamedUnionValue(@body input: ModelWithNamedUnionProperty): OkResponse;

@scenario
@scenarioDoc("""
This test is testing sending the second union value in named union property.
```json
{ "namedUnion": { "name": "model2", "prop2": 2 } }
```
""")
@route("/model2")
@post
op sendSecondNamedUnionValue(@body input: ModelWithNamedUnionProperty): OkResponse;

@scenario
@scenarioDoc("""
This test is testing receiving a string value in simple union property.

Expect response:
```json
{ "simpleUnion": "string" }
```
""")
@route("/receive/string")
@get
op receiveString(): ModelWithSimpleUnionPropertyInResponse;

@scenario
@scenarioDoc("""
This test is testing receiving an int array value in simple union property.

Expect response:
```json
{ "simpleUnion": [1, 2] }
```
""")
@route("/receive/int-array")
@get
op receiveIntArray(): ModelWithSimpleUnionPropertyInResponse;

@scenario
@scenarioDoc("""
This test is testing receiving the first union value in named union property.

Expect response:
```json
{ "namedUnion": { "name": "model1", "prop1": 1 } }
```
""")
@route("/receive/model1")
@get
op receiveFirstNamedUnionValue(): ModelWithNamedUnionPropertyInResponse;

@scenario
@scenarioDoc("""
This test is testing receiving the second union value in named union property.

Expect response:
```json
{ "namedUnion": { "name": "model2", "prop2": 2 } }
```
""")
@route("/receive/model2")
@get
op receiveSecondNamedUnionValue(): ModelWithNamedUnionPropertyInResponse;
