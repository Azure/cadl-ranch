import "@azure-tools/typespec-azure-core";
import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@typespec/versioning";

using TypeSpec.Http;
using TypeSpec.Versioning;

/**
 * Illustrates server with all operations defined with api-versions.
 */
@scenarioService(
  "/server/versions/fullyVersioned",
  {
    versioned: Versions,
  }
)
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
@scenarioDoc("All operations with api-version. Therefore expected url contains a query parameter 'api-version=2022-12-01-preview'.")
namespace Server.Versions.FullyVersioned;

/**
 * The version of the API.
 */
enum Versions {
  /**
   * The version 2022-12-01-preview.
   */
  @useDependency(global.Azure.Core.Versions.v1_0_Preview_2)
  v2022_12_01_preview: "2022-12-01-preview",
}

@route("/withApiVersion")
@head
op withApiVersion(@query apiVersion: string): OkResponse;
