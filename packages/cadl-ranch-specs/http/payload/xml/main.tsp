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
  value?: int32;
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
interface SimpleModelValue
  extends XmlOperations<SimpleModel, """
  <SimpleModel>
    <name>foo</name>
    <age>123</age>
  </SimpleModel>
  """> {}

@doc("Operations for the ModelWithSimpleArrays type.")
@route("/modelWithSimpleArrays")
interface ModelWithSimpleArraysValue
  extends XmlOperations<
      ModelWithSimpleArrays,
      """
  <ModelWithSimpleArrays>
    <colors>
      <string>red</string>
      <string>green</string>
      <string>blue</string>
    </colors>
    <counts>
      <int32>1</int32>
      <int32>2</int32>
    </counts>
  </ModelWithSimpleArrays>
  """
    > {}

@doc("Operations for the ModelWithArrayOfModel type.")
@route("/modelWithArrayOfModel")
interface ModelWithArrayOfModelValue
  extends XmlOperations<
      ModelWithArrayOfModel,
      """
  <ModelWithArrayOfModel>
    <items>
      <SimpleModel>
        <name>foo</name>
        <age>123</age>
      </SimpleModel>
      <SimpleModel>
        <name>bar</name>
        <age>456</age>
      </SimpleModel>
    </items>
  </ModelWithArrayOfModel>
  """
    > {}

@doc("Operations for the ModelWithOptionalField type.")
@route("/modelWithOptionalField")
interface ModelWithOptionalFieldValue
  extends XmlOperations<
      ModelWithOptionalField,
      """
  <ModelWithOptionalField>
    <item>widget</item>
  </ModelWithOptionalField>
  """
    > {}
