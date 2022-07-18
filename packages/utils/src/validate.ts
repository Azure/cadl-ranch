import { navigateProgram, Program } from "@cadl-lang/compiler";
import { getScenarioName } from "./decorators";
import { reportDiagnostic } from "./lib";

export function $onValidate(program: Program) {
  navigateProgram(program, {
    operation: (operation) => {
      const name = getScenarioName(program, operation);
      if (name === undefined) {
        reportDiagnostic(program, { code: "missing-scenario-name", target: operation });
      }
      const doc = getScenarioName(program, operation);
      if (doc === undefined) {
        reportDiagnostic(program, { code: "missing-scenario-doc", target: operation });
      }
    },
  });
}
