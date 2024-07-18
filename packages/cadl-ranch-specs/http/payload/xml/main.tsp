import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Sends and receives bodies in XML format.")
@scenarioService("/payload/xml")
namespace Payload.Xml;

@doc("Contains fields of primitive types.")
model SimpleModel {
  name: string;
  age: int32;
}

@doc("Contains fields of arrays of primitive types.")
model ModelWithSimpleArrays {
  colors: string[];
  counts: int32[];
}

@doc("Contains an array of models.")
model ModelWithArrayOfModel {
  items: SimpleModel[];
}

@doc("Contains an optional field.")
model ModelWithOptionalField {
  item: string;
  counts?: int32;
}

@scenario
@route("/simpleModel")
@scenarioDoc("""
Returns an instance of SimpleModel.
Expected response body:
```xml
<SimpleModel>
  <Name>foo</Name>
  <Age>123</Age>
</SimpleModel>
```
""")
@get
op getSimpleModel(): {
  @header("content-type") contentType: "application/xml";
  @body body: SimpleModel;
};

@scenario
@route("/simpleModel")
@scenarioDoc("""
Sends an instance of SimpleModel.
Expected request body:
```xml
<SimpleModel>
  <Name>foo</Name>
  <Age>123</Age>
</SimpleModel>
```
""")
@put
op putSimpleModel(@header("content-type") contentType: "application/xml", @body input: SimpleModel): void;

@scenario
@route("/modelWithSimpleArrays")
@scenarioDoc("""
Returns an instance of ModelWithSimpleArrays.
Expected response body:
```xml
<ModelWithSimpleArrays>
  <Colors>red</Colors>
  <Colors>green</Colors>
  <Colors>blue</Colors>
  <Counts>1</Counts>
  <Counts>2</Counts>
</ModelWithSimpleArrays>
```
""")
@get
op getModelWithSimpleArrays(): {
  @header("content-type") contentType: "application/xml";
  @body body: ModelWithSimpleArrays;
};

@scenario
@route("/modelWithSimpleArrays")
@scenarioDoc("""
Sends an instance of ModelWithSimpleArrays.
Expected request body:
```xml
<ModelWithSimpleArrays>
  <Colors>red</Colors>
  <Colors>green</Colors>
  <Colors>blue</Colors>
  <Counts>1</Counts>
  <Counts>2</Counts>
</ModelWithSimpleArrays>
```
""")
@put
op putModelWithSimpleArrays(
  @header("content-type") contentType: "application/xml",
  @body input: ModelWithSimpleArrays,
): void;

@scenario
@route("/modelWithArrayOfModel")
@scenarioDoc("""
Returns an instance of ModelWithArrayOfModel.
Expected response body:
```xml
<ModelWithArrayOfModel>
  <SimpleModel>
    <Name>foo</Name>
    <Age>123</Age>
  </SimpleModel>
  <SimpleModel>
    <Name>bar</Name>
    <Age>456</Age>
  </SimpleModel>
</ModelWithArrayOfModel>
```
""")
@get
op getModelWithArrayOfModel(): {
  @header("content-type") contentType: "application/xml";
  @body body: ModelWithArrayOfModel;
};

@scenario
@route("/modelWithArrayOfModel")
@scenarioDoc("""
Sends an instance of ModelWithArrayOfModel.
Expected request body:
```xml
<ModelWithArrayOfModel>
  <SimpleModel>
    <Name>foo</Name>
    <Age>123</Age>
  </SimpleModel>
  <SimpleModel>
    <Name>bar</Name>
    <Age>456</Age>
  </SimpleModel>
</ModelWithArrayOfModel>
```
""")
@put
op putModelWithArrayOfModel(
  @header("content-type") contentType: "application/xml",
  @body input: ModelWithArrayOfModel,
): void;

@scenario
@route("/modelWithOptionalField")
@scenarioDoc("""
Returns an instance of ModelWithOptionalField.
Expected response body:
```xml
<ModelWithOptionalField>
  <Item>widget</Item>
  <Counts />
</ModelWithOptionalField>
```
""")
@get
op getModelWithOptionalField(): {
  @header("content-type") contentType: "application/xml";
  @body body: ModelWithOptionalField;
};

@scenario
@route("/modelWithOptionalField")
@scenarioDoc("""
Sends an instance of ModelWithOptionalField.
Expected request body:
```xml
<ModelWithOptionalField>
  <Item>widget</Item>
  <Counts />
</ModelWithOptionalField>
```
""")
@put
op putModelWithOptionalField(
  @header("content-type") contentType: "application/xml",
  @body input: ModelWithOptionalField,
): void;
