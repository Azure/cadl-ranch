import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Illustrates the model flatten cases.")
@scenarioService("/type/model/flatten")
namespace Type.Model.Flatten;

@doc("This is the model with one level of flattening.")
model FlattenModel {
  name: string;

  #suppress "deprecated" "@flattenProperty decorator is not recommended to use."
  @flattenProperty
  child: ChildModel;
}

@doc("This is the model with two levels of flattening.")
model NestedFlattenModel {
  name: string;

  #suppress "deprecated" "@flattenProperty decorator is not recommended to use."
  @flattenProperty
  child: ChildFlattenModel;
}

@doc("This is the child model to be flattened.")
model ChildModel {
  description: string;
  age: int32;
}

@doc("This is the child model to be flattened. And it has flattened property as well.")
model ChildFlattenModel {
  summary: string;

  #suppress "deprecated" "@flattenProperty decorator is not recommended to use."
  @flattenProperty
  child: ChildModel;
}

@scenario
@route("/flattenModel")
@scenarioDoc("""
Update and receive model with 1 level of flattening.
Expected input body:
```json
{
  "name": "foo",
  "child": {
    "description": "bar",
    "age": 10
  }
}
```

Expected response body:
```json
{
  "name": "test",
  "child": {
    "description": "test",
    "age": 1
  }
}
```
""")
@put
op putFlattenModel(@body input: FlattenModel): FlattenModel;

@scenario
@route("/nestedFlattenModel")
@scenarioDoc("""
Update and receive model with 2 levels of flattening.
Expected input body:
```json
{
  "name": "foo",
  "child": {
    "summary": "bar",
    "child": {
      "description": "test",
      "age": 10
    }
  }
}
```

Expected response body:
```json
{
  "name": "test",
  "child": {
    "summary": "test",
    "child": {
      "description": "foo",
      "age": 1
    }
  }
}
```
""")
@put
op putNestedFlattenModel(@body input: NestedFlattenModel): NestedFlattenModel;
