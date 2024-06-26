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

model workday {
  @doc("The day of the week")
  @visibility("read")
  day?: DaysOfWeekEnum;
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

  @scenario
  @scenarioDoc("Expect to handle a read-only required value. Mock api expect to return {day: 'Monday'}")
  @get
  @route("/readonly-required-value")
  getRequiredReadonlyValue(): {
    @body body: workday;
  };

  @scenario
  @scenarioDoc("Expect to handle a read-only optional value. Mock api expect to return {}")
  @get
  @route("/readonly-optional-value")
  getOptionalReadonlyValue(): {
    @body body: workday;
  };
}
