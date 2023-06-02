import "@typespec/http";
import "@typespec/versioning";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;
using TypeSpec.Versioning;

@doc("Illustrates OASIS repeatability headers")
@supportedBy("dpg")
@scenarioService("/special-headers/repeatability")
namespace SpecialHeaders.Repeatability;

@scenario
@scenarioDoc("""
Trait SupportsRepeatableRequests, that defines Repeatability-Request-ID and Repeatability-First-Sent.
""")
@doc("""
Trait SupportsRepeatableRequests, that defines Repeatability-Request-ID and Repeatability-First-Sent.
""")
@post
@route(":doSomething")
op doSomething(
  @header("Repeatability-Request-ID")
  repeatabilityRequestID: string,

  @header("Repeatability-First-Sent")
  repeatabilityFirstSent: utcDateTime
): NoContentResponse;
