import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Test for clientFormat decorator.")
@supportedBy("dpg")
@scenarioService("/azure/client-generator-core/client-format")
namespace _Specs_.Azure.ClientGenerator.Core.ClientFormat;

@global.Azure.ClientGenerator.Core.operationGroup
@route("/duration")
namespace Duration {
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
  Test that default client format for a duration parameter is iso8601.
  Expected query parameter `input=35.6`
  """)
  op seconds(
    @query
    @global.Azure.ClientGenerator.Core.clientFormat("seconds")
    input: duration
  ): NoContentResponse;
}
