import "@typespec/http";
import "@typespec/versioning";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;
using TypeSpec.Versioning;

@doc("Illustrates conditional request headers")
@supportedBy("dpg")
@scenarioService("/special-headers/conditional-request")
namespace SpecialHeaders.ConditionalRequest;

@scenario
@doc("""
Check when only If-Match in header is defined.
""")
@scenarioDoc("""
Check when only If-Match in header is defined.
Expected header parameters:
- if-match="valid"
""")
@post
@route("/if-match")
op postIfMatch(
  @header("If-Match")
  @doc("The request should only proceed if an entity matches this string.")
  ifMatch?: string
): NoContentResponse;

@scenario
@doc("""
Check when only If-None-Match in header is defined.
""")
@scenarioDoc("""
Check when only If-None-Match in header is defined.
Expected header parameters:
- if-nonematch="invalid"
""")
@post
@route("/if-none-match")
op postIfNoneMatch(
  @header("If-None-Match")
  @doc("The request should only proceed if no entity matches this string.")
  ifNoneMatch?: string
): NoContentResponse;
