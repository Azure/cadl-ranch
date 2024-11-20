import "./main.tsp";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using global.Azure.ClientGenerator.Core;
using _Specs_.Azure.ClientGenerator.Core.ClientNamespace;

@scenario
@scenarioDoc("""
  Expected client namespace for clients:
  - ClientNamespaceFirstClient: Azure.ClientGenerator.Core.ClientNamespace
  - ClientNamespaceSecondClient: Azure.ClientGenerator.Core.ClientNamespace.Second
  
  Expected client namespace for models:
  - FirstClientResult: Azure.ClientGenerator.Core.ClientNamespace.First
  - SecondClientResult: Azure.ClientGenerator.Core.ClientNamespace.Second
  - SecondClientEnumType: Azure.ClientGenerator.Core.ClientNamespace.Second.Sub
  """)
namespace Client;

@client({
  name: "ClientNamespaceFirstClient",
  service: _Specs_.Azure.ClientGenerator.Core.ClientNamespace,
})
@clientNamespace("azure.clientgenerator.core.clientnamespace", "java")
interface ClientNamespaceFirstClient {
  get is First.get;
}
@@clientNamespace(FirstModel, "azure.clientgenerator.core.clientnamespace.firstt", "java");

@client({
  name: "ClientNamespaceSecondClient",
  service: _Specs_.Azure.ClientGenerator.Core.ClientNamespace,
})
@clientNamespace("azure.clientgenerator.core.clientnamespace.second", "java")
namespace ClientNamespaceSecondClient {
  op get is _Specs_.Azure.ClientGenerator.Core.ClientNamespace.Second.get;
}
@@clientNamespace(Second.Model, "azure.clientgenerator.core.clientnamespace.second", "java");
@@clientNamespace(Second.Model.SecondClientEnumType, "azure.clientgenerator.core.clientnamespace.second.sub", "java");
