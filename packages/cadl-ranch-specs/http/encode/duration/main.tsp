import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Test for encode decorator on duration.")
@supportedBy("dpg")
@scenarioService("/encode/duration")
namespace Encode.Duration;

@operationGroup
@route("/query")
namespace Query {
  @route("/default")
  @scenario
  @scenarioDoc("""
  Test default encode for a duration parameter.
  Expected query parameter `input=P40D`
  """)
  op default(
    @query
    input: duration
  ): NoContentResponse;

  @route("/iso8601")
  @scenario
  @scenarioDoc("""
  Test iso8601 encode for a duration parameter.
  Expected query parameter `input=P40D`
  """)
  op iso8601(
    @query
    @encode(DurationKnownEncoding.ISO8601)
    input: duration
  ): NoContentResponse;

  @route("/int32-seconds")
  @scenario
  @scenarioDoc("""
  Test int32 seconds encode for a duration parameter.
  Expected query parameter `input=36`
  """)
  op int32Seconds(
    @query
    @encode(DurationKnownEncoding.seconds, int32)
    input: duration
  ): NoContentResponse;

  @route("/float-seconds")
  @scenario
  @scenarioDoc("""
  Test float seconds encode for a duration parameter.
  Expected query parameter `input=35.621`
  """)
  op floatSeconds(
    @query
    @encode(DurationKnownEncoding.seconds, float)
    input: duration
  ): NoContentResponse;
}

@operationGroup
@route("/property")
namespace Property {
  model DefaultDurationProperty {
    value: duration;
  }

  model ISO8601DurationProperty {
    @encode(DurationKnownEncoding.ISO8601)
    value: duration;
  }

  model Int32SecondsDurationProperty {
    @encode(DurationKnownEncoding.seconds, int32)
    value: duration;
  }

  model FloatSecondsDurationProperty {
    @encode(DurationKnownEncoding.seconds, float)
    value: duration;
  }

  @route("/default")
  @scenario
  @scenarioDoc("""
  Test operation with request and response model contains a duration property with default encode.
  Expected request body:
  ```json
  {
    "value": "P40D"
  }
  ```
  Expected response body:
  ```json
  {
    "value": "P40D"
  }
  ```
  """)
  @post
  op default(@body body: DefaultDurationProperty): DefaultDurationProperty;

  @route("/iso8601")
  @scenario
  @scenarioDoc("""
  Test operation with request and response model contains a duration property with iso8601 encode.
  Expected request body:
  ```json
  {
    "value": "P40D"
  }
  ```
  Expected response body:
  ```json
  {
    "value": "P40D"
  }
  ```
  """)
  @post
  op iso8601(@body body: ISO8601DurationProperty): ISO8601DurationProperty;

  @route("/int32-seconds")
  @scenario
  @scenarioDoc("""
  Test operation with request and response model contains a duration property with int32 seconds encode.
  Expected request body:
  ```json
  {
    "value": 36
  }
  ```
  Expected response body:
  ```json
  {
    "value": 36
  }
  ```
  """)
  op int32Seconds(@body body: Int32SecondsDurationProperty): Int32SecondsDurationProperty;

  @route("/float-seconds")
  @scenario
  @scenarioDoc("""
  Test operation with request and response model contains a duration property with float seconds encode.
  Expected request body:
  ```json
  {
    "value": 35.621
  }
  ```
  Expected response body:
  ```json
  {
    "value": 35.621
  }
  ```
  """)
  op floatSeconds(@body body: FloatSecondsDurationProperty): FloatSecondsDurationProperty;
}

@operationGroup
@route("/head")
namespace Head {
  @route("/default")
  @scenario
  @scenarioDoc("""
  Test default encode for a duration header.
  Expected query parameter `input=P40D`
  """)
  op default(
    @header
    duration: duration
  ): NoContentResponse;

  @route("/iso8601")
  @scenario
  @scenarioDoc("""
  Test iso8601 encode for a duration header.
  Expected header `duration: P40D`
  """)
  op iso8601(
    @query
    @encode(DurationKnownEncoding.ISO8601)
    duration: duration
  ): NoContentResponse;

  @route("/int32-seconds")
  @scenario
  @scenarioDoc("""
  Test int32 seconds encode for a duration header.
  Expected header `duration: 36`
  """)
  op int32Seconds(
    @query
    @encode(DurationKnownEncoding.seconds, int32)
    duration: duration
  ): NoContentResponse;

  @route("/float-seconds")
  @scenario
  @scenarioDoc("""
  Test float seconds encode for a duration header.
  Expected header `duration: 35.621`
  """)
  op floatSeconds(
    @query
    @encode(DurationKnownEncoding.seconds, float)
    duration: duration
  ): NoContentResponse;
}
