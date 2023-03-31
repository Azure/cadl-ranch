import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

@doc("Test for the spread operator.")
@supportedBy("dpg")
@scenarioService("/spread")
namespace Spread;

@doc("This is a simple model.")
model ModelBodyParameter {
  name: string;
}

@scenario
@scenarioDoc("""
Test case for spread named model. Should generate request body model named ModelBodyParameter.

Expected request body:
```json
{ "name": "foo" }
```
""")
@route("/model/request-body")
@put
op spreadModelAsRequestBody(...ModelBodyParameter): OkResponse;

@doc("This is a simple model including path parameter.")
model ModelRequestParamter {
  @path
  id: string;

  @header
  `x-ms-test-header`: string;
  name: string;
}

@scenario
@scenarioDoc("""
Test case for spread named model with path and header parameter. 

Expected path parameter: id="1"
Expected header parameter: x-ms-test-header="bar"
Expected request body:
```json
{ "name": "foo" }
```
""")
@route("/model/request-parameter/{id}")
@put
op spreadModelAsRequestParameter(...ModelRequestParamter): OkResponse;

alias AliasBodyParameter = {
  name: string;
};

@scenario
@scenarioDoc("""
Test case for spread alias. 

Expected request body:
```json
{ "name": "foo" }
```
""")
@route("/alias/request-body")
@put
op spreadAliasAsRequestBody(...AliasBodyParameter): OkResponse;

alias AliasRequestParameter = {
  @path
  id: string;

  @header
  `x-ms-test-header`: string;
  name: string;
};

@scenario
@scenarioDoc("""
Test case for spread alias with path and header parameter. 

Expected path parameter: id="1"
Expected header parameter: x-ms-test-header="bar"
Expected request body:
```json
{ "name": "foo" }
```
""")
@route("/alias/request-parameter/{id}")
@put
op spreadAliasAsRequestParameter(...AliasRequestParameter): OkResponse;

alias AliasMultipleRequestParameters = {
  @path
  id: string;

  @header
  `x-ms-test-header`: string;
  prop1: string;
  prop2: string;
  prop3: string;
  prop4: string;
  prop5: string;
  prop6: string;
};

@scenario
@scenarioDoc("""
Test case for spread alias including 6 parameters. May handle as property bag for these parameters.

Expected path parameter: id="1"
Expected header parameter: x-ms-test-header="bar"
Expected request body:
```json
{
  "prop1":"foo1",
  "prop2":"foo2",
  "prop3":"foo3",
  "prop4":"foo4",
  "prop5":"foo5",
  "prop6":"foo6"
}
```
""")
@route("/alias/multiple-parameters/{id}")
@put
op spreadAliasWithMultipleParameters(...AliasMultipleRequestParameters): OkResponse;

@doc("This is a simple model.")
model ModelParameter {
  name: string;
}

alias AliasNestedSpreadParameter = {
  @path
  id: string;

  @header
  `x-ms-test-header`: string;
  ...ModelParameter;
};

@scenario
@scenarioDoc("""
Test case for spread alias with nested spread model as body parameter. 

Expected path parameter: id="1"
Expected header parameter: x-ms-test-header="bar"
Expected request body:
```json
{ "name": "foo" }
```
""")
@route("/alias/nested-spread-parameter/{id}")
@put
op spreadAliasNestedSpreadModelParameter(...AliasNestedSpreadParameter): OkResponse;
