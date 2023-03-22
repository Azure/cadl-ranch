import "@azure-tools/typespec-azure-core";
using Azure.Core;

namespace LocalCore {
  @doc("Long running RPC operation template")
  op LongRunningRpcOperation<
      TParams extends object,
      TResponse extends object,
      Traits extends object = {}
    > is RpcOperation<
      TParams & Traits,
      Foundations.AcceptedResponse<Traits &
                                  Foundations.LongRunningStatusLocation &
                                  Foundations.RetryAfterHeader &
                                  RepeatabilityResponseHeaders> | TResponse,
      Traits
    >;
}
