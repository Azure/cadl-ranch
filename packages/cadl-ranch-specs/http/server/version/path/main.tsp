import "@typespec/http";
import "@typespec/versioning";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;
using TypeSpec.Versioning;

@doc("Illustrates server with multiple versions and the version is in path.")
@scenarioService("/server/version/path", Options)
@server(
  "{endpoint}/{apiVersion}",
  "Testserver endpoint",
  {
    @doc("Need to be set as 'http://localhost:3000' in client.")
    endpoint: url,
    @doc("Api Version")
    @path
    apiVersion: APIVersion
  }
)
namespace Server.Version.Path;

enum Versions {
  v1_1: "v1.1",
  v1_2: "v1.2"
}

@knownValues(Versions)
scalar APIVersion extends string;

model Options {
  versioned: Versions;
}
  
@scenario
@scenarioDoc("An simple operation in a parameterized server.")
@route("/myOp")
@head
op myOp(): OkResponse;
