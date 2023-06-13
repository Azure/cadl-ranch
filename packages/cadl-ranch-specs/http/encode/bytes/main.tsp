import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Test for encode decorator on bytes.")
@supportedBy("dpg")
@scenarioService("/encode/bytes")
namespace Encode.Bytes;

@encode(BytesKnownEncoding.base64)
scalar base64Bytes extends bytes;

@route("/query")
@scenario
@scenarioDoc("""
Test different encode for bytes query parameters.
Expected query parameter: 
default=dGVzdA== (base64 encode of test)
base64=dGVzdA==
base64url=dGVzdA (base64url encode of test)
base64-array=dGVzdA==, dGVzdA==
""")
op query(
  @query
  default: bytes,

  @query
  @encode(BytesKnownEncoding.base64)
  base64: bytes,

  @query
  @encode(BytesKnownEncoding.base64url)
  base64url: bytes,

  @query({
    name: "base64-array",
    format: "csv",
  })
  base64Array: base64Bytes[]
): NoContentResponse;

model BytesProperty {
  default: bytes;

  @encode(BytesKnownEncoding.base64)
  base64: bytes;

  @encode(BytesKnownEncoding.base64url)
  base64url: bytes;
  base64Array: base64Bytes[];
}

@route("/property")
@scenario
@scenarioDoc("""
Test operation with request and response model contains bytes properties with different encode.
Expected request body:
```json
{
  "default": "dGVzdA==",
  "base64": "dGVzdA==",
  "base64url": "dGVzdA",
  "base64Array": ["dGVzdA==", "dGVzdA=="]
}
```
Expected response body:
```json
{
  "default": "dGVzdA==",
  "base64": "dGVzdA==",
  "base64url": "dGVzdA",
  "base64Array": ["dGVzdA==", "dGVzdA=="]
}
```
""")
@post
op property(@body body: BytesProperty): BytesProperty;

@route("/header")
@scenario
@scenarioDoc("""
Test different encode for bytes headers.
Expected header:
default=dGVzdA==
base64=dGVzdA==
base64url=dGVzdA
base64-array=dGVzdA==,dGVzdA==
""")
op header(
  @header
  default: bytes,

  @header
  @encode(BytesKnownEncoding.base64)
  base64: bytes,

  @header
  @encode(BytesKnownEncoding.base64url)
  base64url: bytes,

  @header({
    name: "base64-array",
    format: "csv",
  })
  base64Array: base64Bytes[]
): NoContentResponse;
