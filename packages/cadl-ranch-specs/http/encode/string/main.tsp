import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Test for encode decorator on integer as string.")
@supportedBy("dpg")
@scenarioService("/encode/string")
namespace Encode.AsString;

@operationGroup
@route("/property")
namespace Property {
  @route("/string")
  @scenario
  @scenarioDoc("""
  Test operation with request and response model contains integer property with string encode.
  Expected request body:
  ```json
  {
    "value": "1"
  }
  ```
  Expected response body:
  ```json
  {
    "value": "1"
  }
  ```
  """)
  @post
  op encodeAsString(@body body: IntegerAsStringProperty): IntegerAsStringProperty;

  model IntegerAsStringProperty {
    @encode(string)
    value: safeint;
  }
}
