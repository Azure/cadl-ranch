import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-azure-core";
import "@typespec/versioning";

using TypeSpec.Http;
using TypeSpec.Versioning;

/**
 * Illustrates non-versioned server with string version parameter in path.
 */
@scenarioService("/server/versions/versioned/not/in/path")
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
    apiVersion: string,
  }
)
namespace Server.Versions.Versioned.In.Path;

@scenario
@scenarioDoc("A simple operation without api-version. Expected url: '2022-12-01-preview/withoutApiVersion'.")
@route("/withoutApiVersion")
@head
op withoutApiVersion(): OkResponse;

// public virtual Response withoutApiVersion(RequestContext context = null);

@scenario
@scenarioDoc("A simple operation with query api-version, which doesn't have any default value. Expected url: '2022-12-01-preview/withQueryApiVersion?api-version=v1.1'.")
@route("/withQueryApiVersion")
@head
op withQueryApiVersion(@query apiVersion: string): OkResponse;

// public virtual Response withQueryApiVersion(string apiVersion, RequestContext context = null);

@scenario
@scenarioDoc("A simple operation with path api-version, which doesn't have any default value. Expected url: '2022-12-01-preview/withPathApiVersion/v1.1'.")
@route("/withPathApiVersion")
@head
op withPathApiVersion(@path apiVersion: string): OkResponse;

// public virtual Response withPathApiVersion(string apiVersion, RequestContext context = null);
