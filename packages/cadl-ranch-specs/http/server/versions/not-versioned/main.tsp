import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

/**
 * Illustrates server with non operations defined with api-versions.
 */
@scenarioService("/server/versions/notVersioned")
@server(
  "{endpoint}",
  "Testserver endpoint",
  {
    /**
     * Need to be set as 'http://localhost:3000' in client.
     */
    endpoint: url,
  }
)
@scenario
@scenarioDoc("All operations without api-version. Therefore expected url should not contain any query parameters.")
namespace Server.Versions.NotVersioned;

@route("/withoutApiVersion")
@head
op withoutApiVersion(): OkResponse;
