import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

/**
 * Illustrates the model templated cases. There is a base templated type and an instantiated type extending from it.
 */
@scenarioService("/type/model/templated")
namespace Type.Model.Templated;

@friendlyName("{name}Template", T)
model NumericType<T extends numeric> {
  /**
   * An array of numeric values.
   */
  values: T[];

  value: T;
}

/**
 * An instantiated type representing int32 type.
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

Expected response body:
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
@route("/templatedType")
@put
op templatedType(@body input: Int32Type): Int32Type;
