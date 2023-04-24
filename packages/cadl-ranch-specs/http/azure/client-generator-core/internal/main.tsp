import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Test for internal decorator.")
@supportedBy("dpg")
@scenarioService("/azure/client-generator-core/internal")
namespace _Specs_.Azure.ClientGenerator.Core.Internal;

@doc("This is a model.")
model Model {
  name: string;
}

@doc("This is a model only used by internal operation.")
model ModelOnlyUsedByInternalOperation {
  id: string;
  name: string;
}

@scenario
@scenarioDoc("""
This is a normal operation return a model. The model should be generatated and exported, though it is also used in another internal operation.
Expected query parameter: name=<any string>
Expected response body:
```json
{
  "name": <any string>
}
```
""")
@route("/get")
@get
op get(@query name: string): Model;

@scenario
@scenarioDoc("""
This ia an internal operation. The operation should be generated but not exposed.
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
@global.Azure.ClientGenerator.Core.internal
op getInternal(@query name: string): Model;

@scenario
@scenarioDoc("""
This is an internal operation return a model. The model is only used in this internal operation. The operation and model should be generated but not exposed.
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
@global.Azure.ClientGenerator.Core.internal
op postInternal(@body body: ModelOnlyUsedByInternalOperation): ModelOnlyUsedByInternalOperation;
