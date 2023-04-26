import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Test for clientFormat decorator on duration.")
@supportedBy("dpg")
@scenarioService("/azure/client-generator-core/client-format/duration")
namespace _Specs_.Azure.ClientGenerator.Core.ClientFormat.Duration;

@global.Azure.ClientGenerator.Core.operationGroup
@route("/query")
namespace Query {
  @route("/iso8601")
  @scenario
  @scenarioDoc("""
  Test that default client format for a duration parameter is iso8601.
  Expected query parameter `input=P40D`
  """)
  op iso8601(
    @query
    input: duration
  ): NoContentResponse;

  @route("/seconds")
  @scenario
  @scenarioDoc("""
  Test seconds client format for a duration parameter.
  Expected query parameter `input=35.6`
  """)
  op seconds(
    @query
    @global.Azure.ClientGenerator.Core.clientFormat("seconds")
    input: duration
  ): NoContentResponse;
}

@global.Azure.ClientGenerator.Core.operationGroup
@route("/property")
namespace Property {
  model ISO8601DurationProperty {
    value: duration;
  }

  model SecondsDurationProperty {
    @global.Azure.ClientGenerator.Core.clientFormat("seconds")
    value: duration;
  }

  @route("/iso8601")
  @scenario
  @scenarioDoc("""
  Test operation with request and response model contains iso8601 format duration property.
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

  @route("/seconds")
  @scenario
  @scenarioDoc("""
  Test operation with request and response model contains seconds format duration property.
  Expected request body:
  ```json
  {
    "value": 35.6
  }
  ```
  Expected response body:
  ```json
  {
    "value": 35.6
  }
  ```
  """)
  op seconds(@body body: SecondsDurationProperty): SecondsDurationProperty;
}
