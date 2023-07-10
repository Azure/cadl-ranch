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

@doc("This is a model only used by internal operation. Also, it is decorated with @include. It should be generated and exported.")
@global.Azure.ClientGenerator.Core.include
model InternalIncludeModel {
  name: string;
}

@doc("This is a model used by both public and internal operation. It should be generated and exported.")
model SharedModel {
  name: string;
}

@scenario
@scenarioDoc("""
This scenario contains a public operation. It should be generatated and exported.
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
This scenario contains an internal operation. It should be generated but not exposed.
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
op internalOnly(@query name: string): InternalModel;

@scenario
@scenarioDoc("""
This scenario contains an internal operation. It should be generated but not exposed.
Expected body parameter:
```json
{
  "name": <any string>
}
Expected response body:
```json
{
  "name": <any string>
}
```
""")
@route("/internal")
@post
@global.Azure.ClientGenerator.Core.internal
op internalWithIncludeModel(@body body: InternalIncludeModel): InternalIncludeModel;

@route("/shared")
@global.Azure.ClientGenerator.Core.operationGroup
@scenario
@scenarioDoc("""
This scenario contains two operations, one public, another internal. The public one should be generatated and exported while the internal one should be generated but not exposed.
Expected query parameter: name=<any string>
Expected response body:
```json
{
  "name": <any string>
}
```
""")
interface Shared {
  @route("/public")
  @get
  public(@query name: string): SharedModel;

  @route("/internal")
  @get
  @global.Azure.ClientGenerator.Core.internal
  internal(@query name: string): SharedModel;
}
