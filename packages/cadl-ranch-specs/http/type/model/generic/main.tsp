import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Illustrates the model generic cases.")
@scenarioService("/type/model/generic")
namespace Type.Model.Generic;

model NumericType<T extends numeric> {
  @doc("This model is used to perform facet processing on fields based on a specified range of values.")
  values: T[];
  value: T;
}

@doc("Facets an int32 field by the specified value ranges.")
model Int32Type extends NumericType<int32> {
  @doc("The facet type.")
  kind: "Int32Values";
}

@scenario
@scenarioDoc("""
Expected input body:
```json
{
  "input": {
    "kind": "Int32Values",
    "values": 
    [
      1234
    ],
    "value": 1234,
    "field": "<field>"
  }
}

Expected response body:
```json
{
  "input": {
    "kind": "Int32Values",
    "values": 
    [
      1234
    ],
    "value": 1234,
    "field": "<field>"
}
```
""")
@route("/genericType")
@put
op genericType(@body input: Int32Type): void;
