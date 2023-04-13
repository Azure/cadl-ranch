import "@typespec/http";
import "@typespec/versioning";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Versioning;
using Azure.ClientGenerator.Core;
using TypeSpec.Http;

@versioned(Versions)
@doc("""
  Test that we can grow up a service spec and service implementation into a multi-versioned service with full client support.

  We test the following configurations:
  - A client generated from the first service spec can call the first instance of a service with api version v1
  - A client generated from the first service spec can call the second instance of a service with api version v1
  - A client generated from the second service spec can call the second instance of a service with api version v1
  - A client generated from the second service spec can call the second instance of a service with api version v2
  """)
@client({
  name: "ResiliencyServiceDrivenClient",
})
@service
@server(
  "http://localhost:3000/resiliency/service-driven/client:v2/service:{serviceImplementationVersion}/api-version:{apiVersion}",
  "Testserver endpoint",
  {
    @doc("Pass in either 'v1' or 'v2'. This represents a version of the service implementation in history. 'v1' is for the implementation that was deployed when the service had only one api version. 'v2' is for the implementation when the service had api-versions 'v1' and 'v2'.")
    serviceImplementationVersion: string,

    @doc("Pass in either 'v1' or 'v2'. This represents the API version of a service.")
    apiVersion: string,
  }
)
namespace Resiliency.ServiceDriven.V2;

enum Versions {
  v1,
  v2,
}

model PostInput {
  url: string;
}

@route("/add-optional-params")
interface AddOptionalParams {
  @scenario
  @scenarioDoc("""
Test that you can add an optional param to an operation with no parameters. Don't pass in anything
""")
  @route("/from-none")
  @doc("Head request, no params.\n Initially has no query parameters. After evolution, a new optional query parameter is added")
  @head
  fromNone(
    @added(Versions.v2)
    @doc("I'm a new input optional parameter")
    @query
    `new-parameter`?: string
  ): NoContentResponse;

  @scenario
  @scenarioDoc("""
Show that you can call a GET HTTP endpoint.
This test has grow to a new optional parameter, and the generated code should be backward compatible with srv-driven-1.
The value you pass for the parameter is not verified by the mock server.
""")
  @route("/from-one-required")
  @doc("Get true Boolean value on path.\n Initially only has one required Query Parameter. After evolution, a new optional query parameter is added")
  @get
  fromOneRequired(
    @doc("I am a required parameter")
    @query
    parameter: string,

    @added(Versions.v2)
    @doc("I'm a new input optional parameter")
    @query
    `new-parameter`?: string
  ): NoContentResponse;

  @scenario
  @scenarioDoc("""
Show that you can call a GET HTTP endpoint.
This version has his main parameter optional first, making the grow-up story to two optionals.
The value you pass for the parameter is not verified by the mock server.
""")
  @route("/from-one-optional")
  @doc("Get true Boolean value on path.\n Initially has one optional query parameter. After evolution, a new optional query parameter is added")
  @get
  fromOneOptional(
    @doc("I am an optional parameter")
    @query
    optionalParam?: string,

    @added(Versions.v2)
    @doc("I'm a new input optional parameter")
    @query
    newParameter?: string
  ): NoContentResponse;
}
// In the updated version, I can take "image/jpeg" as input as well
@scenario
@scenarioDoc("""
Show that you can call a POST HTTP endpoint.
This test now accept both image/jpeg and application/json and is expected keeping backward compat with srv-driven-1.
Pass the JSON: `{"url": "http://example.org/myimage.jpeg"}` or a binary with content-type image/jpeg. The server do not check the binary.
""")
@route("/add-content-type")
@doc("POST a JSON or a JPEG")
@post
op addContentType(
  @header `content-type`: "application/json" | "image/jpeg",

  @doc("I am a body parameter. My only valid JSON entry is { url: \"http://example.org/myimage.jpeg\" }")
  @body
  parameter: PostInput
): NoContentResponse;

@scenario
@scenarioDoc("""
Show that you can call a GET HTTP endpoint.
This is a totally new operation in this API version.
""")
@added(Versions.v2)
@route("/add-operation")
@doc("I'm a new operation.\n Initially neither path or method exist for this operation. After evolution, this is a new method in a new path")
@delete
op addOperation(): NoContentResponse;
