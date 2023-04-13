import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

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
  "http://localhost:3000/resiliency/service-driven/client:v1/service:{serviceImplementationVersion}/api-version:{apiVersion}",
  "Testserver endpoint",
  {
    @doc("Pass in either 'v1' or 'v2'. This represents a version of the service implementation in history. 'v1' is for the implementation that was deployed when the service had only one api version. 'v2' is for the implementation when the service had api-versions 'v1' and 'v2'.")
    serviceImplementationVersion: string,

    @doc("Pass in either 'v1' or 'v2'. This represents the API version of a service.")
    apiVersion: string,
  }
)
namespace Resiliency.ServiceDriven.V1;

model PostInput {
  url: string;
}

@route("/add-optional-params")
interface AddOptionalParams {
  @scenario
  @scenarioDoc("""
Test that you can add an optional param to an operation with no parameters. Don't pass in anything
Will test the following configurations:
- Test that you can pass 
""")
  @route("/parameters")
  @doc("Head request, no params.\n Initially has no query parameters. After evolution, a new optional query parameter is added")
  @head
  fromNone(): NoContentResponse;

  @scenario
  @scenarioDoc("""
Test that you can add an optional param to an operation with a required parameter.
""")
  @route("/parameters")
  @doc("Get true Boolean value on path.\n Initially only has one required Query Parameter. After evolution, a new optional query parameter is added")
  @get
  fromOneRequired(
    @doc("I am a required parameter")
    @query
    parameter: string
  ): NoContentResponse;

  @scenario
  @scenarioDoc("""
Show that you can call a GET HTTP endpoint.
This version has his main parameter optional first, making the grow-up story to two optionals.
The value you pass for the parameter is not verified by the mock server.
""")
  @route("/moreParameters")
  @doc("Get true Boolean value on path.\n Initially has one optional query parameter. After evolution, a new optional query parameter is added")
  @get
  fromOneOptional(
    @doc("I am an optional parameter")
    @query
    optionalParam?: string
  ): NoContentResponse;
}

@scenario
@scenarioDoc("""
Show that you can call a POST HTTP endpoint.
This test is expected to grow to a new content-type as acceptable input while keeping backward compat in srv-driven-2.
Pass the JSON: `{"url": "http://example.org/myimage.jpeg"}`
""")
@route("/parameters/{contentTypePath}")
@doc("POST a JSON")
@post
op addContentType(
  @path contentTypePath: "json",

  @doc("I am a body parameter. My only valid JSON entry is { url: \"http://example.org/myimage.jpeg\" }")
  @body
  parameter: PostInput
): NoContentResponse;
