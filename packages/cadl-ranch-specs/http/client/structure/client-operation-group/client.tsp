import "./main.tsp";
import "@azure-tools/typespec-client-generator-core";

using Azure.ClientGenerator.Core;

@scenarioDoc("""
  This is to show we can have multiple clients, with multiple operation groups in each client.

  ```ts
  const client1 = new FirstClient("client-operation-group");

  client1.one();
  
  client1.group1.two();
  client1.group1.three();

  client1.group2.four();
  ```
  """)
@scenario
@client({
  name: "FirstClient",
  service: Client.Structure.Service,
})
namespace Client.Structure.ClientOperationGroup {
  op one is Client.Structure.Service.one;

  @operationGroup
  interface Group3 {
    two is Client.Structure.Service.two;
    three is Client.Structure.Service.Foo.three;
  }

  @operationGroup
  interface Group4 {
    four is Client.Structure.Service.Foo.four;
  }
}

@scenarioDoc("""
  This is to show we can have multiple clients, with multiple operation groups in each client.

  ```ts
  const client2 = new SubNamespace.SecondClient("client-operation-group");

  client2.five();
  client2.group3.six();
  ```
  """)
@scenario
@client({
  name: "SubNamespace.SecondClient",
  service: Client.Structure.Service,
})
namespace Client.Structure.ClientOperationGroup2 {
  op five is Client.Structure.Service.Bar.five;

  @operationGroup
  interface Group5 {
    six is Client.Structure.Service.Bar.six;
  }
}
