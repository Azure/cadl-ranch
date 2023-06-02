import "@typespec/http";
import "@typespec/versioning";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-azure-core";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using TypeSpec.Rest;
using TypeSpec.Versioning;
using Azure.ClientGenerator.Core;
using Azure.Core;
using Azure.Core.Traits;

@doc("Illustrates OASIS repeatability headers")
@supportedBy("dpg")
@scenarioService("/special-headers/repeatability")
@useDependency(Azure.Core.Versions.v1_0_Preview_2)
namespace SpecialHeaders.Repeatability;

alias ServiceTraits = SupportsRepeatableRequests & NoClientRequestId & NoConditionalRequests;

alias Operations = ResourceOperations<ServiceTraits>;

namespace Repeatability {
  @doc("A widget.")
  @resource("widgets")
  model Widget {
    @key("widgetName")
    @doc("The widget name.")
    @visibility("read")
    name: string;

    @doc("The ID of the widget's manufacturer.")
    manufacturerId: string;
  }

  @scenario
  @scenarioDoc("""
  Trait SupportsRepeatableRequests, that defines Repeatability-Request-ID and Repeatability-First-Sent.
  """)
  @doc("""
  Trait SupportsRepeatableRequests, that defines Repeatability-Request-ID and Repeatability-First-Sent.
  Any widget name is valid.
  """)
  op doSomething is Operations.ResourceAction<Widget, {}, {}>;
}
