import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Azure client request id header configurations.")
@supportedBy("dpg")
@scenarioService("/special-headers/client-request-id")
@scenario
@scenarioDoc("""
Test case for azure client request id header. SDK should not genreate `clientRequestId` paramerter but use policy to auto-set the header.
Expected header parameters:
- client-request-id=<any uuid string>
Expected response header:
- client-request-id=<uuid string same with request header>
""")
namespace SpecialHeaders.ClientRequestId;

@doc("""
Get operation with azure client request id header.
""")
@get
@route("/")
op get(
  @header("client-request-id")
  clientRequestId?: string,
): NoContentResponse;
