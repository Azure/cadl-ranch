import "../common/main.tsp";
import "@azure-tools/typespec-client-generator-core";

using Cadl.MultiClient;
using Azure.ClientGenerator.Core;

@doc("""
  This is to show how we can have two parallel subclients with operations that come from different interfaces. The client side should be able to call the api like
  const client1 = new FooClient();
  const client2 = new BarClient();
  client1.createOrUpdate()
  client1.createWithHeaders();
  client2.get() 
  client2.getArray() 
  """)
@client({ name: "FooClient", service: Cadl.MultiClient})
interface WriteOperations {
    createOrUpdate is FooOp.createOrUpdate;
    delete is FooOp.delete;
    #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing multiple subclients"
    createWithHeaders is BarOp.createWithHeaders;
    #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing multiple subclients"
    deleteWithHeaders is BarOp.deleteWithHeaders;

}

@client({ name: "BarClient", service: Cadl.MultiClient})
interface ReadOperations {
    get is FooOp.get;
    list is FooOp.list;
    #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing multiple subclients"
    getArray is BarOp.getArray;
    #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing multiple subclients"
    getBinary is BarOp.getBinary;
}
