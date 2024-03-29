import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";
import "@azure-tools/typespec-azure-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Tests for additional properties of models")
@scenarioService("/type/property/additionalProperties")
namespace Type.Property.AdditionalProperties;

@doc("Template to have models operations")
interface ModelOperations<TModel, TDoc extends string> {
  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc(
    """
  Expected response body:
  ```json
  {doc}
  ```
  """,
    {
      doc: TDoc,
    }
  )
  @get
  @doc("Get call")
  get(): TModel;

  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  #suppress "@azure-tools/typespec-azure-core/bad-record-type" "For testing"
  @scenario
  @scenarioDoc(
    """
  Expected input body:
  ```json
  {doc}
  ```
  """,
    {
      doc: TDoc,
    }
  )
  @put
  @doc("Put operation")
  put(@body @doc("body") body: TModel): void;
}

// ********************************************** Record<unknown> **********************************************
#suppress "@azure-tools/typespec-azure-core/bad-record-type" "For testing"
@doc("The model extends from Record<unknown> type.")
model ExtendsUnknownAdditionalProperties extends Record<unknown> {
  @doc("The name property")
  name: string;
}

@route("/extendsRecordUnknown")
@operationGroup
interface ExtendsUnknown
  extends ModelOperations<
      ExtendsUnknownAdditionalProperties,
      "{'name': 'ExtendsUnknownAdditionalProperties', 'prop1': 32, 'prop2': true, 'prop3': 'abc'}"
    > {}

@doc("The model extends from a type that extends from Record<unknown>.")
model ExtendsUnknownAdditionalPropertiesDerived extends ExtendsUnknownAdditionalProperties {
  @doc("The index property")
  index: int32;

  @doc("The age property")
  age?: float32;
}

@route("/extendsRecordUnknownDerived")
@operationGroup
interface ExtendsUnknownDerived
  extends ModelOperations<
      ExtendsUnknownAdditionalPropertiesDerived,
      "{'name': 'ExtendsUnknownAdditionalProperties', 'index': 314, 'age': 2.71828, 'prop1': 32, 'prop2': true, 'prop3': 'abc'}"
    > {}

@doc("The model extends from Record<unknown> with a discriminator.")
@discriminator("kind")
model ExtendsUnknownAdditionalPropertiesDiscriminated extends Record<unknown> {
  @doc("The name property")
  name: string;

  @doc("The discriminator")
  kind: string;
}

@doc("The derived discriminated type")
model ExtendsUnknownAdditionalPropertiesDiscriminatedDerived extends ExtendsUnknownAdditionalPropertiesDiscriminated {
  kind: "derived";

  @doc("The index property")
  index: int32;

  @doc("The age property")
  age?: float32;
}

@route("/extendsUnknownDiscriminated")
@operationGroup
interface ExtendsUnknownDiscriminated
  extends ModelOperations<
      ExtendsUnknownAdditionalPropertiesDiscriminated,
      "{'kind': 'derived', 'name': 'Derived', 'index': 314, 'age': 2.71828, 'prop1': 32, 'prop2': true, 'prop3': 'abc'}"
    > {}

#suppress "@azure-tools/typespec-azure-core/bad-record-type" "For testing"
@doc("The model is from Record<unknown> type.")
model IsUnknownAdditionalProperties is Record<unknown> {
  @doc("The name property")
  name: string;
}

@route("/isRecordUnknown")
@operationGroup
interface IsUnknown
  extends ModelOperations<
      IsUnknownAdditionalProperties,
      "{'name': 'IsUnknownAdditionalProperties', 'prop1': 32, 'prop2': true, 'prop3': 'abc'}"
    > {}

@doc("The model extends from a type that is Record<unknown> type")
model IsUnknownAdditionalPropertiesDerived extends IsUnknownAdditionalProperties {
  @doc("The index property")
  index: int32;

  @doc("The age property")
  age?: float32;
}

@route("/isRecordUnknownDerived")
@operationGroup
interface IsUnknownDerived
  extends ModelOperations<
      IsUnknownAdditionalPropertiesDerived,
      "{'name': 'IsUnknownAdditionalProperties', 'index': 314, 'age': 2.71828, 'prop1': 32, 'prop2': true, 'prop3': 'abc'}"
    > {}

@doc("The model is Record<unknown> with a discriminator.")
@discriminator("kind")
model IsUnknownAdditionalPropertiesDiscriminated is Record<unknown> {
  @doc("The name property")
  name: string;

  @doc("The discriminator")
  kind: string;
}

@doc("The derived discriminated type")
model IsUnknownAdditionalPropertiesDiscriminatedDerived extends IsUnknownAdditionalPropertiesDiscriminated {
  kind: "derived";

  @doc("The index property")
  index: int32;

  @doc("The age property")
  age?: float32;
}

@route("/isUnknownDiscriminated")
@operationGroup
interface IsUnknownDiscriminated
  extends ModelOperations<
      IsUnknownAdditionalPropertiesDiscriminated,
      "{'kind': 'derived', 'name': 'Derived', 'index': 314, 'age': 2.71828, 'prop1': 32, 'prop2': true, 'prop3': 'abc'}"
    > {}

// ********************************************** Record<string> **********************************************
#suppress "@azure-tools/typespec-azure-core/bad-record-type" "For testing"
@doc("The model extends from Record<string> type.")
model ExtendsStringAdditionalProperties extends Record<string> {
  @doc("The name property")
  name: string;
}

@route("/extendsRecordString")
@operationGroup
interface ExtendsString
  extends ModelOperations<
      ExtendsStringAdditionalProperties,
      "{'name': 'ExtendsStringAdditionalProperties', 'prop': 'abc'}"
    > {}

#suppress "@azure-tools/typespec-azure-core/bad-record-type" "For testing"
@doc("The model is from Record<string> type.")
model IsStringAdditionalProperties is Record<string> {
  @doc("The name property")
  name: string;
}

@route("/isRecordstring")
@operationGroup
interface IsString
  extends ModelOperations<IsStringAdditionalProperties, "{'name': 'IsStringAdditionalProperties', 'prop': 'abc'}"> {}

// ********************************************** Record<float32> **********************************************
#suppress "@azure-tools/typespec-azure-core/bad-record-type" "For testing"
@doc("The model extends from Record<float32> type.")
model ExtendsFloatAdditionalProperties extends Record<float32> {
  @doc("The id property")
  id: float32;
}

@route("/extendsRecordFloat")
@operationGroup
interface ExtendsFloat extends ModelOperations<ExtendsFloatAdditionalProperties, "{'id': 43.125, 'prop': 43.125}"> {}

#suppress "@azure-tools/typespec-azure-core/bad-record-type" "For testing"
@doc("The model is from Record<float32> type.")
model IsFloatAdditionalProperties is Record<float32> {
  @doc("The id property")
  id: float32;
}

@route("/isRecordFloat")
@operationGroup
interface IsFloat extends ModelOperations<IsFloatAdditionalProperties, "{'id': 43.125, 'prop': 43.125}"> {}

// ********************************************** Record<Model> **********************************************
@doc("model for record")
model ModelForRecord {
  @doc("The state property")
  state: string;
}

#suppress "@azure-tools/typespec-azure-core/bad-record-type" "For testing"
@doc("The model extends from Record<ModelForRecord> type.")
model ExtendsModelAdditionalProperties extends Record<ModelForRecord> {}

@route("/extendsRecordModel")
@operationGroup
interface ExtendsModel extends ModelOperations<ExtendsModelAdditionalProperties, "{'prop': {'state': 'ok'}}"> {}

#suppress "@azure-tools/typespec-azure-core/bad-record-type" "For testing"
@doc("The model is from Record<ModelForRecord> type.")
model IsModelAdditionalProperties is Record<ModelForRecord>;

@route("/isRecordModel")
@operationGroup
interface IsModel extends ModelOperations<IsModelAdditionalProperties, "{'prop': {'state': 'ok'}}"> {}

// ********************************************** Record<Model[]> **********************************************
#suppress "@azure-tools/typespec-azure-core/bad-record-type" "For testing"
@doc("The model extends from Record<ModelForRecord[]> type.")
model ExtendsModelArrayAdditionalProperties extends Record<ModelForRecord[]> {}

@route("/extendsRecordModelArray")
@operationGroup
interface ExtendsModelArray
  extends ModelOperations<ExtendsModelArrayAdditionalProperties, "{'prop': [{'state': 'ok'}, {'state': 'ok'}]}"> {}

#suppress "@azure-tools/typespec-azure-core/bad-record-type" "For testing"
@doc("The model is from Record<ModelForRecord[]> type.")
model IsModelArrayAdditionalProperties is Record<ModelForRecord[]>;

@route("/isRecordModelArray")
@operationGroup
interface IsModelArray
  extends ModelOperations<IsModelArrayAdditionalProperties, "{'prop': [{'state': 'ok'}, {'state': 'ok'}]}"> {}
