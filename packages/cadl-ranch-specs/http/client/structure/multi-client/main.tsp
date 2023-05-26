import "../common/service.tsp";
import "@azure-tools/typespec-client-generator-core";

using Azure.ClientGenerator.Core;

@scenarioDoc("""
  Include multiple clients in the same spec.
  ```ts
  const clientA = new ClientAClient();
  const clientB = new ClientBClient();

  clientA.renamedOne();
  clientA.renamedThree();
  clientA.renamedFive();

  clientB.renamedTwo();
  clientB.renamedFour();
  clientB.renamedSix();
  ```
  """)
@scenario
namespace Client.Structure.MutliClient;

@client({
  name: "ClientAClient",
  service: Client.Structure.Service,
})
interface ClientA {
  renamedOne is Client.Structure.Service.one;
  renamedThree is Client.Structure.Service.Foo.three;
  renamedFive is Client.Structure.Service.Foo.three;
}

@client({
  name: "ClientBClient",
  service: Client.Structure.Service,
})
interface ClientB {
  renamedOne is Client.Structure.Service.one;
  renamedThree is Client.Structure.Service.Foo.three;
  renamedFive is Client.Structure.Service.Foo.three;
}
