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

#suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing purpose"
@doc("Server with multiple api versions and operation with customer-defined api version.")
@scenario
@scenarioDoc("""
Server with multiple api versions and operation with customer-defined api version.

Expected path with api version parameter: /server/version/union/customerDefined?api-version=1.0.0
""")
@route("/customerDefined")
@head
op customerDefined(
  @doc("Api version.")
  @query
  apiVersion: string
): NoContentResponse;

#suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing purpose"
@doc("Server with multiple api versions and operation with customer-defined api version.")
@scenario
@scenarioDoc("""
Server with multiple api versions and operation with customer-defined api version.

Expected path with api version parameter: /server/version/union/customerDefined?api-version=2.0.0
""")
@route("/customerDefinedWithDefault")
@head
op customerDefinedWithDefault(
  @doc("Api version.")
  @query
  apiVersion: "2.0.0"
): NoContentResponse;

#suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing purpose"
@doc("Server with multiple api versions and operation with template-defined api version.")
@scenario
@scenarioDoc("""
Server with multiple api versions and operation with template-defined api version.

Expected path with api version parameter: /server/version/union/Pet/dog?api-version=1.0.0
""")
@delete
op templateDefined is ResourceDelete<Pet>;
