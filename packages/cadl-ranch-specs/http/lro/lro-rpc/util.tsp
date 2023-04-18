import "@azure-tools/typespec-azure-core";
using Azure.Core;

namespace LocalCore {
  @doc("Metadata for long running operation status monitor locations")
  model LongRunningStatusLocation<TPollResponse extends object> {
    @visibility("read")
    @pollingLocation
    @doc("The location for monitoring the operation state.")
    @TypeSpec.Http.header("Operation-Location")
    operationLocation: Rest.ResourceLocation<TPollResponse>;
  }

  @doc("Metadata for long running operation final resource locations")
  model LongRunningFinalLocation<TResponse extends object> {
    @visibility("read")
    @finalLocation
    @doc("The location for final resource location.")
    @TypeSpec.Http.header("Location")
    location: Rest.ResourceLocation<TResponse>;
  }

  #suppress "@azure-tools/cadl-ranch-expect/missing-scenario" "Will use Azure.Core when LongRunningRpcOperation is ready"
  #suppress "@azure-tools/typespec-azure-core/long-running-polling-operation-required" "Will use Azure.Core when LongRunningRpcOperation is ready"
  @doc("Long running RPC operation template")
  op LongRunningRpcOperation<
    TParams extends object,
    TResponse extends object,
    TPollResponse extends object = TResponse,
    Traits extends object = {}
  > is RpcOperation<
    TParams & Traits,
    Foundations.AcceptedResponse<Traits &
      LongRunningStatusLocation<TPollResponse> &
      Foundations.RetryAfterHeader> | TResponse,
    Traits
  >;
}
