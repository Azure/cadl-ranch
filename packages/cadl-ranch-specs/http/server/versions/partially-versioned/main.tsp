import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-azure-core";
import "@typespec/versioning";

using TypeSpec.Http;
using TypeSpec.Versioning;

/**
 * Illustrates server with part of operations defined with api-versions.
 */
@scenarioService(
  "/server/versions/partiallyVersioned",
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
namespace Server.Versions.PartiallyVersioned;

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

@scenario
@scenarioDoc("A simple operation without api-version. Expected url: '/withoutApiVersion', it should not contain any api-version.")
@route("/withoutApiVersion")
@head
op withoutApiVersion(): OkResponse;

@scenario
@scenarioDoc("A simple operation with api-version. Expected url: '/withApiVersion?api-version=1.0'.")
@route("/withApiVersion")
@head
op withApiVersion(@query apiVersion: string): OkResponse;
