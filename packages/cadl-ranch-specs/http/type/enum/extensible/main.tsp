import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

@scenarioService("/type/enum/extensible")
namespace Type.Enum.Extensible;

@doc("Days of the week")
union DaysOfWeekExtensibleEnum {
  string,

  @doc("Monday.")
  Monday: "Monday",

  @doc("Tuesday.")
  Tuesday: "Tuesday",

  @doc("Wednesday.")
  Wednesday: "Wednesday",

  @doc("Thursday.")
  Thursday: "Thursday",

  @doc("Friday.")
  Friday: "Friday",

  @doc("Saturday.")
  Saturday: "Saturday",

  @doc("Sunday.")
  Sunday: "Sunday",
}

model workday {
  @doc("The day of the week")
  @visibility("read")
  day?: DaysOfWeekExtensibleEnum;
}

@route("/string")
interface String {
  @scenario
  @scenarioDoc("Expect to handle a known value. Mock api will return 'Monday'")
  @get
  @route("/known-value")
  getKnownValue(): {
    @body body: DaysOfWeekExtensibleEnum;
  };

  @scenario
  @scenarioDoc("Expect to handle an unknown value. Mock api will return 'Weekend'")
  @get
  @route("/unknown-value")
  getUnknownValue(): {
    @body body: DaysOfWeekExtensibleEnum;
  };

  @scenario
  @scenarioDoc("Expect to send a known value. Mock api expect to receive 'Monday'")
  @put
  @route("/known-value")
  putKnownValue(@body body: DaysOfWeekExtensibleEnum): void;

  @scenario
  @scenarioDoc("Expect to handle an unknown value. Mock api expect to receive 'Weekend'")
  @put
  @route("/unknown-value")
  putUnknownValue(@body body: DaysOfWeekExtensibleEnum): void;

  @scenario
  @scenarioDoc("Expect to handle a read-only required value. Mock api expect to return {day: 'Monday'}")
  @get
  @route("/readonly-required-value")
  getRequiredReadonlyValue(): {
    @body body: workday;
  };

  @scenario
  @scenarioDoc("Expect to handle a read-only optional value. Mock api expect to return {}}")
  @get
  @route("/readonly-optional-value")
  getOptionalReadonlyValue(): {
    @body body: workday;
  };
}
