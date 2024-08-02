import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

/**
 * Illustrates the model generic cases. There is a base generic type and an instantiated type extending from it.
 */
@scenarioService("/type/model/generic")
namespace Type.Model.Generic;

/**
 * A template model for handling numeric types.
 */
model NumericType<T extends numeric> {
  /**
   * An array of numeric values.
   */
  values: T[];

  value: T;
}

/**
 * The parameters for the generic type operation.
 */
model Int32Type extends NumericType<int32> {
  /**
   * The Kind of the Int32Type.
   */
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
