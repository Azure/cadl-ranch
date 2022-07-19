import { NamespaceType, navigateProgram, OperationType, Program } from "@cadl-lang/compiler";
import { getScenarioDoc, getScenarioName } from "./decorators.js";
import { reportDiagnostic } from "./lib.js";

export function $onValidate(program: Program) {
  navigateProgram(program, {
    operation: (operation) => {
      if (!checkIsInScenario(program, operation)) {
        reportDiagnostic(program, { code: "missing-scenario", target: operation });
      }
      const doc = getScenarioDoc(program, operation);
      if (doc === undefined) {
        reportDiagnostic(program, { code: "missing-scenario-doc", target: operation });
      }
    },
  });
}

function checkIsInScenario(program: Program, type: OperationType | NamespaceType): boolean {
  if (getScenarioName(program, type)) {
    return true;
  }
  if (type.namespace === undefined) {
    return false;
  }
  return checkIsInScenario(program, type.namespace);
}
