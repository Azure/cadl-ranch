import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Test for internal decorator.")
@supportedBy("dpg")
@scenarioService("/azure/client-generator-core/internal")
namespace _Specs_.Azure.ClientGenerator.Core.Internal;

@doc("This is a model only used by public operation. It should be generated and exported.")
model PublicModel {
  name: string;
}

@doc("This is a model only used by internal operation. It should be generated but not exported.")
model InternalModel {
  name: string;
}

@doc("This is a model used by both public and internal operation. It should be generated and exported.")
model SharedModel {
  name: string;
}

@scenario
@scenarioDoc("""
This is a public operation. It should be generatated and exported.
Expected query parameter: name=<any string>
Expected response body:
```json
{
  "name": <any string>
}
```
""")
@route("/public")
@get
op publicOnly(@query name: string): PublicModel;

@scenario
@scenarioDoc("""
This is an internal operation. It should be generated but not exposed.
Expected query parameter: name=<any string>
Expected response body:
```json
{
  "name": <any string>
}
```
""")
@route("/internal")
@get
@global.Azure.ClientGenerator.Core.internal
op internalOnly(@query name: string): PublicModel;

@route("/shared")
interface Shared {
  @scenario
  @scenarioDoc("""
  This is a public operation. It should be generatated and exported.
  Expected query parameter: name=<any string>
  Expected response body:
  ```json
  {
    "name": <any string>
  }
  ```
  """)
  @route("/public")
  @get
  public(@query name: string): SharedModel;

  @scenario
  @scenarioDoc("""
  This is an internal operation. It should be generated but not exposed.
  Expected query parameter: name=<any string>
  Expected response body:
  ```json
  {
    "name": <any string>
  }
  ```
  """)
  @route("/internal")
  @get
  @global.Azure.ClientGenerator.Core.internal
  internal(@query name: string): SharedModel;
}
