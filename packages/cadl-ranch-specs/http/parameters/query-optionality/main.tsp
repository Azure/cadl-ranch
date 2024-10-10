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
  Test scenarios for using a combination of required query parameters first and optional query parameters later.
  
  Should generate an operation like below:
    ```
    orderingWithRequiredStart(start: string, end?: string)
    ```
  
  Expected query parameter: api-version=2022-12-01-preview
  Expected query parameter: start=required
  """)
@route("/startwithequired")
@head
op OrderingWithRequiredStart(@query start: string, @query end?: string, @query("api-version") apiVersion: string): void;

@scenario
@scenarioDoc("""
  Test scenarios for using a combination of optional query parameters first and required query parameters later
  
  Should generate an operation like below:
    ```
    orderingWithOptionalStart(end: string, start?: string)
    ```
  Expected query parameter: end=required
  """)
@route("/startwithoptional")
@head
op OrderingWithOptionalStart(@query start?: string, @query end: string): void;
