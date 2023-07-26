import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

@doc("Illustrates non-discriminator inheritance model.")
@scenarioService("/type/model/inheritance/non-discriminator")
namespace Type.Model.Inheritance.NonDiscriminator;

@doc("This is base model for non-discriminator normal multiple levels inheritance.")
model Pet {
  name: string;
}

@doc("The second level model in the normal multiple levels inheritance.")
model Cat extends Pet {
  age: int32;
}

@doc("The third level model in the normal multiple levels inheritance.")
model Siamese extends Cat {
  smart: boolean;
}

@scenario
@scenarioDoc("""
Generate and send model.
Expected input body:
```json
{"name": "abc", "age": 32, "smart": true}
```
""")
@route("/valid")
@post
op postValid(@body input: Siamese): OkResponse;

@scenario
@scenarioDoc("""
Generate and receive model.
Expected response body:
```json
{"name": "abc", "age": 32, "smart": true}
```
""")
@route("/valid")
@get
op getValid(): Siamese;

@scenario
@scenarioDoc("Generate, send, and receive round-trip bottom model.")
@route("/valid")
@put
op putValid(@body input: Siamese): Siamese;
