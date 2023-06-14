import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Test for encode decorator on datetime.")
@supportedBy("dpg")
@scenarioService("/encode/datetime")
namespace Encode.Datetime;

@encode(DateTimeKnownEncoding.unixTimestamp, int64)
scalar unixTimestampDatetime extends utcDateTime;

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
  unix-timestamp-array=1686566864, 1686734256
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
      name: "unix-timestamp-array",
      format: "csv",
    })
    unixTimestampArray: unixTimestampDatetime[]
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
  unixTimestampArray: unixTimestampDatetime[];
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
    "unixTimestampArray": [1686566864, 1686734256]
  }
  ```
  Expected response body:
  ```json
  {
    "default": "2022-08-26T18:38:00.000Z",
    "rfc3339": "2022-08-26T18:38:00.000Z",
    "rfc7231": "Fri, 26 Aug 2022 14:38:00 GMT",
    "unixTimestamp": 1686566864,
    "unixTimestampArray": [1686566864, 1686734256]
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
  unix-timestamp-array=1686566864,1686734256
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
      name: "unix-timestamp-array",
      format: "csv",
    })
    unixTimestampArray: unixTimestampDatetime[]
  ): NoContentResponse;
}
