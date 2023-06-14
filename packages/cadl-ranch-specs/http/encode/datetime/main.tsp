import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Test for encode decorator on datetime.")
@supportedBy("dpg")
@scenarioService("/encode/datetime")
namespace Encode.Datetime;

@encode(DateTimeKnownEncoding.rfc7231)
scalar rfc7231Datetime extends utcDateTime;

@operationGroup
@route("/query")
namespace Query {
  @route("/get")
  @scenario
  @scenarioDoc("""
  Test different encode for datetime query parameters.
  Expected query parameter: 
  default=2022-08-26T18:38:00.000Z
  rfc3339=2022-08-26T18:38:00.000Z
  rfc7231=Fri, 26 Aug 2022 14:38:00 GMT
  unix-timestamp=1686566864
  rfc7231-array=Fri, 26 Aug 2022 14:38:00 GMT, Fri, 26 Aug 2022 16:38:00 GMT
  """)
  op get(
    @query
    default: utcDateTime,

    @query
    @encode(DateTimeKnownEncoding.rfc3339)
    rfc3339: utcDateTime,

    @query
    @encode(DateTimeKnownEncoding.rfc7231)
    rfc7231: utcDateTime,

    @query("unix-timestamp")
    @encode(DateTimeKnownEncoding.unixTimestamp, int64)
    unixTimestamp: utcDateTime,

    @query({
      name: "rfc7231-array",
      format: "csv",
    })
    rfc7231Array: rfc7231Datetime[]
  ): NoContentResponse;
}

model DatetimeProperty {
  default: utcDateTime;

  @encode(DateTimeKnownEncoding.rfc3339)
  rfc3339: utcDateTime;

  @encode(DateTimeKnownEncoding.rfc7231)
  rfc7231: utcDateTime;

  @encode(DateTimeKnownEncoding.unixTimestamp, int64)
  unixTimestamp: utcDateTime;
  rfc7231Array: rfc7231Datetime[];
}

@operationGroup
@route("/property")
namespace Property {
  @route("/post")
  @scenario
  @scenarioDoc("""
  Test operation with request and response model contains datetime properties with different encode.
  Expected request body:
  ```json
  {
    "default": "2022-08-26T18:38:00.000Z",
    "rfc3339": "2022-08-26T18:38:00.000Z",
    "rfc7231": "Fri, 26 Aug 2022 14:38:00 GMT",
    "unixTimestamp": 1686566864,
    "rfc7231Array": ["Fri, 26 Aug 2022 14:38:00 GMT", "Fri, 26 Aug 2022 16:38:00 GMT"]
  }
  ```
  Expected response body:
  ```json
  {
    "default": "2022-08-26T18:38:00.000Z",
    "rfc3339": "2022-08-26T18:38:00.000Z",
    "rfc7231": "Fri, 26 Aug 2022 14:38:00 GMT",
    "unixTimestamp": 1686566864,
    "rfc7231Array": ["Fri, 26 Aug 2022 14:38:00 GMT", "Fri, 26 Aug 2022 16:38:00 GMT"]
  }
  ```
  """)
  @post
  op post(@body body: DatetimeProperty): DatetimeProperty;
}

@operationGroup
@route("/header")
namespace Header {
  @route("/get")
  @scenario
  @scenarioDoc("""
  Test different encode for datetime headers.
  Expected header:
  default=Fri, 26 Aug 2022 14:38:00 GMT
  rfc3339=2022-08-26T18:38:00.000Z
  rfc7231=Fri, 26 Aug 2022 14:38:00 GMT
  unix-timestamp=1686566864
  rfc7231-array=Fri, 26 Aug 2022 14:38:00 GMT,Fri, 26 Aug 2022 16:38:00 GMT
  """)
  op get(
    @header
    default: utcDateTime,

    @header
    @encode(DateTimeKnownEncoding.rfc3339)
    rfc3339: utcDateTime,

    @header
    @encode(DateTimeKnownEncoding.rfc7231)
    rfc7231: utcDateTime,

    @header("unix-timestamp")
    @encode(DateTimeKnownEncoding.unixTimestamp, int64)
    unixTimestamp: utcDateTime,

    @header({
      name: "rfc7231-array",
      format: "csv",
    })
    rfc7231Array: rfc7231Datetime[]
  ): NoContentResponse;
}
