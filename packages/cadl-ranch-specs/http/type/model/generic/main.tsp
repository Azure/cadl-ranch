import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Illustrates the generic Type cases.")
@scenarioService("/type/model/generic")
namespace Type.Model.Generic;

@doc("A template model for handling numeric types.")
model NumericType<T extends numeric> {
  @doc("An array of numeric values.")
  values: T[];

  value: T;
}

@doc("The parameters for the generic type operation.")
model Int32Type extends NumericType<int32> {
  @doc("The Kind of the Int32Type.")
  kind: "Int32Values";
}

@scenario
@scenarioDoc("""
Expected input body:
```json
{
  "kind": "Int32Values",
  "values": 
  [
    1234
  ],
  "value": 1234
}
```
""")
@route("/genericType")
@put
op genericType(@body input: Int32Type): void;
