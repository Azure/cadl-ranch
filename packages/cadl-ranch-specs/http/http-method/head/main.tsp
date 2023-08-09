import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Test the head operation.")
@supportedBy("dpg")
@scenarioService("/http-method/head")
namespace HttpMethod.Head;

@scenario
@scenarioDoc("""
Test 204 response.
Expected path parameter `id=valid`
return 204
""")
@route("/204")
@head
op head204(@path id: string): NoContentResponse;

@scenario
@scenarioDoc("""
Test 404 response.

Expected path parameter `id=invalid`
""")
@route("/404")
@head
op head404(@path id: string): NoContentResponse;
