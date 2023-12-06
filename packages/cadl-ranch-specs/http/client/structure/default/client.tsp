import "./main.tsp";
import "@azure-tools/typespec-client-generator-core";

@@scenario(Client.Structure.Service);
@@scenarioDoc(Client.Structure.Service,
  """
  This is to show that if we don't do any customization. The client side should be able to call the api like
  ```ts
  const client = new ServiceClient("default");
  client.one();
  client.two();
  client.three();
  client.four();
  client.five();
  client.six();
  ```
  """
);
