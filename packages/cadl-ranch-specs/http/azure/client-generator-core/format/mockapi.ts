import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Azure_ClientGenerator_Core_Format_inputWithFormat = passOnSuccess(
  mockapi.post("/azure/client-generator-core/format/input", (req) => {
    req.expect.bodyEquals({
      guidProperty: "3f2504e0-4f89-11d3-9a0c-0305e82c3301",
      urlProperty: "https://www.example.com/path/to/resource",
      uuidProperty: "3f2504e0-4f89-11d3-9a0c-0305e82c3301",
      armIdProperty:
        "/subscriptions/3f2504e0-4f89-11d3-9a0c-0305e82c3301/resourceGroups/test/providers/Microsoft.Compute/virtualMachines/name",
      ipAddressProperty: "192.168.1.1",
      azureLocation: "eastus",
      etagProperty: "33a64df551425fcc55e4d42a148795d9f25f89d4",
    });
    return { status: 204 };
  }),
);

Scenarios.Azure_ClientGenerator_Core_Format_outputWithFormat = passOnSuccess(
  mockapi.post("/azure/client-generator-core/format/output", (req) => {
    return {
      status: 200,
      body: json({
        guidProperty: "550e8400-e29b-41d4-a716-446655440000",
        urlProperty: "https://www.example.com/path/to/another/resource",
        uuidProperty: "550e8400-e29b-41d4-a716-446655440000",
        armIdProperty:
          "/subscriptions/550e8400-e29b-41d4-a716-446655440000/resourceGroups/test/providers/Microsoft.Compute/virtualMachineScaleSets/name",
        ipAddressProperty: "172.16.254.1",
        azureLocation: "westus",
        etagProperty: "aabbccddeeff00112233445566778899",
      }),
    };
  }),
);

Scenarios.Azure_ClientGenerator_Core_Format_roundTripWithFormat = passOnSuccess(
  mockapi.post("/azure/client-generator-core/format/roundtrip", (req) => {
    req.expect.bodyEquals({
      guidProperty: "3f2504e0-4f89-11d3-9a0c-0305e82c3301",
      urlProperty: "https://www.example.com/path/to/resource",
      uuidProperty: "3f2504e0-4f89-11d3-9a0c-0305e82c3301",
      armIdProperty:
        "/subscriptions/3f2504e0-4f89-11d3-9a0c-0305e82c3301/resourceGroups/test/providers/Microsoft.Compute/virtualMachines/name",
      ipAddressProperty: "192.168.1.1",
      azureLocation: "eastus",
      etagProperty: "33a64df551425fcc55e4d42a148795d9f25f89d4",
    });
    return {
      status: 200,
      body: json({
        guidProperty: "550e8400-e29b-41d4-a716-446655440000",
        urlProperty: "https://www.example.com/path/to/another/resource",
        uuidProperty: "550e8400-e29b-41d4-a716-446655440000",
        armIdProperty:
          "/subscriptions/550e8400-e29b-41d4-a716-446655440000/resourceGroups/test/providers/Microsoft.Compute/virtualMachineScaleSets/name",
        ipAddressProperty: "172.16.254.1",
        azureLocation: "westus",
        etagProperty: "aabbccddeeff00112233445566778899",
      }),
    };
  }),
);
