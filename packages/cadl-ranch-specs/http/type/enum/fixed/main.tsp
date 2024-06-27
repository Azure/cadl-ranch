import "@typespec/http";
import "@azure-tools/typespec-azure-core";
import "@azure-tools/cadl-ranch-expect";

using Azure.Core;
using TypeSpec.Http;

@scenarioService("/type/enum/fixed")
namespace Type.Enum.Fixed;

#suppress "@azure-tools/typespec-azure-core/use-extensible-enum" "For testing"
@doc("Days of the week")
enum DaysOfWeekEnum {
  @doc("Monday.")
  Monday,

  @doc("Tuesday.")
  Tuesday,

  @doc("Wednesday.")
  Wednesday,

  @doc("Thursday.")
  Thursday,

  @doc("Friday.")
  Friday,

  @doc("Saturday.")
  Saturday,

  @doc("Sunday.")
  Sunday,
}

@doc("Fixed int enum")
enum FixedIntEnum {
  One: 1,
  Two: 2,
  Four: 4,
}

@doc("Fixed float enum")
enum FixedFloatEnum {
  One: 1.1,
  Two: 2.1,
  Four: 4.0,
}

@route("/string")
interface String {
  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc("Expect to handle a known value. Mock api will return 'Monday'")
  @get
  @route("/known-value")
  @doc("getKnownValue")
  getKnownValue(): DaysOfWeekEnum;

  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc("Expect to send a known value. Mock api expect to receive 'Monday'")
  @put
  @route("/known-value")
  @doc("putKnownValue")
  putKnownValue(@body @doc("_") body: DaysOfWeekEnum): void;

  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc("Expect to handle an unknown value. Mock api expect to receive 'Weekend'")
  @put
  @route("/unknown-value")
  @doc("putUnknownValue")
  putUnknownValue(@body @doc("_") body: DaysOfWeekEnum): void;
}

@route("/int")
interface Int {
  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc("Expect to handle a known value. Mock api will return '1'")
  @get
  @route("/known-value")
  @doc("getKnownValue")
  getKnownValue(): FixedIntEnum;

  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc("Expect to send a known value. Mock api expect to receive '1'")
  @put
  @route("/known-value")
  @doc("putKnownValue")
  putKnownValue(@body @doc("_") body: FixedIntEnum): void;

  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc("Expect to handle an unknown value. Mock api expect to receive '6'")
  @put
  @route("/unknown-value")
  @doc("putUnknownValue")
  putUnknownValue(@body @doc("_") body: FixedIntEnum): void;
}

@route("/float")
interface Float {
  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc("Expect to handle a known value. Mock api will return '1.1'")
  @get
  @route("/known-value")
  @doc("getKnownValue")
  getKnownValue(): FixedFloatEnum;

  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc("Expect to send a known value. Mock api expect to receive '1.1'")
  @put
  @route("/known-value")
  @doc("putKnownValue")
  putKnownValue(@body @doc("_") body: FixedFloatEnum): void;

  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc("Expect to handle an unknown value. Mock api expect to receive '6.1'")
  @put
  @route("/unknown-value")
  @doc("putUnknownValue")
  putUnknownValue(@body @doc("_") body: FixedFloatEnum): void;
}
