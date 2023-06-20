import "@typespec/http";
import "@typespec/versioning";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-azure-core";

using Azure.Core;
using TypeSpec.Http;
using TypeSpec.Rest;
using TypeSpec.Versioning;

@doc("Illustrates server with customer-defined and template-defined api versions.")
@scenarioService("/server/version/union")
@useDependency(Azure.Core.Versions.v1_0_Preview_1)
namespace Server.Version.Union;

@doc("Pet")
@resource("Pet")
model Pet {
  @key
  @visibility("read")
  @doc("pet name")
  name: string;
}

@scenario
@scenarioDoc("""
Server with multiple api versions and operation with customer-defined api version.

Expected path with api version parameter: /server/version/union/customerDefined?api-version=1.0.0
""")
@route("/customerDefined")
@head
op customerDefined(@query apiVersion: string): NoContentResponse;

@scenario
@scenarioDoc("""
Server with multiple api versions and operation with template-defined api version.

Expected path with api version parameter: /server/version/union/templateDefined/Pet/dog?api-version=1.0.0
""")
@route("/templateDefined")
@delete
op templateDefined is ResourceDelete<Pet>;
