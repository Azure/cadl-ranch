import "../common/main.tsp";
import "@azure-tools/typespec-client-generator-core";

using Cadl.MultiClient;
using Azure.ClientGenerator.Core;
@doc("""
  This is to show how we can rename client and operations group and operations. The client side should be able to call the api like
  const client = new ResourceClient();
  client.fooOperations.createOrUpdateResource()
  client.fooOperations.listResources()
  client.fooOperations.getResource() 
  client.fooOperations.deleteResource() 
  """)
@client({
  name: "ResourceClient",
  service: Cadl.MultiClient,
})
@operationGroup
interface FooOperations {
  createOrUpdateResource is FooOp.createOrUpdate;
  getResource is FooOp.get;
  listResources is FooOp.list;
  deleteResource is FooOp.delete;
}
