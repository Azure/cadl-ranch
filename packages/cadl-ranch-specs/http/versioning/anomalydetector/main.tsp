import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@typespec/versioning";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;
using TypeSpec.Versioning;

/**
 * Test for the `@anomalydetector` decorator.
 */
@service
@versioned(Versions)
@server(
  "{Endpoint}/versioning/anomalydetector/api-version:{ApiVersion}",
  "Testserver endpoint",
  {
    @doc("""
Need to be set as 'http://localhost:3000' in client.
""")
    Endpoint: url,

    @doc("Api Version")
    @path
    ApiVersion: Versions,
  }
)
@doc("CADL project to test api versions.")
namespace Versioning.AnomalyDetector;

enum Versions {
  v1: "v1",
  v2: "v2",
}

@doc("Detection results for the given resultId.")
model DetectionResult {
  @doc("Result identifier, which is used to fetch the results of an inference call.")
  @key
  @format("uuid")
  resultId: string;
}

@scenario
@scenarioDoc("""
This operation should be generated with latest version's signature.

Expected request body:
```json
{ "resultId": "73f411fe-4f43-4b4b-9cbd-6828d8f4cf9a" }
```

""")
@route("/result/{resultId}")
@get
@summary("Get Multivariate Anomaly Detection Result")
@doc("""
For asynchronous inference, get multivariate anomaly detection result based on
resultId returned by the BatchDetectAnomaly api.
""")
@convenientAPI(true)
op GetAnomalyDetectionResult(
  @format("uuid")
  @path
  resultId: string,
): DetectionResult;
