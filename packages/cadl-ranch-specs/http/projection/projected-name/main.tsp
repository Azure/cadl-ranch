import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Projection")
@supportedBy("dpg")
@scenarioService("/projection/projected-name")
namespace Projection.ProjectedName;

@route("/property")
@operationGroup
namespace Property {
  model LanguageProjectedNameModel {
    @doc("Pass in true")
    @projectedName("client", "_DoNotUseMeAsAName_") // Should be ignored
    @projectedName("csharp", "CSName")
    @projectedName("go", "GoName")
    @projectedName("java", "JavaName")
    @projectedName("javascript", "TSName")
    @projectedName("python", "python_name")
    defaultName: boolean;
  }

  model JsonProjectedNameModel {
    @doc("Pass in true")
    @projectedName("json", "wireName")
    defaultName: boolean;
  }

  model ClientProjectedNameModel {
    @doc("Pass in true")
    @projectedName("client", "clientName")
    defaultName: boolean;
  }

  model JsonAndClientProjectedNameModel {
    @doc("Pass in true")
    @projectedName("client", "clientName")
    @projectedName("json", "wireName")
    defaultName: boolean;
  }

  @scenario
  @scenarioDoc("""
  Testing that we can project the JSON name on the wire from defaultName -> wireName.
  Your generated SDK should generate JsonProjectedNameModel with one property `defaultName` with wire name `wireName`.

  Expected request body:
  ```json
  {"wireName": true}
  ```
  """)
  @route("/json")
  @post
  op json(...JsonProjectedNameModel): NoContentResponse;

  @scenario
  @scenarioDoc("""
Testing that we can project the client name in our generated SDKs.
Your generated SDK should generate ClientProjectedNameModel with one property `clientName` with wire name `defaultName`.

Expected request body:
```json
{"defaultName": true}
```
""")
  @route("/client")
  @post
  op client(...ClientProjectedNameModel): NoContentResponse;

  @scenario
  @scenarioDoc("""
Testing that we can project the language specific name in our generated SDKs.
Your generated SDK should generate ClientProjectedNameModel with one property with your language specific property name and wire name `defaultName`.

Expected request body:
```json
{"defaultName": true}
```
""")
  @route("/language")
  @post
  op language(...LanguageProjectedNameModel): NoContentResponse;

  @scenario
  @scenarioDoc("""
Testing that we can project the client name and the wire name.
Your generated SDK should generate JsonAndClientProjectedNameModel with one property with client name `clientName` and wire name `wireName`.

Expected request body:
```json
{"wireName": true}
```
""")
  @route("/json-and-client")
  @post
  op jsonAndClient(...JsonAndClientProjectedNameModel): NoContentResponse;
}

// May add query/header project after https://github.com/microsoft/cadl/issues/1487

@scenario
@scenarioDoc("""
Testing that we can project the operation name.
Your generated SDK should generate an operation called `clientName`.

Expected status code: 204
""")
@route("/operation")
@projectedName("client", "clientName")
@post
op operation(): NoContentResponse;

@scenario
@scenarioDoc("""
Testing that we can project a parameter name.
Your generated SDK should generate an operation `parameter` with a single parameter called `clientName`.

Expected query parameter: `default-name="true"`

""")
@route("/parameter")
@post
op parameter(
  @projectedName("client", "clientName")
  @query
  `default-name`: string,
): NoContentResponse;

@route("/model")
@operationGroup
namespace Model {
  @projectedName("client", "_NotUseMeAsAName_") // Should be ignored
  @projectedName("csharp", "CSModel")
  @projectedName("go", "GoModel")
  @projectedName("java", "JavaModel")
  @projectedName("javascript", "TSModel")
  @projectedName("python", "PythonModel")
  model ModelWithLanguageProjectedName {
    @doc("Pass in true")
    defaultName: boolean;
  }

  @projectedName("client", "ClientModel")
  model ModelWithClientProjectedName {
    @doc("Pass in true")
    defaultName: boolean;
  }

  @scenario
  @scenarioDoc("""
Testing that we can project the client name in our generated SDKs.
Your generated SDK should generate the model with name `ClientModel`.

Expected request body:
```json
{"defaultName": true}
```
""")
  @route("/client")
  @post
  op client(...ModelWithClientProjectedName): NoContentResponse;

  @scenario
  @scenarioDoc("""
Testing that we can project the language specific name in our generated SDKs.
Your generated SDK should generate the model with your language specific model name.

Expected request body:
```json
{"defaultName": true}
```
""")
  @route("/language")
  @post
  op language(...ModelWithLanguageProjectedName): NoContentResponse;
}
