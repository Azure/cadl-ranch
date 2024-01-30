import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Projection")
@supportedBy("dpg")
@scenarioService("/projection/client-encoded-name")
namespace Projection.ClientEncodedName;

@route("/property")
@operationGroup
namespace Property {
  model LanguageClientEncodedNameModel {
    @doc("Pass in true")
    @clientName("_DoNotUseMeAsAName_") // Should be ignored
    @clientName("CSName", "csharp")
    @clientName("GoName", "go")
    @clientName("JavaName", "java")
    @clientName("TSName", "javascript")
    @clientName("python_name", "python")
    defaultName: boolean;
  }

  model JsonClientEncodedNameModel {
    @doc("Pass in true")
    @encodedName("application/json", "wireName")
    defaultName: boolean;
  }

  model ClientClientEncodedNameModel {
    @doc("Pass in true")
    @clientName("clientName")
    defaultName: boolean;
  }

  model JsonAndClientClientEncodedNameModel {
    @doc("Pass in true")
    @clientName("clientName")
    @encodedName("application/json", "wireName")
    defaultName: boolean;
  }

  @scenario
  @scenarioDoc("""
  Testing that we can project the JSON name on the wire from defaultName -> wireName.
  Your generated SDK should generate JsonClientEncodedNameModel with one property `defaultName` with wire name `wireName`.

  Expected request body:
  ```json
  {"wireName": true}
  ```
  """)
  @route("/json")
  @post
  op json(...JsonClientEncodedNameModel): NoContentResponse;

  @scenario
  @scenarioDoc("""
Testing that we can project the client name in our generated SDKs.
Your generated SDK should generate ClientClientEncodedNameModel with one property `clientName` with wire name `defaultName`.

Expected request body:
```json
{"defaultName": true}
```
""")
  @route("/client")
  @post
  op client(...ClientClientEncodedNameModel): NoContentResponse;

  @scenario
  @scenarioDoc("""
Testing that we can project the language specific name in our generated SDKs.
Your generated SDK should generate ClientClientEncodedNameModel with one property with your language specific property name and wire name `defaultName`.

Expected request body:
```json
{"defaultName": true}
```
""")
  @route("/language")
  @post
  op language(...LanguageClientEncodedNameModel): NoContentResponse;

  @scenario
  @scenarioDoc("""
Testing that we can project the client name and the wire name.
Your generated SDK should generate JsonAndClientClientEncodedNameModel with one property with client name `clientName` and wire name `wireName`.

Expected request body:
```json
{"wireName": true}
```
""")
  @route("/json-and-client")
  @post
  op jsonAndClient(...JsonAndClientClientEncodedNameModel): NoContentResponse;
}

// May add query/header project after https://github.com/microsoft/cadl/issues/1487

@scenario
@scenarioDoc("""
Testing that we can project the operation name.
Your generated SDK should generate an operation called `clientName`.

Expected status code: 204
""")
@route("/operation")
@clientName("clientName")
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
  @clientName("clientName")
  @query
  `default-name`: string,
): NoContentResponse;

@route("/model")
@operationGroup
namespace Model {
  @clientName("_NotUseMeAsAName_") // Should be ignored
  @clientName("CSModel", "csharp")
  @clientName("GoModel", "go")
  @clientName("JavaModel", "java")
  @clientName("TSModel", "javascript")
  @clientName("PythonModel", "python")
  model ModelWithLanguageClientEncodedName {
    @doc("Pass in true")
    defaultName: boolean;
  }

  @clientName("ClientModel")
  model ModelWithClientClientEncodedName {
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
  op client(...ModelWithClientClientEncodedName): NoContentResponse;

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
  op language(...ModelWithLanguageClientEncodedName): NoContentResponse;
}
