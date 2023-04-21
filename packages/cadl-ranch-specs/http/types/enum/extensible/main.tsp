import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

@scenarioService("/types/enum/extensible")
namespace Types.Enum.Extensible;

enum DaysOfWeekExtensibleEnum {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

@route("/string")
interface String {
  @scenario
  @scenarioDoc("Expect to handle a known value. Mock api will return 'Monday'")
  @get
  @route("/known-value")
  getKnownValue(): DaysOfWeekExtensibleEnum;

  @scenario
  @scenarioDoc("Expect to handle an unknown value. Mock api will return 'Weekend'")
  @get
  @route("/unknown-value")
  getUnknownValue(): DaysOfWeekExtensibleEnum;

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
