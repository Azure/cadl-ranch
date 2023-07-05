import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Non-standard azure request id header configurations.")
@supportedBy("dpg")
@scenarioService("/special-headers/request-id")
namespace SpecialHeaders.RequestId;

@scenario
@scenarioDoc("""
Non-standard request id header. SDK should not genreate `clientRequestId` paramerter but use policy to auto-set the header.
Expected header parameters:
- x-ms-client-request-id=<any uuid string>
""")
@doc("""
Non-standard request id header.
""")
@get
@route("/non-standard")
op nonStandard(
  @header("client-request-id")
  clientRequestId: string
): NoContentResponse;
