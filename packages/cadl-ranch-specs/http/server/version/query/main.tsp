import "@typespec/http";
import "@typespec/versioning";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;
using TypeSpec.Versioning;

@doc("Illustrates server with multiple versions and the version is in query.")
@scenarioService("/server/version/query", Options)
@server(
  "{endpoint}",
  "Testserver endpoint",
  {
    @doc("Need to be set as 'http://localhost:3000' in client.")
    endpoint: url,
  }
)
namespace Server.Version.Query;

enum Versions {
  v1_1: "v1.1",
  v1_2: "v1.2"
}

model Options {
  versioned: Versions;
}

@scenario
@scenarioDoc("""
Server with multiple api versions and the version is in query.

Expected path with api version parameter: /server/version/query/valid?api-version=v1.1
""")
@route("/valid")
@head
op valid(): NoContentResponse;
