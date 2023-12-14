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

// TODO: this file currently only contains string as body, we will add bytes body, model body soon.

@scenario
@scenarioDoc("""
  When the request body and response body are both strings, the different media types would lead to different payloads.
  """)
@operationGroup
namespace StringBody {
  /**
   * Expected request body is a string '{"Cat": "Meow"}'.
   */
  @post
  @route("/sendStringAsText")
  op sendStringAsText(@header contentType: "text/plain", @body text: string): OkResponse;

  /**
   * Expected response body is a string '{"Cat": "Meow"}'.
   */
  @get
  @route("/getStringAsText")
  op getStringAsText(): {
    @header contentType: "text/plain";
    @body text: string;
  };

  /**
   * Expected request body is "foo".
   */
  @post
  @route("/sendStringAsJson")
  op sendStringAsJson(@header contentType: "application/json", @body text: string): OkResponse;

  /**
   * Expected response body is "foo".
   */
  @get
  @route("/getStringAsJson")
  op getStringAsJson(): {
    @header contentType: "application/json";
    @body text: string;
  };
}
