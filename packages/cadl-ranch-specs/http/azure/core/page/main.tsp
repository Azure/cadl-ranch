import "@azure-tools/typespec-azure-core";
import "@azure-tools/typespec-client-generator-core";
import "@azure-tools/cadl-ranch-expect";
import "@typespec/http";
import "@typespec/rest";
import "@typespec/versioning";

using Azure.Core;
using TypeSpec.Http;
using TypeSpec.Rest;
using TypeSpec.Versioning;

#suppress "@azure-tools/typespec-azure-core/casing-style" "For spec"
@doc("Illustrates bodies templated with Azure Core with paging support")
@scenarioService(
  "/azure/core/page",
  {
    versioned: Versions,
  }
)
namespace _Specs_.Azure.Core.Page;

@doc("The version of the API.")
enum Versions {
  @doc("The version 2022-12-01-preview.")
  @useDependency(global.Azure.Core.Versions.v1_0_Preview_2)
  v2022_12_01_preview: "2022-12-01-preview",
}

@resource("users")
@doc("Details about a user.")
model User {
  @key
  @doc("The user's id.")
  @visibility("read")
  id: int32;

  @doc("The user's name.")
  name: string;

  @doc("The user's order list")
  orders?: UserOrder[];

  ...global.Azure.Core.EtagProperty;
}

@doc("UserOrder for testing list with expand.")
@resource("user")
model UserOrder {
  @key
  @doc("The user's id.")
  @visibility("read")
  id: int32;

  @doc("The user's id.")
  userId: int32;

  @doc("The user's order detail")
  detail: string;
}

#suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing global.Azure.Core.Page"
@scenario
@doc("List with Azure.Core.Page<>.")
@route("/page")
@scenarioDoc("""
  Should only generate models named User and UserOrder.
  
  Should not generate visible model like Page.
  
  Expected query parameter: api-version=2022-12-01-preview
  
  Expected response body:
  ```json
  {
    "value":[
       {
          "id":1,
          "name":"Madge",
          "etag": "11bdc430-65e8-45ad-81d9-8ffa60d55b59"
       }
    ]
  }
  ```
  """)
op listWithPage is global.Azure.Core.Foundations.Operation<{}, global.Azure.Core.Page<User>>;

@doc("The parameters for listing users.")
model ListItemInput {
  @doc("The body of the input.")
  @body
  bodyInput: ListItemInputBody;

  @doc("Another query parameter.")
  @query
  another?: ListItemInputExtensibleEnum;
}

@doc("An extensible enum input parameter.")
enum ListItemInputExtensibleEnum {
  @doc("The first enum value.")
  First,

  @doc("The second enum value.")
  Second,
}

@doc("The body of the input.")
model ListItemInputBody {
  @doc("The name of the input.")
  inputName: string;
}

#suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing global.Azure.Core.Page"
@scenario
@doc("List with extensible enum parameter Azure.Core.Page<>.")
@route("/parameters")
@scenarioDoc("""
  Expected query parameter: api-version=2022-12-01-preview&another=Second
  
  Expected body parameter: {"inputName": "Madge"}
  
  Expected response body:
  ```json
  {
    "value":[
       {
          "id": 1,
          "name": "Madge",
          "etag": "11bdc430-65e8-45ad-81d9-8ffa60d55b59"
       }
    ]
  }
  ```
  """)
@get
op listWithParameters is global.Azure.Core.Foundations.Operation<ListItemInput, global.Azure.Core.Page<User>>;

@friendlyName("{name}ListResults", T)
@global.Azure.Core.pagedResult
model CustomPageModel<T> {
  @global.Azure.Core.items
  @doc("List of items.")
  items: T[];

  @global.Azure.Core.nextLink
  @doc("Link to fetch more items.")
  nextLink?: string;
}

#suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing global.Azure.Core.Page"
@scenario
@doc("List with custom page model.")
@route("/custom-page")
@scenarioDoc("""
  Should ideally only generate models named User and UserOrder. If your language has to, you can also generate CustomPageModel
  
  Expected query parameter: api-version=2022-12-01-preview
  
  Expected response body:
  ```json
  {
    "items":[
       {
          "id":1,
          "name":"Madge",
          "etag": "11bdc430-65e8-45ad-81d9-8ffa60d55b59"
       }
    ]
  }
  ```
  """)
op listWithCustomPageModel is global.Azure.Core.Foundations.Operation<{}, CustomPageModel<User>>;

@doc("First item.")
model FirstItem {
  @doc("The id of the item.")
  @visibility("read")
  id: int32;
}

@doc("Second item.")
model SecondItem {
  @doc("The name of the item.")
  @visibility("read")
  name: string;
}

@scenario
@scenarioDoc("""
  This scenario is to test two operations with two different page item types.
  """)
interface TwoModelsAsPageItem {
  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing global.Azure.Core.Page"
  @doc("Two operations with two different page item types should be successfully generated. Should generate model for FirstItem.")
  @route("/first-item")
  listFirstItem is global.Azure.Core.Foundations.Operation<{}, global.Azure.Core.Page<FirstItem>>;

  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing global.Azure.Core.Page"
  @doc("Two operations with two different page item types should be successfully generated. Should generate model for SecondItem.")
  @route("/second-item")
  listSecondItem is global.Azure.Core.Foundations.Operation<{}, global.Azure.Core.Page<SecondItem>>;
}

@resource("transactions")
model LedgerEntry {
  /**
   * Contents of the ledger entry.
   */
  contents: string;

  @visibility("read")
  collectionId: string;

  @key
  @visibility("read")
  transactionId: string;
}

/**
 * Type for input model body
 */
model ListPaginationLedgerEntryInputBody {
  /**
   * A required string parameter
   */
  requiredString: string;

  /**
   * A required integer parameter
   */
  requiredInt: int32;
}

/**
 * Input model for the ListPaginationLedgerEntries
 */
model ListPaginationLedgerEntryInput {
  /**
   * Body parameter for the ListPaginationLedgerEntries input model
   */
  @body bodyInput: ListPaginationLedgerEntryInputBody;
}

/**
 * Paginated ledger entries
 */
@global.Azure.Core.pagedResult
model PagedLedgerEntries {
  /**
   * Array of ledger entries
   */
  @global.Azure.Core.items
  entries: LedgerEntry[];

  /**
   * Path to retrieve next page of ledger entries
   */
  @global.Azure.Core.nextLink
  nextPageLink?: ResourceLocation<LedgerEntry>;
}

@scenario
@scenarioDoc("""
  Expected input body:
  ```json
  {
    "requiredString": "string",
    "requiredInt": 1
  }
  ```
  
  Expected response body:
  ```json
  {
    "entries": [
      {
        "contents": "string",
        "collectionId": "string",
        "transactionId": "string"
      }
    ]
  }
  """)
@route("/ledger-entries")
@put
op ListPaginationLedgerEntries is global.Azure.Core.Foundations.ResourceList<
  LedgerEntry,
  ListPaginationLedgerEntryInput,
  PagedLedgerEntries
>;

/**
 * The interval
 */
union Interval {
  /**
   * A string representing a custom interval.
   */
  string,

  PT5S: "PT5S",
  PT10S: "PT10S",
  PT1M: "PT1M",
  PT5M: "PT5M",
  PT1H: "PT1H",
}

model MetricDimensions {
  /**
   * The interval (i.e. timegrain) of the query.
   */
  @query
  interval?: Interval;

  /**
   * Metric name
   */
  @query
  metricName?: string;

  /**
   * Metric namespace to query metric definitions for.
   */
  @query
  metricNamespace: string;

  /**
   *The timespan of the query.
   */
  @query
  timespan?: string;
}

@resource("values")
@parentResource(Dimension)
model DimensionValueListItem {
  /**
   * The values of the dimension.
   */
  @key
  value: string[];
}

@resource("dimensions")
@parentResource(TestRuns)
model Dimension {
  @key
  @path("name")
  @visibility("query")
  name: string;
}

/**
 * Test run model
 */
@resource("test-runs")
model TestRuns {
  /**
   * Unique test run name as identifier
   */
  @key
  @path
  @visibility("read")
  testRunId: string;
}

@scenario
@scenarioDoc("""
  List the dimension values for the given metric dimension name.
  """)
interface AdditionalParameter {
  /**
   * List the dimension values for the given metric dimension name.
   */
  @route("/metric-dimensions")
  ListMetricDimensionValues is global.Azure.Core.ResourceList<
    DimensionValueListItem,
    global.Azure.Core.Traits.QueryParametersTrait<MetricDimensions>
  >;
}

model BatchRequestHeaders {
  /**
   * An OData $filter clause.
   */
  @query
  $filter?: string;

  /**
   * An OData $select clause.
   */
  #suppress "deprecated" "Deprecated in next release"
  @query({
    format: "csv",
  })
  $select?: string[];

  /**
   * An OData $expand clause.
   */
  #suppress "deprecated" "Deprecated in next release"
  @query({
    format: "csv",
  })
  $expand?: string[];
}

/**
 * A Pool in the Azure Batch service.
 */
model BatchPool {
  /**
   * The unique identifier for the Pool.
   */
  @visibility("read")
  id?: string;

  /**
   * The display name for the Pool.
   */
  @visibility("read")
  displayName?: string;

  /**
   * The URL of the Pool.
   */
  @visibility("read")
  url?: string;
}
/**
 * "The result of listing the Pools in an Account.
 */
@global.Azure.Core.pagedResult
model BatchPoolListResult {
  /**
   * The list of Pools.
   */
  @global.Azure.Core.items
  value?: BatchPool[];

  /**
   * The URL to get the next set of results.
   */
  #suppress "@azure-tools/typespec-azure-core/casing-style" "The names of Property types must use camelCase"
  @global.Azure.Core.nextLink
  nextLink?: string;
}

/**
 * Client related response header values
 */
model BatchResponseHeaders {
  /**
   * The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true.")
   */
  @header
  `client-request-id`?: string;

  /**
   * A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in.")
   */
  @header
  `request-id`?: string;

  /**
   * The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers.")
   */
  @header
  ETag?: string;

  /**
   * The time at which the resource was last modified.
   */
  @header
  @encode(DateTimeKnownEncoding.rfc7231)
  `Last-Modified`?: utcDateTime;
}

/**
 * An error response received from the Azure Batch service.
 */
@error
model BatchError {
  /**
   * An identifier for the error. Codes are invariant and are intended to be consumed programmatically.
   */
  code: string;
}

@scenario
@scenarioDoc("""
  Lists all of the Pools in the specified Account.
  """)
interface Pools {
  /**
   * Lists all of the Pools in the specified Account.
   */
  @route("/pools")
  @put
  listPools is global.Azure.Core.RpcOperation<
    BatchRequestHeaders,
    BatchPoolListResult,
    BatchResponseHeaders,
    BatchError
  >;
}

/**
 * Text Blocklist.
 */
@resource("blocklists")
model TextBlocklist {
  /**
   * The name of the text blocklist. This can only include the following characters: 0-9 A-Z a-z - . _ ~
   */
  @key("blocklistName")
  @visibility("read", "create", "query")
  @maxLength(64)
  blocklistName: string;

  /**
   * A description of the text blocklist.
   */
  @maxLength(1024)
  description?: string;
}

/**
 * Item in TextBlocklist.
 */
@resource("blockItems")
@parentResource(TextBlocklist)
model TextBlockItem {
  /**
   * The unique identifier for the block item.
   */
  @key("blockItemId")
  @visibility("read", "create", "query")
  @maxLength(64)
  blockItemId: string;

  /**
   * A description of the block item.
   */
  @maxLength(1024)
  description?: string;

  /**
   * The content of the block item.
   */
  @maxLength(128)
  text: string;
}

@scenario
@scenarioDoc("""
  This scenario is to demonstrate an interface with two operations, each returning a list of different resource types.
  """)
interface TwoResourcesAsListItems {
  /**
   * Get all text blocklists details.
   */
  @route("/Text-blocklists")
  listTextBlocklists is global.Azure.Core.ResourceList<TextBlocklist>;

  /**
   * Get all blockItems in a text blocklist
   */
  @route("/Text-blockItems")
  listTextBlocklistItems is global.Azure.Core.ResourceList<
    TextBlockItem,
    global.Azure.Core.Traits.ListQueryParametersTrait<global.Azure.Core.StandardListQueryParameters>
  >;
}

/**
 * User roles
 */
union LedgerUserRole {
  string,
  Administrator: "Administrator",
  Contributor: "Contributor",
  Reader: "Reader",
}

@scenario
@scenarioDoc("""
  This operation is used to list custom resources.
  """)
@route("/custom-resource-list")
op ListCustomResource<
  TResource extends {},
  TCustom extends global.Azure.Core.Foundations.CustomizationFields = {}
> is global.Azure.Core.Foundations.ResourceList<
  TResource,
  global.Azure.Core.Foundations.CustomParameters<TCustom>,
  global.Azure.Core.Page<TResource>
>;

@scenario
@scenarioDoc("""
  This interface is used to list resources using the foundations resource list.
  """)
@route("/foundations-resource-list")
interface UseFoundationsResourceList {
  /**
   * List upload detail for the discovery resource.
   */
  GetResourcelist is ListCustomResource<LedgerEntry>;
}
