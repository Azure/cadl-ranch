import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

@doc("Basic Hello World Test.")
@supportedBy("dpg")
@scenarioService("/hello")
namespace Hello;

@scenario
@scenarioDoc("""
This test is testing this payload is returned from the server
```json
"hello world"
```
""")
@route("/world")
op world(): string;
