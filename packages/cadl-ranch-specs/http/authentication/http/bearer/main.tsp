import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

@scenarioService("/authentication/http/bearer")
@doc("Illustrates clients generated with generic HTTP auth.")
@useAuth({
  type: AuthType.http,
  scheme: "Bearer",
})
namespace Authentication.Http.Bearer;

@scenario
@scenarioDoc("Expects header 'authorization': 'Bearer https://security.microsoft.com/.default'")
@doc("Check whether client is authenticated")
@get
@route("/valid")
op valid(): NoContentResponse;

@scenario
@scenarioDoc("""
Expect error code 403 and error body:
  ```json
  {
    "error": "invalid-grant"
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
