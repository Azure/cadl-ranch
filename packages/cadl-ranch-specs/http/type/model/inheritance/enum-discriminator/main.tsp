import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

@doc("Illustrates inheritance with enum discriminator.")
@scenarioService("/type/model/inheritance/enum-discriminator")
namespace Type.Model.Inheritance.EnumDiscriminator;

@doc("extensible enum type for discriminator")
enum DogKind {
  Golden: "golden",
}

@doc("Test extensible enum type for discriminator")
@discriminator("kind")
model Dog {
  kind: DogKind;
  weight: int32;
}

model Golden extends Dog {
  kind: DogKind.Golden;
}

@scenario
@scenarioDoc("""
Receive model with extensible enum discriminator type.
Expected response body:
```json

{"kind": "golden", "weight": 10}
```
""")
@route("/extensible-enum")
@get
op getModel(): Dog;

@scenario
@scenarioDoc("""
Send model with extensible enum discriminator type.
Expected request body:
```json

{"kind": "golden", "weight": 10}
```
""")
@route("/extensible-enum")
@put
op putModel(@body input: Dog): OkResponse;
