import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Projection")
@supportedBy("dpg")
@scenarioService("/projection/client-name-and-encoded-name")
namespace Projection.ClientNameAndEncodedName;

@route("/property")
@operationGroup
namespace Property {
  model LanguageClientNameModel {
    @doc("Pass in true")
    @clientName("CSName", "csharp")
    @clientName("GoName", "go")
    @clientName("JavaName", "java")
    @clientName("TSName", "javascript")
    @clientName("python_name", "python")
    defaultName: boolean;
  }

  model JsonEncodedNameModel {
    @doc("Pass in true")
    @encodedName("application/json", "wireName")
    defaultName: boolean;
  }

  model ClientNameModel {
    @doc("Pass in true")
    @clientName("clientName")
    defaultName: boolean;
  }

  model ClientNameAndJsonEncodedNameModel {
    @doc("Pass in true")
    @clientName("clientName")
    @encodedName("application/json", "wireName")
    defaultName: boolean;
  }

  @scenario
  @scenarioDoc("""
  Testing that we can project the JSON name on the wire from defaultName -> wireName.
  Your generated SDK should generate JsonEncodedNameModel with one property `defaultName` with wire name `wireName`.

  Expected request body:
  ```json
  {"wireName": true}
  ```
  """)
  @route("/json")
  @post
  op json(...JsonEncodedNameModel): NoContentResponse;

  @scenario
  @scenarioDoc("""
Testing that we can project the client name in our generated SDKs.
Your generated SDK should generate ClientNameModel with one property `clientName` with wire name `defaultName`.

Expected request body:
```json
{"defaultName": true}
```
""")
  @route("/client")
  @post
  op client(...ClientNameModel): NoContentResponse;

  @scenario
  @scenarioDoc("""
Testing that we can project the language specific name in our generated SDKs.
Your generated SDK should generate LanguageClientNameModel with one property with your language specific property name and wire name `defaultName`.

Expected request body:
```json
{"defaultName": true}
```
""")
  @route("/language")
  @post
  op language(...LanguageClientNameModel): NoContentResponse;

  @scenario
  @scenarioDoc("""
Testing that we can project the client name and the wire name.
Your generated SDK should generate ClientNameAndJsonEncodedNameModel with one property with client name `clientName` and wire name `wireName`.

Expected request body:
```json
{"wireName": true}
```
""")
  @route("/json-and-client")
  @post
  op jsonAndClient(...ClientNameAndJsonEncodedNameModel): NoContentResponse;
}

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

Expected query parameter: `defaultName="true"`

""")
@route("/parameter")
@post
op parameter(
  @clientName("clientName")
  @query
  defaultName: string,
): NoContentResponse;

@scenario
@scenarioDoc("""
Testing that we can project a header name.
Your generated SDK should generate an operation header `parameter` with a single parameter called `clientName`.

Expected header parameter: `default-name="true"`
Expected response header: `default-name="true"`
""")
@route("/header")
@post
op header(
  @clientName("clientName")
  @header
  `default-name`: string,
): {
  @clientName("clientName")
  @header
  `default-name`: string;
};

@route("/model")
@operationGroup
@clientName("ClientModel")
namespace Model {
  @clientName("CSModel", "csharp")
  @clientName("GoModel", "go")
  @clientName("JavaModel", "java")
  @clientName("TSModel", "javascript")
  @clientName("PythonModel", "python")
  model ModelWithLanguageClientName {
    @doc("Pass in true")
    defaultName: boolean;
  }

  @clientName("ClientModel")
  model ModelWithClientClientName {
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
  op client(...ModelWithClientClientName): NoContentResponse;

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
  op language(...ModelWithLanguageClientName): NoContentResponse;
}
