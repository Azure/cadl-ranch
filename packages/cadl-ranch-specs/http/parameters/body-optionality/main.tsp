import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Test describing optionality of the request body.")
@supportedBy("dpg")
@scenarioService("/parameters/body-optionality")
namespace Parameters.BodyOptionality;

model BodyModel {
  name: string;
}

@scenario
@scenarioDoc("""
  Scenario defining how an explicit required body parameter is specified.
  
  Expected request body:
  ```json
  { "name": "foo" }
  ```
  """)
@route("/required-explicit")
@post
op requiredExplicit(@body body: BodyModel): NoContentResponse;

@scenario
@scenarioDoc("""
  Scenario defining how an explicit optional body parameter is specified.
  
  Expected request body for `set`
  ```json
  { "name": "foo" }
  ```
  
  Expected no request body for `omit`
  """)
@operationGroup
@route("/optional-explicit")
namespace OptionalExplicit {
  @route("/set")
  @post
  op set(@body body?: BodyModel): NoContentResponse;

  @route("/omit")
  @post
  op omit(@body body?: BodyModel): NoContentResponse;
}

@scenario
@scenarioDoc("""
  Test scenario for using a combination of required parameters first and optional parameters later.
  
  Should generate an operation like below:
    ```
    orderingWithRequiredStart(start: string, end?: string)
    ```
  
  Expected parameter: api-version=2022-12-01-preview
  Expected request body:
  ```json
  { "start": "required" }
  ```
  
  Another scenario using a combination of optional parameters first and required parameters later
  
  Should generate an operation like below:
    ```
    orderingWithOptionalStart(end: string, start?: string)
    ```
  Expected request body:
  ```json
  { "end": "required" }
  ```
  """)
@operationGroup
@route("/optional-ordering")
namespace OptionalityOrdering {
  @route("/startwithequired")
  @head
  op OrderingWithRequiredStart(start: string, end?: string): void;

  @route("/startwithoptional")
  @head
  op OrderingWithOptionalStart(start?: string, end: string): void;
}

@scenario
@scenarioDoc("""
  Scenario defining how an implicit required body parameter is specified.
    
  Expected request body:
  ```json
  { "name": "foo" }
  ```
  """)
@route("/required-implicit")
@post
op requiredImplicit(...BodyModel): NoContentResponse;
