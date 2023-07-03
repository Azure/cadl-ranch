import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Different request id header configurations.")
@supportedBy("dpg")
@scenarioService("/special-headers/request-id")
namespace SpecialHeaders.RequestId;

@client
namespace DefaultClient {
  @scenario
  @scenarioDoc("""
Default situation: if no request id header configured, we use standard request id header.
""")
  @doc("""
Default request id header.
""")
  @post
  @route("/default")
  op default(): NoContentResponse;
}

@client
namespace StandardClient {
  @scenario
  @scenarioDoc("""
Standard request id header. SDK should not genreate `clientRequestId` paramerter but use policy to auto-set the header.
""")
  @doc("""
Standard request id header.
""")
  @post
  @route("/standard")
  op standard(
    @header("x-ms-client-request-id")
    clientRequestId: string
  ): NoContentResponse;
}

@client
namespace NonStandardClient {
  @scenario
  @scenarioDoc("""
Non-standard request id header. SDK should not genreate `clientRequestId` paramerter but use policy to auto-set the header.
""")
  @doc("""
Non-standard request id header.
""")
  @post
  @route("/non-standard")
  op nonStandard(
    @header("client-request-id")
    clientRequestId: string
  ): NoContentResponse;
}
