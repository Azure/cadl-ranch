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

@doc("Template for XML operations")
interface XmlOperations<TModel, TDoc extends string> {
  @scenario
  @scenarioDoc(
    """
  Expected response body:
  ```xml
  {doc}
  ```
  """,
    {
      doc: TDoc,
    }
  )
  @get
  get(): {
    @header("content-type") contentType: "application/xml";
    @body body: TModel;
  };

  @scenario
  @scenarioDoc(
    """
  Expected request body:
  ```xml
  {doc}
  ```
  """,
    {
      doc: TDoc,
    }
  )
  @put
  put(@header("content-type") contentType: "application/xml", @body input: TModel): void;
}

@doc("Operations for the SimpleModel type.")
@route("/simpleModel")
interface SimpleModelValue extends XmlOperations<
  SimpleModel,
  """
  <SimpleModel>
    <Name>foo</Name>
    <Age>123</Age>
  </SimpleModel>
  """
  > {}

@doc("Operations for the ModelWithSimpleArrays type.")
@route("/modelWithSimpleArrays")
interface ModelWithSimpleArraysValue extends XmlOperations<
  ModelWithSimpleArrays,
  """
  <ModelWithSimpleArrays>
    <Colors>red</Colors>
    <Colors>green</Colors>
    <Colors>blue</Colors>
    <Counts>1</Counts>
    <Counts>2</Counts>
  </ModelWithSimpleArrays>
  """
  > {}


@doc("Operations for the ModelWithArrayOfModel type.")
@route("/modelWithArrayOfModel")
interface ModelWithArrayOfModelValue extends XmlOperations<
  ModelWithArrayOfModel,
  """
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
  """
  > {}

@doc("Operations for the ModelWithOptionalField type.")
@route("/modelWithOptionalField")
interface ModelWithOptionalFieldValue extends XmlOperations<
  ModelWithOptionalField,
  """
  <ModelWithOptionalField>
    <Item>widget</Item>
    <Counts />
  </ModelWithOptionalField>
  """
  > {}
