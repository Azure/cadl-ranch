import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-azure-core";
import "@azure-tools/typespec-client-generator-core";
import "@typespec/http";
import "@typespec/rest";
import "@typespec/versioning";

using TypeSpec.Http;
using Azure.Core;
using global.Azure.Core.Traits;
using Azure.ClientGenerator.Core;
using TypeSpec.Versioning;

#suppress "@azure-tools/typespec-azure-core/casing-style" "For spec"
@doc("Test describing optionality of the query.")
@scenarioService(
  "/parameters/query-optionality",
  {
    versioned: Versions,
  }
)
namespace Parameters.QueryOptionality;

@doc("The API version.")
enum Versions {
  @doc("The 2022-12-01-preview version.")
  @useDependency(global.Azure.Core.Versions.v1_0_Preview_2)
  v2022_12_01_preview: "2022-12-01-preview",
}

@scenario
@scenarioDoc("""
  Test scenarios for using a combination of required and optional query parameters.
  
  Should generate an operation like below:
    ```
    fromRequired(start: string, end?: string)
    ```
  
  Expected query parameter: api-version=2022-12-01-preview
  Expected query parameter: start=required
  """)
@route("/fromrequired")
@head
op orderingWithRequiredStart(@query start: string, @query end?: string, @query("api-version") apiVersion: string): void;

@scenario
@scenarioDoc("""
  Test another existing scenario where the query optional parameter is placed before the required parameter, but in the generated code, the required parameter still appears before the optional parameter.
  
  Should generate an operation like below:
    ```
    fromoptional(end: string, start?: string)
    ```
  Expected query parameter: end=required
  """)
@route("/fromoptional")
@head
op orderingWithOptionalStart(@query start?: string, @query end: string): void;
