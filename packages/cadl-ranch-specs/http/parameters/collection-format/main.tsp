import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Test for collectionFormat.")
@supportedBy("dpg")
@scenarioService("/parameters/collection-format")
namespace Parameters.CollectionFormat;

@route("/query")
@operationGroup
namespace Query {
  @scenario
  @scenarioDoc("""
This test is testing sending a multi collection format array query parameters
""")
  @route("/multi")
  op multi(
    @doc("Possible values for colors are [blue,red,green]")
    @query({
      format: "multi",
    })
    colors: string[]
  ): NoContentResponse;

  @scenario
  @scenarioDoc("""
This test is testing sending a csv collection format array query parameters
""")
  @route("/csv")
  op csv(
    @doc("Possible values for colors are [blue,red,green]")
    @query({
      format: "csv",
    })
    colors: string[]
  ): NoContentResponse;
}

@route("/header")
@operationGroup
namespace Header {
  @scenario
  @scenarioDoc("""
This test is testing sending a csv collection format array header parameters
""")
  @route("/csv")
  op csv(
    @doc("Possible values for colors are [blue,red,green]")
    @header({
      format: "csv",
    })
    colors: string[]
  ): NoContentResponse;
}
