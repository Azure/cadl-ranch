import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Illustrates the model generic cases.")
@scenarioService("/type/model/generic")
namespace Type.Model.Generic;

@doc("Generic")
model Generic {
  @doc("A field to facet by, where the field is attributed as 'facetable'")
  field: string;
}

model NumericType<T extends numeric> extends Generic {
  @doc("The facet ranges to produce. The values must be listed in ascending order to get the expected results. For example, values=10,20 produces three buckets: one for base rate 0 up to but not including 10, one for 10 up to but not including 20, and one for 20 and higher.")
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
Send a GET request
Expected response body:
```json
{
  "input": {
    "kind":"Int32Values",
    "values": 
    [
      1234
    ],
    "value": 1234,
    "field": "<field>",
}
```
""")
@route("/genericType")
@get
op genericType(@body input: Int32Type): void;
