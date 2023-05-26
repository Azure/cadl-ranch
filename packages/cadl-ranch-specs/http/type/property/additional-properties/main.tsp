import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";
import "@azure-tools/typespec-azure-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Illustrates various property types for models")
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
model ExtendsUnknownAddtionalProperties extends Record<unknown> {
  @doc("The name property")
  name: string;
}

@route("/extendsRecordUnknown")
@operationGroup
interface ExtendsUnknown
  extends ModelOperations<
      ExtendsUnknownAddtionalProperties,
      "{'name': 'ExtendsUnknownAddtionalProperties', 'prop1': 32, 'prop2': true, 'prop3': 'abc'}"
    > {}

#suppress "@azure-tools/typespec-azure-core/bad-record-type" "For testing"
@doc("The model is from Record<unknown> type.")
model IsUnknownAddtionalProperties is Record<unknown> {
  @doc("The name property")
  name: string;
}

@route("/isRecordUnknown")
@operationGroup
interface IsUnknown
  extends ModelOperations<
      IsUnknownAddtionalProperties,
      "{'name': 'IsUnknownAddtionalProperties', 'prop1': 32, 'prop2': true, 'prop3': 'abc'}"
    > {}

// ********************************************** Record<string> **********************************************
#suppress "@azure-tools/typespec-azure-core/bad-record-type" "For testing"
@doc("The model extends from Record<string> type.")
model ExtendsStringAddtionalProperties extends Record<string> {
  @doc("The name property")
  name: string;
}

@route("/extendsRecordString")
@operationGroup
interface ExtendsString
  extends ModelOperations<
      ExtendsStringAddtionalProperties,
      "{'name': 'ExtendsStringAddtionalProperties', 'prop': 'abc'}"
    > {}

#suppress "@azure-tools/typespec-azure-core/bad-record-type" "For testing"
@doc("The model is from Record<string> type.")
model IsStringAddtionalProperties is Record<string> {
  @doc("The name property")
  name: string;
}

@route("/isRecordstring")
@operationGroup
interface IsString
  extends ModelOperations<IsStringAddtionalProperties, "{'name': 'IsStringAddtionalProperties', 'prop': 'abc'}"> {}

// ********************************************** Record<float32> **********************************************
#suppress "@azure-tools/typespec-azure-core/bad-record-type" "For testing"
@doc("The model extends from Record<float32> type.")
model ExtendsFloatAddtionalProperties extends Record<float32> {
  @doc("The id property")
  id: float32;
}

@route("/extendsRecordFloat")
@operationGroup
interface ExtendsFloat extends ModelOperations<ExtendsFloatAddtionalProperties, "{'id': 42.42, 'prop': 42.42}"> {}

#suppress "@azure-tools/typespec-azure-core/bad-record-type" "For testing"
@doc("The model is from Record<float32> type.")
model IsFloatAddtionalProperties is Record<float32> {
  @doc("The id property")
  id: float32;
}

@route("/isRecordFloat")
@operationGroup
interface IsFloat extends ModelOperations<IsFloatAddtionalProperties, "{'id': 42.42, 'prop': 42.42}"> {}
