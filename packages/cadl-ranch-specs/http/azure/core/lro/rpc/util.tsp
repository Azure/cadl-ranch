import "@azure-tools/typespec-azure-core";
using Azure.Core;
using TypeSpec.Versioning;

@useDependency(global.Azure.Core.Versions.v1_0_Preview_2)
namespace LocalCore {
  @doc("Metadata for long running operation status monitor locations")
  model LongRunningStatusLocation<TPollResponse extends TypeSpec.Reflection.Model> {
    @visibility("read")
    @pollingLocation
    @doc("The location for monitoring the operation state.")
    @TypeSpec.Http.header("Operation-Location")
    operationLocation: Rest.ResourceLocation<TPollResponse>;
  }

  @doc("Metadata for long running operation final resource locations")
  model LongRunningFinalLocation<TResponse extends TypeSpec.Reflection.Model> {
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
    TParams extends TypeSpec.Reflection.Model,
    TResponse extends TypeSpec.Reflection.Model,
    TPollResponse extends TypeSpec.Reflection.Model = TResponse,
    Traits extends TypeSpec.Reflection.Model = {}
  > is RpcOperation<
    TParams & Traits,
    Foundations.AcceptedResponse<Traits &
      LongRunningStatusLocation<TPollResponse> &
      Foundations.RetryAfterHeader> | TResponse,
    Traits
  >;

  #suppress "@azure-tools/typespec-azure-core/long-running-polling-operation-required" "Will use Azure.Core when LongRunningRpcOperation is ready"
  @Foundations.Private.needsRoute
  @doc("RPC operation placeholder needed until LongRunningRpcOperation is ready")
  op RpcOperation<
    TParams extends TypeSpec.Reflection.Model,
    TResponse,
    Traits extends TypeSpec.Reflection.Model = {},
    TErrorResponse = Azure.Core.Foundations.ErrorResponse
  > is Foundations.Operation<TParams, TResponse, Traits, TErrorResponse>;
}
