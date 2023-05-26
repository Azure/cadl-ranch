import "../common/main.tsp";
import "@azure-tools/typespec-client-generator-core";

using Cadl.MultiClient;
using Azure.ClientGenerator.Core;

@doc("""
  This is to show we can have more than one operation group in a client. The client side should be able to call the api like
  const client = new ResourceClient();
  client.writeOperations.createOrUpdate()
  client.writeOperations.createWithHeaders()
  client.readOperations.get() 
  client.readOperations.getArray() 
  """)
@client({
  name: "ResourceClient",
  service: Cadl.MultiClient,
})
@operationGroup
interface WriteOperations {
  createOrUpdate is FooOp.createOrUpdate;
  delete is FooOp.delete;
  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing multiple subclients"
  createWithHeaders is BarOp.createWithHeaders;
  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing multiple subclients"
  deleteWithHeaders is BarOp.deleteWithHeaders;
}

@operationGroup
interface ReadOperations {
  get is FooOp.get;
  list is FooOp.list;
  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing multiple subclients"
  getArray is BarOp.getArray;
  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing multiple subclients"
  getBinary is BarOp.getBinary;
}
