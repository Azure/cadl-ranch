import "@azure-tools/typespec-azure-core";
import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@typespec/versioning";

using TypeSpec.Http;
using TypeSpec.Versioning;

@doc("Illustrates server with all operations defined with api-versions.")
@scenarioService(
  "/server/versions/allOperations",
  {
    versioned: Versions,
  }
)
@server(
  "{endpoint}",
  "Testserver endpoint",
  {
    @doc("Need to be set as 'http://localhost:3000' in client.")
    endpoint: url,
  }
)
namespace Server.Versions.AllOperations;

@doc("The version of the API.")
enum Versions {
  @doc("The version 2022-12-01-preview.")
  @useDependency(global.Azure.Core.Versions.v1_0_Preview_2)
  v2022_12_01_preview: "2022-12-01-preview",
}

@scenario
@scenarioDoc("A simple operation with api-version. Expected url: '/myOp?api-version=2022-12-01-preview'.")
@route("/myOp")
@head
op myOp(@query apiVersion: string): OkResponse;
