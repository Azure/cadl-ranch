import "@azure-tools/typespec-azure-core";

using TypeSpec.Http;
using TypeSpec.Versioning;
using Azure.Core;
using Azure.Core.Traits;
using Azure.Core.Traits.Private;

@useDependency(global.Azure.Core.Versions.v1_0_Preview_2)
namespace LocalCore {
  // Ref https://github.com/Azure/typespec-azure/pull/2983
  /**
   * A long-running remote procedure call (RPC) operation.
   * @template TParams Object describing the parameters of the operation.
   * @template TResponse Object describing the response of the operation.
   * @template TStatusResult Object describing the status result of the operation.
   * @template TStatusError Error response of the status operation. If not specified, the default error response is used.
   * @template Traits Object describing the traits of the operation.
   * @template TErrorResponse Error response of the operation. If not specified, the default error response is used.
   */
  #suppress "@azure-tools/typespec-azure-core/long-running-polling-operation-required" "Will use Azure.Core when LongRunningRpcOperation is ready"
  @doc("RPC operation placeholder needed until LongRunningRpcOperation is ready")
  @Foundations.Private.needsRoute
  @post
  op LongRunningRpcOperation<
    TParams,
    TResponse,
    TStatusResult,
    TStatusError = Foundations.Error,
    Traits extends TypeSpec.Reflection.Model = {},
    TErrorResponse = Azure.Core.Foundations.ErrorResponse
  > is Foundations.Operation<
    TParams & TraitProperties<Traits, TraitLocation.Parameters>,
    AcceptedResponse &
      ResourceOperationStatus<TResponse, TStatusResult, TStatusError> &
      Foundations.LongRunningStatusLocation<TStatusResult> &
      TraitProperties<Traits, TraitLocation.Response>,
    Traits,
    TErrorResponse
  >;
}
