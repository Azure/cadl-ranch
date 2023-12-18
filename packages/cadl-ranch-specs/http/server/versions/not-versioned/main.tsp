import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

/**
 * Illustrates not-versioned server.
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
namespace Server.Versions.NotVersioned;

@scenario
@scenarioDoc("A simple operation without api-version. Expected url: '/withoutApiVersion', it should not contain any api-version.")
@route("/withoutApiVersion")
@head
op withoutApiVersion(): OkResponse;

// public virtual Response withoutApiVersion(RequestContext context = null);

@scenario
@scenarioDoc("A simple operation with query api-version, which doesn't have any default value. Expected url: '/withQueryApiVersion?api-version=v1.0.")
@route("/withQueryApiVersion")
@head
op withQueryApiVersion(@query("api-version") apiVersion: string): OkResponse;

// public virtual Response withQueryApiVersion(string apiVersion, RequestContext context = null);

@scenario
@scenarioDoc("A simple operation with path api-version, which doesn't have any default value. Expected url: '/withPathApiVersion/v1.0'.")
@route("/withPathApiVersion")
@head
op withPathApiVersion(@path apiVersion: string): OkResponse;

// public virtual Response withPathApiVersion(string apiVersion, RequestContext context = null);