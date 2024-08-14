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
  @route("/safeint")
  @scenario
  @scenarioDoc("""
    Test operation with request and response model contains integer property with string encode.
    Expected request body:
    ```json
    {
      "value": "10000000000"
    }
    ```
    Expected response body:
    ```json
    {
      "value": "10000000000"
    }
    ```
    """)
  @post
  op safeintAsString(@body body: SafeintAsStringProperty): SafeintAsStringProperty;

  model SafeintAsStringProperty {
    @encode(string)
    value: safeint;
  }

  @route("/int32")
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
  op int32AsStringOptional(@body body: Int32AsStringProperty): Int32AsStringProperty;

  model Int32AsStringProperty {
    @encode(string)
    value?: int32;
  }
}
