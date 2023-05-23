import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";
import "@azure-tools/typespec-azure-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Illustrates various property types for models")
@scenarioService("/type/property/additionalProperties")
namespace Type.Property.AdditionalProperties;

#suppress "@azure-tools/typespec-azure-core/bad-record-type" "For testing"
@doc("The model extends from Record<unknown> type.")
model ModelExtendsRecordUnknown extends Record<unknown> {
  @doc("The name property")
  name: string;
}

#suppress "@azure-tools/typespec-azure-core/bad-record-type" "For testing"
@doc("The model is from Record<unknown> type.")
model ModelIsRecordUnknown is Record<unknown> {
  @doc("The name property")
  name: string;
}

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

@route("/extends/record/unknown")
@operationGroup
interface ExtendsRecordUnknown
  extends ModelOperations<
      ModelExtendsRecordUnknown,
      "{'name': 'ModelExtendsRecordUnknown', 'prop1': 32, 'prop2': true, 'prop3': 'abc'}"
    > {}

@route("/is/record/unknown")
@operationGroup
interface IsRecordUnknown
  extends ModelOperations<
      ModelIsRecordUnknown,
      "{'name': 'ModelIsRecordUnknown', 'prop1': 32, 'prop2': true, 'prop3': 'abc'}"
    > {}
