import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Test basic types.")
@scenarioService("/type/basic")
namespace Type.Basic;

@doc("Template to have basic types operations")
interface BasicTypesOperations<T, TDoc extends string> {
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
  @route("/response_body")
  responseBody(): T;

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
  @route("/resquest_body")
  requestBody(@body body: T): void;

  @scenario
  @scenarioDoc(
    """
  Expected request parameter:
  value=dGVzdA (base64url encode of test)
  """,
    {
      doc: TDoc,
    }
  )
  @get
  @route("/request_parameter")
  requestParameter(@query value: T): void;
}

@doc("Decimal type")
@route("/decimal")
@operationGroup
interface DecimalType extends BasicTypesOperations<decimal, "0.33333"> {}

@doc("Decimal128 type")
@route("/decimal128")
@operationGroup
interface Decimal128Type extends BasicTypesOperations<decimal128, "0.33333"> {}
