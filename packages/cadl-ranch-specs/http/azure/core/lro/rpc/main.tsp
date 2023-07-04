import "@azure-tools/typespec-azure-core";
import "@azure-tools/cadl-ranch-expect";
import "@typespec/rest";
import "@typespec/versioning";

using Azure.Core;
using global.Azure.Core.Traits;
using TypeSpec.Http;
using TypeSpec.Rest;
using TypeSpec.Versioning;

#suppress "@azure-tools/typespec-azure-core/casing-style" "For spec"
@doc("Illustrates bodies templated with Azure Core with long-running RPC operation")
@scenarioService(
  "/azure/core/lro/rpc",
  {
    versioned: Versions,
  }
)
namespace _Specs_.Azure.Core.Lro.Rpc;

@doc("The API version.")
enum Versions {
  @doc("The 2022-12-01-preview version.")
  @useDependency(global.Azure.Core.Versions.v1_0_Preview_2)
  v2022_12_01_preview: "2022-12-01-preview",
}

@doc("Options for the generation.")
model GenerationOptions {
  @doc("Prompt.")
  prompt: string;
}

model GenerationResponse is global.Azure.Core.Foundations.OperationStatus<GeneratonResult>;
// fix warning in Azure.Core.Foundations.OperationStatus
@@visibility(global.Azure.Core.Foundations.OperationStatus.id, "read");

@doc("Response of the generation.")
model GeneratonResult {
  @doc("The data.")
  data: string;
}

#suppress "@azure-tools/typespec-azure-core/long-running-polling-operation-required" "Operation link pollingOperation is not required for getLroMetadata"
@scenario
@doc("Generate data.")
@summary("Generate data.")
@scenarioDoc("""
Should generate model GenerationOptions and GeneratonResult.

Expected verb: POST
Expected request body:
```json
{
  "prompt": "text"
}
```

Expected status code: 202
Expected response header: operation-location={endpoint}/generations/operations/operation1
Expected response body:
```json
{
  "id": "operation1",
  "status": "InProgress"
}
```

Expected verb: GET
Expected URL: {endpoint}/generations/operations/operation1

Expected status code: 200
Expected response body:
```json
{
  "id": "operation1",
  "status": "InProgress"
}
```

Expected verb: GET
Expected URL: {endpoint}/generations/operations/operation1

Expected status code: 200
Expected response body:
```json
{
  "id": "operation1",
  "status": "Succeeded",
  "result": {
    "data": "text data"
  }
}
```
""")
@route("/generations:submit")
op longRunningRpc is global.Azure.Core.LongRunningRpcOperation<GenerationOptions, GenerationResponse, GeneratonResult>;
