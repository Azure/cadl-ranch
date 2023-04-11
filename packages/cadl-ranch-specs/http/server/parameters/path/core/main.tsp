import "@typespec/rest";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";
import "@typespec/versioning";
import "@azure-tools/typespec-azure-core";

using TypeSpec.Http;
using TypeSpec.Versioning;
using Azure.Core;
using TypeSpec.Rest;

@versioned(Versions)
@service({
  title: "ServerParametersPathCore",
})
@server(
  "{endpoint}/server/parameters/path/core/{apiVersion}",
  "Test server using Azure core templates with path parameters.",
  {
    @doc("""
Pass in http://localhost:3000 for endpoint.
""")
    endpoint: url,

    @doc("Pass in v1.0 for API version.")
    apiVersion: Versions,
  }
)
namespace Server.Parameters.Path.Core;

enum Versions {
  v1_0: "v1.0",
}

@doc("Product resource")
@resource("products")
model Product {
  @doc("ID of a product")
  @key
  @visibility("read")
  id: int32;
}

@scenario
@scenarioDoc("""
Operation with client and method path parameters.

Expected path parameter: apiVersion=v1.0, id=1

Expected response body:
  ```json
  {"id": 1}
  ```
""")
@doc("Get a resource")
op get is ResourceRead<Product>;
