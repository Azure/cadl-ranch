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
This test is testing sending an int value in simple union property.
```json
{ "simpleUnion": 1 }
```
""")
@route("/model/request-body")
@put
op spreadModelAsRequestBody(...ModelBodyParameter): OkResponse;

@doc("This is a model including path parameter.")
model ModelRequestParamter {
  @path
  @visibility("update")
  id: string;

  @query
  tag: string;
  name: string;
}

@scenario
@scenarioDoc("""
This test is testing sending an int value in simple union property.
```json
{ "simpleUnion": 1 }
```
""")
@route("/model/request-parameter")
@put
op spreadModelAsParameter(...ModelRequestParamter): OkResponse;

alias AliasBodyParameter = {
  name: string;
};

@scenario
@scenarioDoc("""
This test is testing sending an int value in simple union property.
```json
{ "simpleUnion": 1 }
```
""")
@route("/alias/request-body")
@put
op spreadAliasAsBody(...AliasBodyParameter): OkResponse;

alias AliasRequestParameter = {
  @path
  @visibility("update")
  id: string;

  @query
  tag: string;
  name: string;
};

@scenario
@scenarioDoc("""
This test is testing sending an int value in simple union property.
```json
{ "simpleUnion": 1 }
```
""")
@route("/alias/request-parameter")
@put
op spreadAliasAsParameter(...AliasRequestParameter): OkResponse;

alias AliasMultipleRequestParameters = {
  @path
  @visibility("update")
  id: string;

  @query
  tag: string;
  prop1: string;
  prop2: string;
  prop3: string;
  prop4: string;
  prop5: string;
  prop6: string;
};

@scenario
@scenarioDoc("""
This test is testing sending an int value in simple union property.
```json
{ "simpleUnion": 1 }
```
""")
@route("/alias/multiple-parameters")
@put
op spreadAliasWithMultipleParameters(...AliasMultipleRequestParameters): OkResponse;
