import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Test for encode decorator on bytes.")
@supportedBy("dpg")
@scenarioService("/encode/bytes")
namespace Encode.Bytes;

@encode(BytesKnownEncoding.base64url)
scalar base64urlBytes extends bytes;

@operationGroup
@route("/query")
namespace Query {
  @route("/get")
  @scenario
  @scenarioDoc("""
  Test different encode for bytes query parameters.
  Expected query parameter: 
  default=dGVzdA== (base64 encode of test)
  base64=dGVzdA==
  base64url=dGVzdA (base64url encode of test)
  base64url-array=dGVzdA, dGVzdA
  """)
  op get(
    @query
    default: bytes,

    @query
    @encode(BytesKnownEncoding.base64)
    base64: bytes,

    @query
    @encode(BytesKnownEncoding.base64url)
    base64url: bytes,

    @query({
      name: "base64url-array",
      format: "csv",
    })
    base64urlArray: base64urlBytes[]
  ): NoContentResponse;
}

model BytesProperty {
  default: bytes;

  @encode(BytesKnownEncoding.base64)
  base64: bytes;

  @encode(BytesKnownEncoding.base64url)
  base64url: bytes;
  base64urlArray: base64urlBytes[];
}

@operationGroup
@route("/property")
namespace Property {
  @route("/post")
  @scenario
  @scenarioDoc("""
  Test operation with request and response model contains bytes properties with different encode.
  Expected request body:
  ```json
  {
    "default": "dGVzdA==",
    "base64": "dGVzdA==",
    "base64url": "dGVzdA",
    "base64urlArray": ["dGVzdA", "dGVzdA"]
  }
  ```
  Expected response body:
  ```json
  {
    "default": "dGVzdA==",
    "base64": "dGVzdA==",
    "base64url": "dGVzdA",
    "base64urlArray": ["dGVzdA", "dGVzdA"]
  }
  ```
  """)
  @post
  op post(@body body: BytesProperty): BytesProperty;
}

@operationGroup
@route("/header")
namespace Header {
  @route("/get")
  @scenario
  @scenarioDoc("""
  Test different encode for bytes headers.
  Expected header:
  default=dGVzdA==
  base64=dGVzdA==
  base64url=dGVzdA
  base64url-array=dGVzdA,dGVzdA
  """)
  op get(
    @header
    default: bytes,

    @header
    @encode(BytesKnownEncoding.base64)
    base64: bytes,

    @header
    @encode(BytesKnownEncoding.base64url)
    base64url: bytes,

    @header({
      name: "base64url-array",
      format: "csv",
    })
    base64urlArray: base64urlBytes[]
  ): NoContentResponse;
}
