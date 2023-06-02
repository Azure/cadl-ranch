import "@typespec/rest";
import "@azure-tools/typespec-client-generator-core";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;
using TypeSpec.Rest;
using Azure.ClientGenerator;
using Azure.ClientGenerator.Core;

@doc("""
  Test that we can use @client and @operationGroup decorators to customize client side code structure, such as:
  1. have everything as default.
  2. to rename client or operation group
  3. one client can have more than one operations groups
  4. split one interface into two clients
  5. have two clients with operations come from different interfaces
  6. have two clients with a hierarchy relation.
  """)
@server(
  "http://localhost:3000/client/structure/{client}",
  "",
  {
    client: string,
  }
)
@service({
  title: "MultiClient",
  version: "1.0.0",
})
namespace Client.Structure.Service;

#suppress "@azure-tools/cadl-ranch-expect/missing-scenario" "This is by design those operations get defined as scenarios in the client"
@route("/one") op one(): void;

#suppress "@azure-tools/cadl-ranch-expect/missing-scenario" "This is by design those operations get defined as scenarios in the client"
@route("/two") op two(): void;

interface Foo {
  #suppress "@azure-tools/cadl-ranch-expect/missing-scenario" "This is by design those operations get defined as scenarios in the client"
  @route("/three") three(): void;

  #suppress "@azure-tools/cadl-ranch-expect/missing-scenario" "This is by design those operations get defined as scenarios in the client"
  @route("/four") four(): void;
}

interface Bar {
  #suppress "@azure-tools/cadl-ranch-expect/missing-scenario" "This is by design those operations get defined as scenarios in the client"
  @route("/five") five(): void;
  #suppress "@azure-tools/cadl-ranch-expect/missing-scenario" "This is by design those operations get defined as scenarios in the client"
  @route("/six") six(): void;
}
