import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-azure-core";
import "@typespec/versioning";

using TypeSpec.Http;
using TypeSpec.Versioning;

/**
 * Illustrates versioned server with version parameter in path.
 */
@scenarioService(
  "/server/versions/versioned/in/path",
  {
    versioned: Versions,
  }
)
@server(
  "{endpoint}/{apiVersion}",
  "Testserver endpoint",
  {
    /**
     * Need to be set as 'http://localhost:3000' in client.
     */
    endpoint: url,

    /**
     * The api version in path.
     */
    apiVersion: Versions,
  }
)
namespace Server.Versions.Versioned.In.Path;

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
@scenarioDoc("A simple operation without api-version, but it has default value for apiVersion path parameter '2022-12-01-preview'. Expected url: '2022-12-01-preview/withoutApiVersion'.")
@route("/withoutApiVersion")
@head
op withoutApiVersion(): OkResponse;

// public virtual Response withoutApiVersion(RequestContext context = null);

@scenario
@scenarioDoc("A simple operation with query api-version, which doesn't have any default value. Expected url: '2022-12-01-preview/withQueryApiVersion?api-version=v1.0'.")
@route("/withQueryApiVersion")
@head
op withQueryApiVersion(@query apiVersion: string): OkResponse;

// public virtual Response withQueryApiVersion(string apiVersion, RequestContext context = null);

@scenario
@scenarioDoc("A simple operation with path api-version, which doesn't have any default value. Expected url: '2022-12-01-preview/withPathApiVersion/v1.0'.")
@route("/withPathApiVersion")
@head
op withPathApiVersion(@path apiVersion: string): OkResponse;

// public virtual Response withPathApiVersion(string apiVersion, RequestContext context = null);
