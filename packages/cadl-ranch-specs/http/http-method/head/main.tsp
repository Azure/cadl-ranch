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
return 204 status code
""")
@route("/204")
@head
op head204(): NoContentResponse;

@scenario
@scenarioDoc("""
Test 404 response.
return 404 status code
""")
@route("/404")
@head
op head404(): NoContentResponse;
