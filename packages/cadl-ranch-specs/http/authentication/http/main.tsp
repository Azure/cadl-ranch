import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

@scenarioService("/authentication/http")
@doc("Illustrates clients generated with generic HTTP auth.")
@useAuth({
  type: AuthType.http,
  scheme: "SharedAccessKey",
})
namespace Authentication.Http;

@scenario
@scenarioDoc("Expects header 'Authorization': 'SharedAccessKey valid-key'")
@doc("Check whether client is authenticated")
@get
@route("/valid")
op valid(): NoContentResponse;

@scenario
@scenarioDoc("""
Expect error code 403 and error body:
  ```json
  {
    "error": {
      "code": "InvalidApiKey",
      "message": "API key is invalid"
    }
  }
  ```
""")
@doc("Check whether client is authenticated.")
@get
@route("/invalid")
op invalid(): NoContentResponse | InvalidAuth;

@error
model InvalidAuth {
  @statusCode _: 403;
  error: string;
}
