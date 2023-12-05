import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

@doc("Illustrates server with non operations defined with api-versions.")
@scenarioService("/server/versions/nonOperations")
@server(
  "{endpoint}",
  "Testserver endpoint",
  {
    @doc("Need to be set as 'http://localhost:3000' in client.")
    endpoint: url,
  }
)
namespace Server.Versions.NonOperations;

@scenario
@scenarioDoc("A simple operation without api-version. Expected url: '/withoutApiVersion', it should not contain any api-version.")
@route("/withoutApiVersion")
@head
op withoutApiVersion(): OkResponse;
