import "../common/main.tsp";
import "@azure-tools/typespec-client-generator-core";

using Cadl.MultiClient;
using Azure.ClientGenerator.Core;

@doc("""
  This is to show how we can split one interface into two sub clients. The client side should be able to call the api like
  const client1 = new FooClient();
  const client2 = new BarClient();
  client1.createOrUpdate()
  client2.list()
  client2.get() 
  client1.delete() 
  """)
@client({
  name: "FooClient",
  service: Cadl.MultiClient,
})
interface WriteOperations {
  createOrUpdate is FooOp.createOrUpdate;
  delete is FooOp.delete;
}

@client({
  name: "BarClient",
  service: Cadl.MultiClient,
})
interface ReadOperations {
  get is FooOp.get;
  list is FooOp.list;
}
