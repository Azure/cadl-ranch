import "@azure-tools/typespec-azure-core";

using TypeSpec.Http;
using TypeSpec.Versioning;
using Azure.Core;

@useDependency(global.Azure.Core.Versions.v1_0_Preview_2)
namespace Local {
  // Ref https://github.com/Azure/azure-rest-api-specs/blob/main/specification/cognitiveservices/HealthInsights/healthinsights.common/primitives.tsp
  // Ref https://github.com/Azure/typespec-azure/issues/3108
  #suppress "@azure-tools/typespec-azure-core/long-running-polling-operation-required" "This is a template"
  @Foundations.Private.needsRoute
  @doc("Long running RPC operation template")
  op LongRunningLegacyOperation<
    TParams extends TypeSpec.Reflection.Model,
    TResponse
  > is Azure.Core.Foundations.Operation<
    TParams,
    Foundations.AcceptedResponse<Foundations.LongRunningStatusLocation & Foundations.RetryAfterHeader> | TResponse
  >;
}
