import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@scenarioService("/type/primitive")
namespace Type.Primitive;

@operationGroup
@route("/string")
interface String {
  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc("Expect to handle a string value. Mock api will return 'ok'")
  @get
  @doc("get string value")
  get(): string;

  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc("Expect to send a string value. Mock api expect to receive 'test'")
  @put
  @doc("put string value")
  put(@body @doc("_") body: string): void;
}

@operationGroup
@route("/boolean")
interface Boolean {
  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc("Expect to handle a boolean value. Mock api will return true ")
  @get
  @doc("get boolean value")
  get(): boolean;

  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc("Expect to send a boolean value. Mock api expect to receive 'true'")
  @put
  @doc("put boolean value")
  put(@body @doc("_") body: boolean): void;
}

@operationGroup
@route("/unknown")
interface Unknown {
  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc("Expect to handle a unknown type value. Mock api will return 'test'")
  @get
  @doc("get unknown value")
  get(): unknown;

  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc("Expect to send a string value. Mock api expect to receive 'test'")
  @put
  @doc("put unknown value")
  put(@body @doc("_") body: unknown): void;
}
