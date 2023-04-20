import "@azure-tools/typespec-azure-core";
import "@azure-tools/cadl-ranch-expect";
import "@typespec/rest";
import "@typespec/versioning";
import "./util.tsp";

using Azure.Core;
using global.Azure.Core.Traits;
using TypeSpec.Rest;
using TypeSpec.Http;
using TypeSpec.Versioning;

#suppress "@azure-tools/typespec-azure-core/casing-style" "For spec"
@doc("Illustrates bodies templated with Azure Core with long-running operation")
@scenarioService("/azure/core/lro/rpc")
@versioned(Versions)
namespace _Specs_.Azure.Core.Lro.Rpc;

enum Versions {
  @useDependency(global.Azure.Core.Versions.v1_0_Preview_2)
  v2022_12_01_preview: "2022-12-01-preview",
}

interface ResourceOperations
  extends global.Azure.Core.ResourceOperations<NoConditionalRequests & NoRepeatableRequests & NoClientRequestId> {}

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
  status: global.Azure.Core.Foundations.OperationState;

  @doc("Error objects that describes the error when status is \"Failed\".")
  @visibility("read")
  errors?: global.Azure.Core.Foundations.ErrorResponse[];

  @doc("The results.")
  @visibility("read")
  results: string[];
}

@resource("jobs/operations")
@doc("Result of the poll")
model JobPollResult {
  @doc("Operation identifier.")
  @visibility("read")
  @key
  operationId: string;

  @doc("The status of the processing job.")
  @visibility("read")
  status: global.Azure.Core.Foundations.OperationState;
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
interface SamePollResult {
  @doc("Creates a Job")
  @route("/same-poll-result/jobs")
  @global.Azure.Core.pollingOperation(SamePollResult.getJob)
  createJob is LocalCore.LongRunningRpcOperation<JobData, JobResult>;

  @doc("Gets the status of a Job")
  @route("/same-poll-result")
  getJob is ResourceOperations.ResourceRead<JobResult>;
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
Expected response header: operation-location={endpoint}/different-poll-result/jobs/operations/operation1
Expected response header: location={endpoint}/different-poll-result/jobs/job1
Expected response body:
```json
{
  "operationId": "operation1",
  "status": "InProgress"
}
```

Expected verb: GET
Expected URL: {endpoint}/different-poll-result/jobs/operations/operation1

Expected status code: 200
Expected response body:
```json
{
  "operationId": "operation1",
  "status": "InProgress"
}
```

Expected verb: GET
Expected URL: {endpoint}/different-poll-result/jobs/operations/operation1

Expected status code: 200
Expected response body:
```json
{
  "operationId": "operation1",
  "status": "Succeeded"
}
```

Expected verb: GET
Expected URL: {endpoint}/different-poll-result/jobs/job1

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
interface DifferentPollResult {
  @doc("Creates a Job")
  @route("/different-poll-result/jobs")
  @global.Azure.Core.pollingOperation(DifferentPollResult.getPoll)
  createJobFinalOnLocation is LocalCore.LongRunningRpcOperation<
    JobData,
    JobResult,
    JobPollResult,
    LocalCore.LongRunningFinalLocation<JobResult>
  >;

  @doc("Gets the status of a Job")
  @route("/different-poll-result")
  getPoll is ResourceOperations.ResourceRead<JobPollResult>;
}
