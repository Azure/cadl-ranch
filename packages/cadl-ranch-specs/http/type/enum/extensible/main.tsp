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

@doc("Extensible int enum")
union ExtensibleIntEnum {
  int32,
  One: 1,
  Two: 2,
  Four: 4,
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
}

@route("/int")
interface Int {
  @scenario
  @scenarioDoc("Expect to handle a known value. Mock api will return 1")
  @get
  @route("/known-value")
  getKnownValue(): {
    @body body: ExtensibleIntEnum;
  };

  @scenario
  @scenarioDoc("Expect to handle an unknown value. Mock api will return 3")
  @get
  @route("/unknown-value")
  getUnknownValue(): {
    @body body: ExtensibleIntEnum;
  };

  @scenario
  @scenarioDoc("Expect to send a known value. Mock api expect to receive 1")
  @put
  @route("/known-value")
  putKnownValue(@body body: ExtensibleIntEnum): void;

  @scenario
  @scenarioDoc("Expect to handle an unknown value. Mock api expect to receive 3")
  @put
  @route("/unknown-value")
  putUnknownValue(@body body: ExtensibleIntEnum): void;
}
