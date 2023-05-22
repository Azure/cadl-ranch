import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

@doc("Illustrates model that extends from record.")
@scenarioService("/type/model/record")
namespace Type.Model.RecordTest;

@doc("The model extends from Record<unknown> type.")
model ModelRecordUnknown extends Record<unknown> {
  name: string;
}

@route("/unknown")
interface RecordUnknown {
  @scenario
  @scenarioDoc("""
  Expeted request body:
  ```json
  {"name": "ModelRecordUnknown", "prop1": 32, "prop2": true, "prop3": "abc"}
  ```
  """)
  @post
  postModelRecordUnknown(@body input: ModelRecordUnknown): OkResponse;

  @scenario
  @scenarioDoc("""
  Expeted response body:
  ```json
  {"name": "ModelRecordUnknown", "prop1": 32, "prop2": true, "prop3": "abc"}
  ```
  """)
  @get
  getModelRecordUnknown(): ModelRecordUnknown;
}
