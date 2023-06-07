import "@azure-tools/typespec-azure-core";
import "@azure-tools/cadl-ranch-expect";
import "@typespec/rest";
import "@typespec/versioning";
import "./util.tsp";

using TypeSpec.Rest;
using TypeSpec.Http;
using TypeSpec.Versioning;
using global.Azure.Core;
using global.Azure.Core.Traits;

/**
 * WARNING this scenario is using some non standard Azure.Core operation to get Long running Rpc operation working.
 * THIS WILL MOST LIKELY BE CHANGED.
 * BE READY TO BREAK IF YOU IMPLEMENT THIS SCENARIO.
 */
#suppress "@azure-tools/typespec-azure-core/casing-style" "For spec"
@doc("Illustrates bodies templated with Azure Core with long-running operation")
@scenarioService(
  "/azure/core/lro/rpc",
  {
    versioned: Versions,
  }
)
namespace _Specs_.Azure.Core.Lro.Rpc;

@doc("Versions of the service")
enum Versions {
  @doc("2022-12-01-preview")
  @useDependency(global.Azure.Core.Versions.v1_0_Preview_2)
  v2022_12_01_preview: "2022-12-01-preview",
}

alias ResourceOperations = global.Azure.Core.ResourceOperations<NoConditionalRequests &
  NoRepeatableRequests &
  NoClientRequestId>;

@doc("Data of the job")
model JobData {
  @doc("Comment.")
  comment: string;
}

@resource("jobs")
@doc("Result of the job")
model JobResult {
  @doc("A processing job identifier.")
  @visibility("read")
  @key
  jobId: string;

  @doc("Comment.")
  @visibility("read")
  comment: string;

  @doc("The status of the processing job.")
  @visibility("read")
  @lroStatus
  status: "Succeeded" | "Canceled" | "Failed" | "Running";

  @doc("Error objects that describes the error when status is \"Failed\".")
  @visibility("read")
  errors?: Foundations.ErrorResponse[];

  @doc("The results.")
  @visibility("read")
  results?: string[];
}

@scenario
@doc("Creates a Job")
@summary("Creates a Job")
@scenarioDoc("""
Expected verb: POST
Expected request body:
```json
{
  "comment": "async job"
}
```

Expected status code: 202
Expected response header: operation-location={endpoint}/same-poll-result/jobs/job1
Expected response body:
```json
{
  "jobId": "job1",
  "comment": "async job",
  "status": "InProgress"
}
```

Expected verb: GET
Expected URL: {endpoint}/same-poll-result/jobs/job1

Expected status code: 200
Expected response body:
```json
{
  "jobId": "job1",
  "comment": "async job",
  "status": "InProgress"
}
```

Expected verb: GET
Expected URL: {endpoint}/same-poll-result/jobs/job1

Expected status code: 200
Expected response body:
```json
{
  "jobId": "job1",
  "comment": "async job",
  "status": "Succeeded",
  "results": ["job1 result"]
}
```
""")
@route("/same-poll-result")
interface SamePollResult {
  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "Legacy LRO uses local template"
  #suppress "@azure-tools/typespec-azure-core/long-running-polling-operation-required" "Operation link pollingOperation is not required for getLroMetadata"
  @doc("Creates a Job")
  @route("/jobs")
  @post
  createJob is Local.LongRunningLegacyOperation<JobData, JobResult>;
}
