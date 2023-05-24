import "@typespec/rest";
import "@azure-tools/typespec-azure-core";
import "@azure-tools/typespec-client-generator-core";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;
using TypeSpec.Rest;
using Azure.Core;
using Azure.ClientGenerator;
using Azure.ClientGenerator.Core;
using TypeSpec.Versioning;
@doc("Illustrates multple sub clients")
@scenarioService("/multi-clients")
@service({
  title: "MultiClient",
  version: "1.0.0",
})
@useDependency(Azure.Core.Versions.v1_0_Preview_1)
namespace Cadl.MultiClient;

@doc("The resource.")
model Resource {
  @visibility("read")
  @doc("The resource id.")
  id: string;

  @key
  @segment("resources")
  @visibility("read create")
  @doc("the resource name.")
  name: string;

  @doc("the resource description")
  description?: string;

  @doc("the resource type")
  type: string;
}

@doc("the resource array model")
model ResourceArray is Resource[];

@route("/cadl-foo")
@doc("Cadl Foo")
interface FooOp {
  @scenario
  @scenarioDoc("Creates a new resource or updates an existing one.")
  @doc("Creates a new resource or updates an existing one.")
  createOrUpdate is ResourceCreateOrReplace<Resource>;

  @scenario 
  @scenarioDoc("Gets the details of a resource.")
  @doc("Gets the details of a resource.")
  get is ResourceRead<Resource>;

  @scenario
  @scenarioDoc("Deletes a resource.")
  @doc("Deletes a resource.")
  delete is ResourceDelete<Resource>;

  @scenario
  @scenarioDoc("Lists the existing resources.")
  @doc("Lists the existing resources.")
  list is ResourceList<Resource>;
}

@client({ name: "FooClient", service: Cadl.MultiClient})
@operationGroup
interface WriteOperations {
    createOrUpdateResource is FooOp.createOrUpdate;
    deleteResource is FooOp.delete;

}

@client({ name: "BarClient", service: Cadl.MultiClient})
@operationGroup 
interface ReadOperations {
    getResource is FooOp.get;
    listResources is FooOp.list;
}
