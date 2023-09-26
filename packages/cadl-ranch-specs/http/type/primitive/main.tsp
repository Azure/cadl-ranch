import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

@scenarioService("/type/primitive")
namespace Type.Primitive;

@route("/string")
interface String {
  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc("Expect to handle a string value. Mock api will return 'ok'")
  @get
  @doc("getStringValue")
  getStringValue(): string;

  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc("Expect to send a string value. Mock api expect to receive 'test'")
  @put
  @doc("putStringValue")
  putStringValue(@body @doc("_") body: string): void;
}

@route("/boolean")
interface Boolean {
  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc("Expect to handle a boolean value. Mock api will return true ")
  @get
  @doc("getStringValue")
  getBooleanValue(): boolean;

  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc("Expect to send a boolean value. Mock api expect to receive 'true'")
  @put
  @doc("putBooleanValue")
  putBooleanValue(@body @doc("_") body: boolean): void;
}

@route("/unknown")
interface Unknown {
  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc("Expect to handle a unknown type value. Mock api will return 'test'")
  @get
  @doc("getUnknownValue")
  getUnknownValue(): unknown;

  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc("Expect to send a string value. Mock api expect to receive 'test'")
  @put
  @doc("putUnknownValue")
  putUnknownValue(@body @doc("_") body: unknown): void;
}
