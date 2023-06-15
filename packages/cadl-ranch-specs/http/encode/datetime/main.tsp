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

@encode(DateTimeKnownEncoding.unixTimestamp, int64)
scalar unixTimestampDatetime extends utcDateTime;

@operationGroup
@route("/query")
namespace Query {
  @route("/default")
  @scenario
  @scenarioDoc("""
  Test default encode for datetime query parameter.
  Expected query parameter: 
  value=2022-08-26T18:38:00.000Z
  """)
  op default(
    @query
    value: utcDateTime
  ): NoContentResponse;

  @route("/rfc3339")
  @scenario
  @scenarioDoc("""
  Test rfc3339 encode for datetime query parameter.
  Expected query parameter: 
  value=2022-08-26T18:38:00.000Z
  """)
  op rfc3339(
    @query
    @encode(DateTimeKnownEncoding.rfc3339)
    value: utcDateTime
  ): NoContentResponse;

  @route("/rfc7231")
  @scenario
  @scenarioDoc("""
  Test rfc7231 encode for datetime query parameter.
  Expected query parameter: 
  value=Fri, 26 Aug 2022 14:38:00 GMT
  """)
  op rfc7231(
    @query
    @encode(DateTimeKnownEncoding.rfc7231)
    value: utcDateTime
  ): NoContentResponse;

  @route("/unix-timestamp")
  @scenario
  @scenarioDoc("""
  Test unixTimestamp encode for datetime query parameter.
  Expected query parameter: 
  value=1686566864
  """)
  op unixTimestamp(
    @query
    @encode(DateTimeKnownEncoding.unixTimestamp, int64)
    value: utcDateTime
  ): NoContentResponse;

  @route("/rfc7231-array")
  @scenario
  @scenarioDoc("""
  Test rfc7231 encode for datetime array query parameter.
  Expected query parameter: 
  value=Fri, 26 Aug 2022 14:38:00 GMT, Fri, 26 Aug 2022 16:38:00 GMT
  """)
  op rfc7231Array(
    @query({
      format: "csv",
    })
    value: rfc7231Datetime[]
  ): NoContentResponse;
}

model DefaultDatetimeProperty {
  value: utcDateTime;
}

model Rfc3339DatetimeProperty {
  @encode(DateTimeKnownEncoding.rfc3339)
  value: utcDateTime;
}

model Rfc7231DatetimeProperty {
  @encode(DateTimeKnownEncoding.rfc7231)
  value: utcDateTime;
}

model UnixTimestampDatetimeProperty {
  @encode(DateTimeKnownEncoding.unixTimestamp, int64)
  value: utcDateTime;
}

model UnixTimestampArrayDatetimeProperty {
  value: unixTimestampDatetime[];
}

@operationGroup
@route("/property")
namespace Property {
  @route("/default")
  @scenario
  @scenarioDoc("""
  Test operation with request and response model contains datetime property with default encode.
  Expected request body:
  ```json
  {
    "value": "2022-08-26T18:38:00.000Z"
  }
  ```
  Expected response body:
  ```json
  {
    "value": "2022-08-26T18:38:00.000Z"
  }
  ```
  """)
  @post
  op default(@body body: DefaultDatetimeProperty): DefaultDatetimeProperty;

  @route("/rfc3339")
  @scenario
  @scenarioDoc("""
  Test operation with request and response model contains datetime property with rfc3339 encode.
  Expected request body:
  ```json
  {
    "value": "2022-08-26T18:38:00.000Z"
  }
  ```
  Expected response body:
  ```json
  {
    "value": "2022-08-26T18:38:00.000Z"
  }
  ```
  """)
  @post
  op rfc3339(@body body: Rfc3339DatetimeProperty): Rfc3339DatetimeProperty;

  @route("/rfc7231")
  @scenario
  @scenarioDoc("""
  Test operation with request and response model contains datetime property with rfc7231 encode.
  Expected request body:
  ```json
  {
    "value": "Fri, 26 Aug 2022 14:38:00 GMT"
  }
  ```
  Expected response body:
  ```json
  {
    "value": "Fri, 26 Aug 2022 14:38:00 GMT"
  }
  ```
  """)
  @post
  op rfc7231(@body body: Rfc7231DatetimeProperty): Rfc7231DatetimeProperty;

  @route("/unix-timestamp")
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
  op unixTimestamp(@body body: UnixTimestampDatetimeProperty): UnixTimestampDatetimeProperty;

  @route("/unix-timestamp-array")
  @scenario
  @scenarioDoc("""
  Test operation with request and response model contains datetime array property with unixTimestamp encode.
  Expected request body:
  ```json
  {
    "value": [1686566864, 1686734256]
  }
  ```
  Expected response body:
  ```json
  {
    "value": [1686566864, 1686734256]
  }
  ```
  """)
  @post
  op unixTimestampArray(@body body: UnixTimestampArrayDatetimeProperty): UnixTimestampArrayDatetimeProperty;
}

@operationGroup
@route("/header")
namespace Header {
  @route("/default")
  @scenario
  @scenarioDoc("""
  Test default encode for datetime header.
  Expected header: 
  value=Fri, 26 Aug 2022 14:38:00 GMT
  """)
  op default(
    @header
    value: utcDateTime
  ): NoContentResponse;

  @route("/rfc3339")
  @scenario
  @scenarioDoc("""
  Test rfc3339 encode for datetime header.
  Expected header: 
  value=2022-08-26T18:38:00.000Z
  """)
  op rfc3339(
    @header
    @encode(DateTimeKnownEncoding.rfc3339)
    value: utcDateTime
  ): NoContentResponse;

  @route("/rfc7231")
  @scenario
  @scenarioDoc("""
  Test rfc7231 encode for datetime header.
  Expected header: 
  value=Fri, 26 Aug 2022 14:38:00 GMT
  """)
  op rfc7231(
    @header
    @encode(DateTimeKnownEncoding.rfc7231)
    value: utcDateTime
  ): NoContentResponse;

  @route("/unix-timestamp")
  @scenario
  @scenarioDoc("""
  Test unixTimestamp encode for datetime header.
  Expected header: 
  value=1686566864
  """)
  op unixTimestamp(
    @header
    @encode(DateTimeKnownEncoding.unixTimestamp, int64)
    value: utcDateTime
  ): NoContentResponse;

  @route("/unix-timestamp-array")
  @scenario
  @scenarioDoc("""
  Test unixTimestamp encode for datetime array header.
  Expected header: 
  value=1686566864, 1686734256
  """)
  op unixTimestampArray(
    @header({
      format: "csv",
    })
    value: unixTimestampDatetime[]
  ): NoContentResponse;
}
