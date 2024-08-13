import "@azure-tools/typespec-azure-core";
import "@azure-tools/cadl-ranch-expect";
import "@typespec/http";
import "@typespec/rest";
import "@typespec/versioning";

using Azure.Core;
using TypeSpec.Http;
using TypeSpec.Rest;
using TypeSpec.Versioning;

#suppress "@azure-tools/typespec-azure-core/casing-style" "For spec"
@doc("Illustrates bodies templated with Azure Core with facet support")
@scenarioService(
  "/azure/core/facet",
  {
    versioned: Versions,
  }
)
namespace _Specs_.Azure.Core.Facet;

@doc("The version of the API.")
enum Versions {
  @doc("The version 2022-12-01-preview.")
  @useDependency(global.Azure.Core.Versions.v1_0_Preview_2)
  v2022_12_01_preview: "2022-12-01-preview",
}

@doc("Facet")
model Facet {
  @doc("A field to facet by, where the field is attributed as 'facetable'")
  field: string;
}

model NumericValuesFacet<T extends numeric> extends Facet {
  @doc("The facet ranges to produce. The values must be listed in ascending order to get the expected results.")
  ranges: T[];

  value: T;
}

@doc("Facets an int32 field by the specified value ranges.")
model Int32ValuesFacet extends NumericValuesFacet<int32> {
  @doc("The facet type.")
  kind: "Int32Values";
}

model priceresult {
  @doc("facet value")
  value: int32;

  @doc("total count")
  count: int32;
}

@doc("Facet result")
model FacetResult {
  @doc("The facet value.")
  field_name: "price";

  results: priceresult[];
}

@scenario
@doc("Facets an int32 field by the specified value ranges.")
@route("/int32")
@scenarioDoc("""
  Should generate models named Facet, NumericValuesFacet, Int32ValuesFacet, priceresult and FacetResult.
  
  Expected request body:
  ```json
  {
    "kind": "Int32Values",
    "ranges": [10, 20],
    "value": 15,
    "field": "price"
  }
  ```
  Expected response body:
  ```json
  {
    "field_name": "price",
    "results": [
      {
        "value": 15,
        "count": 1
      },
    ]
  }
  ```
  """)
@get
op getInt32Facets(@body input: Int32ValuesFacet): FacetResult;
