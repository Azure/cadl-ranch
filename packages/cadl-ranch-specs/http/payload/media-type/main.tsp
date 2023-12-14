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
  When the request body and response body are both bytes, the different media types would lead to different payloads.
  """)
@operationGroup
namespace BytesBody {
  @post
  @route("/sendBytesAsBinary")
  /**
   * Expected requsest body is the base64 encoding of "hello", it is "aGVsbG8=" without the quotes.
   */
  op sendBytesAsBinary(@header contentType: "application/octet-stream", @body bytes: bytes): OkResponse;

  @get
  @route("/getBytesAsBinary")
  /**
   * Expected response body is the base64 encoding of "hello", it is "aGVsbG8=" without the quotes.
   */
  op getBytesAsBinary(): {
    @header contentType: "application/octet-stream";
    @body bytes: bytes;
  };

  @post
  @route("/sendBytesAsJson")
  /**
   * Expected requsest body is the base64 encoding of "hello", it is "aGVsbG8=" with the quotes.
   */
  op sendBytesAsJson(@header contentType: "application/json", @body bytes: bytes): OkResponse;

  @get
  @route("/getBytesAsJson")
  /**
   * Expected response body is the base64 encoding of "hello", it is "aGVsbG8=" with the quotes.
   */
  op getBytesAsJson(): {
    @header contentType: "application/json";
    @body bytes: bytes;
  };
}

@scenario
@scenarioDoc("""
  When the request body and response body are both strings, the different media types would lead to different payloads.
  """)
@operationGroup
namespace StringBody {
  @post
  @route("/sendStringAsText")
  /**
   * Expected request body is three characters "foo" without the quotes.
   */
  op sendStringAsText(@header contentType: "text/plain", @body text: string): OkResponse;

  @get
  @route("/getStringAsText")
  /**
   * Expected response body is three characters "foo" without the quotes.
   */
  op getStringAsText(): {
    @header contentType: "text/plain";
    @body text: string;
  };

  @post
  @route("/sendStringAsJson")
  /**
   * Expected request body is three characters "foo" with the quotes.
   */
  op sendStringAsJson(@header contentType: "application/json", @body text: string): OkResponse;

  @get
  @route("/getStringAsJson")
  /**
   * Expected response body is three characters "foo" with the quotes.
   */
  op getStringAsJson(): {
    @header contentType: "application/json";
    @body text: string;
  };

  // @post
  // @route("/sendStringAsBinary")
  // op sendStringAsBinary(@header contentType: "application/octet-stream", @body text: string): OkResponse;

  // @get
  // @route("/getStringAsBinary")
  // op getStringAsBinary(): {
  //   @header contentType: "application/octet-stream";
  //   @body text: string;
  // };
}