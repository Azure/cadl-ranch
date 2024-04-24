import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Test for encode decorator on union property.")
@supportedBy("dpg")
@scenarioService("/encode/union")
namespace Encode.Union;

model UnixTimestampDatetimeUnionProperty {
  @encode(DateTimeKnownEncoding.unixTimestamp, int64)
  value: utcDateTime | null;
}

@route("/unix-timestamp-union")
@scenario
@scenarioDoc("""
  Test operation with request and response model contains datetime property with unixTimestamp encode.
  Expected request body:
  ```json
  {
    "value": 1686566864
  }
  ```
  Expected response body:
  ```json
  {
    "value": 1686566864
  }
  ```
  """)
@post
op unixTimestampUnion(@body body: UnixTimestampDatetimeUnionProperty): UnixTimestampDatetimeUnionProperty;
