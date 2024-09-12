import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

/**
 * Describe client with `@clientInitialization`
 */
@supportedBy("dpg")
@scenarioService("/client/initialization")
@scenario
@scenarioDoc("""
  Testing that "SubClient" be initialized with "name" parameter,
  and the "action" operation under "SubClient" does not take "name" parameter.
  
  Use "client1" as "name" parameter in test.
  """)
namespace Client.Initialization;

model SubClientOptions {
  name: string;
}

@clientInitialization(SubClientOptions)
interface SubClient {
  @post
  @route("/sub-client/{name}:action")
  action(@path name: string): void;
}
