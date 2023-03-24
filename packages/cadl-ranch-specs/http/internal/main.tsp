import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Test for internal decorator.")
@supportedBy("dpg")
@scenarioService("/internal")
namespace Internal;

@doc("This is an internal model.")
@internal
model InternalModel {
  name: string;
}

@doc("This is a non-internal model only used by internal operation.")
model ModelOnlyUsedByInternalOperation {
  id: string;
  name: string;
}

@scenario
@scenarioDoc("""
This test is testing an internal operation using an internal response model. The operation and model should be generated but not exposed.
Expected query parameter: name=<any string>
Expected response body:
```json
{
  "name": <any string>
}
```
""")
@route("/getInternal")
@get
@internal
op getInternal(@query name: string): InternalModel;

@scenario
@scenarioDoc("""
This test is testing an internal operation using a non-internal model. The model is only used in this internal operation. The operation and model should be generated but not exposed.
Expected body: 
```json
{
  "id": 1,
  "name": <any string>
}
```
Expected response body:
```json
{
  "id": 1,
  "name": <any string>
}
```
""")
@route("/postInternal")
@post
@internal
op postInternal(@body body: ModelOnlyUsedByInternalOperation): ModelOnlyUsedByInternalOperation;
