import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Test for encode decorator on datetime.")
@supportedBy("dpg")
@scenarioService("/encode/datetime")
namespace Encode.Datetime;

@encode(DateTimeKnownEncoding.rfc3339)
scalar rfc3339Datetime extends utcDateTime;

@route("/query")
@scenario
@scenarioDoc("""
Test different encode for datetime query parameters.
Expected query parameter: 
default=2022-08-26T18:38:00.000Z
rfc3339=2022-08-26T18:38:00.000Z
rfc7231=Fri, 26 Aug 2022 14:38:00 GMT
unix-timestamp=1686566864
rfc3339-array=2022-08-26T18:38:00.000Z,2022-09-26T18:38:00.000Z
""")
op query(
  @query
  default: utcDateTime,

  @query
  @encode(DateTimeKnownEncoding.rfc3339)
  rfc3339: utcDateTime,

  @query
  @encode(DateTimeKnownEncoding.rfc7231)
  rfc7231: utcDateTime,

  @query("unix-timestamp")
  @encode(DateTimeKnownEncoding.unixTimestamp, int32)
  unixTimestamp: utcDateTime,

  @query({
    name: "rfc3339-array",
    format: "csv",
  })
  rfc3339Array: rfc3339Datetime[]
): NoContentResponse;

model DatetimeProperty {
  default: utcDateTime;

  @encode(DateTimeKnownEncoding.rfc3339)
  rfc3339: utcDateTime;

  @encode(DateTimeKnownEncoding.rfc7231)
  rfc7231: utcDateTime;

  @encode(DateTimeKnownEncoding.unixTimestamp, int32)
  unixTimestamp: utcDateTime;
  rfc3339Array: rfc3339Datetime[];
}

@route("/property")
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
  "rfc3339Array": ["2022-08-26T18:38:00.000Z", "2022-09-26T18:38:00.000Z"]
}
```
Expected response body:
```json
{
  "default": "2022-08-26T18:38:00.000Z",
  "rfc3339": "2022-08-26T18:38:00.000Z",
  "rfc7231": "Fri, 26 Aug 2022 14:38:00 GMT",
  "unixTimestamp": 1686566864,
  "rfc3339Array": ["2022-08-26T18:38:00.000Z", "2022-09-26T18:38:00.000Z"]
}
```
""")
@post
op property(@body body: DatetimeProperty): DatetimeProperty;

@route("/header")
@scenario
@scenarioDoc("""
Test different encode for datetime headers.
Expected header:
default=Fri, 26 Aug 2022 14:38:00 GMT
rfc3339=2022-08-26T18:38:00.000Z
rfc7231=Fri, 26 Aug 2022 14:38:00 GMT
unix-timestamp=1686566864
rfc3339-array=2022-08-26T18:38:00.000Z,2022-09-26T18:38:00.000Z
""")
op header(
  @header
  default: utcDateTime,

  @header
  @encode(DateTimeKnownEncoding.rfc3339)
  rfc3339: utcDateTime,

  @header
  @encode(DateTimeKnownEncoding.rfc7231)
  rfc7231: utcDateTime,

  @header("unix-timestamp")
  @encode(DateTimeKnownEncoding.unixTimestamp, int32)
  unixTimestamp: utcDateTime,

  @header({
    name: "rfc3339-array",
    format: "csv",
  })
  rfc3339Array: rfc3339Datetime[]
): NoContentResponse;
