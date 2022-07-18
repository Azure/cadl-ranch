import { createCadlLibrary, paramMessage } from "@cadl-lang/compiler";

const repoUrl = `https://github.com/Azure/cadl.testserver`;

export const $lib = createCadlLibrary({
  name: "@azure-tools/cadl.testserver-utils",
  diagnostics: {
    "category-invalid": {
      severity: "error",
      messages: {
        default: paramMessage`Category "${"category"}" is not one of the allowed category. Use ${"allowed"}. See ${repoUrl}/blob/main/docs/decorators.md#category`,
      },
    },

    "missing-scenario-name": {
      severity: "warning",
      messages: {
        default: `Operation is missing a scenario name. Use @scenarioName to provide the name of the scenario. See ${repoUrl}/blob/main/docs/decorators.md#scenarioname`,
      },
    },
    "missing-scenario-doc": {
      severity: "warning",
      messages: {
        default: `Operation is missing a scenario doc. Use @scenarioDoc to provide the name of the scenario. See ${repoUrl}/blob/main/docs/decorators.md#scenariodoc`,
      },
    },
  },
});

export const reportDiagnostic = $lib.reportDiagnostic;
