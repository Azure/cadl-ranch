import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Test for encode decorator on decimal.")
@supportedBy("dpg")
@scenarioService("/encode/decimal")
namespace Encode.Decimal;

@operationGroup
@route("/property")
namespace Property {
  model DefaultDecimalProperty {
    value: decimal;
  }

  model StringDecimalProperty {
    @encode("string")
    value: decimal;
  }

  @encode("string")
  scalar StringDecimal extends decimal;

  model StringDecimalArrayProperty {
    value: StringDecimal[];
  }

  @route("/default")
  @scenario
  @scenarioDoc("""
  Test operation with request and response model contains a decimal property with default encode.
  Expected request body:
  ```json
  {
    "value": 0.6666
  }
  ```
  Expected response body:
  ```json
  {
    "value": 0.6666
  }
  ```
  """)
  @post
  op default(@body body: DefaultDecimalProperty): DefaultDecimalProperty;

  @route("/string")
  @scenario
  @scenarioDoc("""
  Test operation with request and response model contains a decimal property with default encode.
  Expected request body:
  ```json
  {
    "value": "0.6666"
  }
  ```
  Expected response body:
  ```json
  {
    "value": "0.6666"
  }
  ```
  """)
  @post
  op string(@body body: StringDecimalProperty): StringDecimalProperty;

  @route("/string-decimal-array")
  @scenario
  @scenarioDoc("""
  Test operation with request and response model contains an array property which elements are decimal with string encode.
  Expected request body:
  ```json
  {
    "value": ["0.6666", "0.3333"]
  }
  ```
  Expected response body:
  ```json
  {
    "value": ["0.6666", "0.3333"]
  }
  ```
  """)
  op stringDecimalArray(@body body: StringDecimalArrayProperty): StringDecimalArrayProperty;
}
