import "../common/service.tsp";
import "@azure-tools/typespec-client-generator-core";

using Azure.ClientGenerator.Core;

@scenarioDoc("""
  This is to show we can have more than one operation group in a client. The client side should be able to call the api like
  ```ts
  const client = new RenamedOperationClient();

  client.renamedOne();
  client.renamedThree();
  client.renamedFive();

  client.group.renamedTwo();
  client.group.renamedFour();
  client.group.renamedSix();
  ```
  """)
@client({
  name: "RenamedOperationClient",
  service: Client.Structure.Service,
})
@scenario
namespace Client.Structure.RenamedOperation;

// Those operations are renamed at the root
op renamedOne is Client.Structure.Service.one;
op renamedThree is Client.Structure.Service.Foo.three;
op renamedFive is Client.Structure.Service.Foo.three;

// Those operations are renamed inside an operation group
@operationGroup
interface Group {
  renamedOne is Client.Structure.Service.one;
  renamedThree is Client.Structure.Service.Foo.three;
  renamedFive is Client.Structure.Service.Foo.three;
}
