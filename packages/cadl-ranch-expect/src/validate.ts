import {
  getSourceLocation,
  Interface,
  isTemplateDeclaration,
  Namespace,
  navigateProgram,
  Operation,
  Program,
} from "@cadl-lang/compiler";
import { getScenarioDoc, getScenarioName } from "./decorators.js";
import { reportDiagnostic } from "./lib.js";

export function $onValidate(program: Program) {
  navigateProgram(program, {
    operation: (operation) => {
      if (isTemplateDeclaration(operation) || (operation.interface && isTemplateDeclaration(operation.interface))) {
        return;
      }
      if (getSourceLocation(operation).file.path.includes("/node_modules/")) {
        return;
      }
      const scenarioType = checkIsInScenario(program, operation);
      if (!scenarioType) {
        reportDiagnostic(program, { code: "missing-scenario", target: operation });
      } else {
        const doc = getScenarioDoc(program, scenarioType);
        if (doc === undefined) {
          reportDiagnostic(program, { code: "missing-scenario-doc", target: scenarioType });
        }
      }
    },
  });
}

function checkIsInScenario(
  program: Program,
  type: Operation | Interface | Namespace,
): Operation | Interface | Namespace | undefined {
  if (getScenarioName(program, type)) {
    return type;
  }
  if (type.kind === "Operation" && type.interface) {
    return checkIsInScenario(program, type.interface);
  }
  if (type.namespace === undefined) {
    return undefined;
  }
  return checkIsInScenario(program, type.namespace);
}
