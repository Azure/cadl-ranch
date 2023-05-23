import "@typespec/rest";
import "@azure-tools/typespec-azure-core";
import "@azure-tools/typespec-client-generator-core";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;
using TypeSpec.Rest;
using Azure.Core;
using Azure.ClientGenerator;
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

// operation using Azure.Core
@Azure.ClientGenerator.Core.client({
  name: "FooClient",
  service: Cadl.MultiClient,
})
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

@Azure.ClientGenerator.Core.client({
  name: "BarClient",
  service: Cadl.MultiClient,
})
@doc("Bar")
@route("/cadl-bar")
interface BarOp {
  // binary
  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing global.Azure.Core.Page"
  @scenario
  @scenarioDoc("get binary data")
  @doc("get binary data")
  @route("/get-binary")
  @get
  getBinary(): OkResponse & {
    @header("content-type") contentType: "image/png";
    @body body: bytes;
  };

  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing global.Azure.Core.Page"
  @scenario
  @scenarioDoc("get array data")
  @doc("get array data")
  getArray(): ResourceArray;

  // response with headers
  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing global.Azure.Core.Page"
  @scenario
  @scenarioDoc("create with headers")
  @doc("create with headers")
  @route("/create-with-headers")
  @put
  createWithHeaders(): TypeSpec.Http.CreatedResponse & {
    @header("operation-location")
    operationLocation: ResourceLocation<Resource>;
    @body
    body: Resource;
  };

  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing global.Azure.Core.Page"
  @scenario
  @scenarioDoc("delete with headers")
  @doc("delete with headers")
  @route("/delete-with-headers")
  @delete
  deleteWithHeaders(): TypeSpec.Http.NoContentResponse & {
    @header("operation-location")
    operationLocation: ResourceLocation<Resource>;
  };

  @pollingOperation
  @scenario
  @scenarioDoc("polling operation")
  @doc("polling operation")
  @route("/status")
  @get
  getStatus(): OkResponse & {

  }
}