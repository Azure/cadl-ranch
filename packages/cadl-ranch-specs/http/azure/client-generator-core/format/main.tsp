import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

/**
 * Describe scenarios for various combinations of unions.
 */
@supportedBy("dpg")
@scenarioService("/azure/client-generator-core/format")
namespace _Specs_.Azure.ClientGenerator.Core.Format;

model Model {
  @format("guid")
  guidProperty?: string;

  @format("url")
  urlProperty?: string;

  @format("uuid")
  uuidProperty?: string;

  @format("armId")
  armIdProperty?: string;

  @format("ipAddress")
  ipAddressProperty?: string;

  @format("azureLocation")
  azureLocation?: string;

  @format("etag")
  etagProperty?: string;
}

model InputModel is Model;

model OutputModel is Model;

model RoundTripModel is Model;

/**
 * Consumes an InputModel with properties of various formats
 */
@route("/input")
@post
@scenario
@scenarioDoc("""
  Verify properties with various of formats can be processed in a request.

  Expected request body:
  ```json
  {
    "guidProperty": "3f2504e0-4f89-11d3-9a0c-0305e82c3301",
    "urlProperty": "https://www.example.com/path/to/resource",
    "uuidProperty": "3f2504e0-4f89-11d3-9a0c-0305e82c3301",
    "armIdProperty": "/subscriptions/3f2504e0-4f89-11d3-9a0c-0305e82c3301/resourceGroups/test/providers/Microsoft.Compute/virtualMachines/name",
    "ipAddressProperty": "192.168.1.1",
    "azureLocation": "eastus",
    "etagProperty": "33a64df551425fcc55e4d42a148795d9f25f89d4"
  }
  ```
  """)
op inputWithFormat(@body body: InputModel): void;

/**
 * Produces an OutputModel with properties of various formats
 */
@route("/output")
@post
@scenario
@scenarioDoc("""
  Verify properties with various of formats can be processed in a response.

  Expected response body:
  ```json
  {
    "guidProperty": "550e8400-e29b-41d4-a716-446655440000",
    "urlProperty": "https://www.example.com/path/to/another/resource",
    "uuidProperty": "550e8400-e29b-41d4-a716-446655440000",
    "armIdProperty": "/subscriptions/550e8400-e29b-41d4-a716-446655440000/resourceGroups/test/providers/Microsoft.Compute/virtualMachineScaleSets/name",
    "ipAddressProperty": "172.16.254.1",
    "azureLocation": "westus",
    "etagProperty": "aabbccddeeff00112233445566778899"
  }
  ```
  """)
op outputWithFormat(): OutputModel;

/**
 * Consumes and produces a RoundTripModel with properties of various formats
 */
@route("/roundtrip")
@post
@scenario
@scenarioDoc("""
  Verify properties with various of formats can be processed in a request and returned in a response

  Expected request body:
  ```json
  {
    "guidProperty": "3f2504e0-4f89-11d3-9a0c-0305e82c3301",
    "urlProperty": "https://www.example.com/path/to/resource",
    "uuidProperty": "3f2504e0-4f89-11d3-9a0c-0305e82c3301",
    "armIdProperty": "/subscriptions/3f2504e0-4f89-11d3-9a0c-0305e82c3301/resourceGroups/test/providers/Microsoft.Compute/virtualMachines/name",
    "ipAddressProperty": "192.168.1.1",
    "azureLocation": "eastus",
    "etagProperty": "33a64df551425fcc55e4d42a148795d9f25f89d4"
  }
  ```
  Expected response body:
  ```json
  {
    "guidProperty": "550e8400-e29b-41d4-a716-446655440000",
    "urlProperty": "https://www.example.com/path/to/another/resource",
    "uuidProperty": "550e8400-e29b-41d4-a716-446655440000",
    "armIdProperty": "/subscriptions/550e8400-e29b-41d4-a716-446655440000/resourceGroups/test/providers/Microsoft.Compute/virtualMachineScaleSets/name",
    "ipAddressProperty": "172.16.254.1",
    "azureLocation": "westus",
    "etagProperty": "aabbccddeeff00112233445566778899"
  }
  ```
  """)
op roundTripWithFormat(@body body: RoundTripModel): RoundTripModel;
