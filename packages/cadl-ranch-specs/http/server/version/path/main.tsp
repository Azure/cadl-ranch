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
    apiVersion: APIVersion,
  }
)
namespace Server.Version.Path;

enum APIVersion {
  v1_1: "v1.1",
  v1_2: "v1.2",
}

model Options {
  versioned: APIVersion;
}

@scenario
@scenarioDoc("""
Server with multiple api versions and the version is in path.

Expected path with api version parameter: /v1.1/server/version/path/valid
""")
@route("/valid")
@head
op valid(): NoContentResponse;
