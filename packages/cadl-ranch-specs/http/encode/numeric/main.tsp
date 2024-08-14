import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Test for encode decorator on integer.")
@supportedBy("dpg")
@scenarioService("/encode/numeric")
namespace Encode.Numeric;

@operationGroup
@route("/property")
namespace Property {
  @route("/safeint")
  @scenario
  @scenarioDoc("""
    Test operation with request and response model contains property of safeint type with string encode.
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

  @route("/uint32")
  @scenario
  @scenarioDoc("""
    Test operation with request and response model contains property of uint32 type with string encode.
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
  op uint32AsStringOptional(@body body: Uint32AsStringProperty): Uint32AsStringProperty;

  model Uint32AsStringProperty {
    @encode(string)
    value?: uint32;
  }
}
