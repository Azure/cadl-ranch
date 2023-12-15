import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

/**
 * Test the payload with different media types and different types of the payload itself.
 */
@supportedBy("dpg")
@scenarioService("/payload/media-type")
namespace Payload.MediaType;

@scenario
@scenarioDoc("""
  When the request body and response body are both strings, the different media types would lead to different payloads.
  """)
@operationGroup
@route("/stringBody")
namespace StringBody {
  /**
   * Expected request body is a string '{"Cat": "Meow"}'.
   */
  @post
  @route("/sendAsText")
  op sendAsText(@header contentType: "text/plain", @body text: string): OkResponse;

  /**
   * Expected response body is a string '{"Cat": "Meow"}'.
   */
  @get
  @route("/getAsText")
  op getAsText(): {
    @header contentType: "text/plain";
    @body text: string;
  };

  /**
   * Expected request body is "foo".
   */
  @post
  @route("/sendAsJson")
  op sendAsJson(@header contentType: "application/json", @body text: string): OkResponse;

  /**
   * Expected response body is "foo".
   */
  @get
  @route("/getAsJson")
  op getAsJson(): {
    @header contentType: "application/json";
    @body text: string;
  };
}
