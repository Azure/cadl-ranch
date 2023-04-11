import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-azure-core";

using TypeSpec.Http;
using Azure.Core;

@scenarioService("/lro/basic")
@doc("All the basic lro test shall be added in this file")
namespace Azure.Lro;

@doc("Details about a user.")
model User {
  @doc("The name of user.")
  name: string;
}

#suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
@scenario
@scenarioDoc("""
Expected final response body:
```json
{
  "name": "bob"
}
```
""")
@route("/put")
interface PollingSuccess {
  @doc("Test for basic lro of put")
  @pollingOperation(PollingSuccess.polling)
  @put
  create(): User;

  @doc("The polling url")
  @route("/polling")
  @get
  polling(): User;

  @doc("The final url")
  @get
  get(): User;
}
