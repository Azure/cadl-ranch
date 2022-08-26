import {
  getSourceLocation,
  InterfaceType,
  isTemplateDeclaration,
  NamespaceType,
  navigateProgram,
  OperationType,
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

function checkIsInScenario(program: Program, type: OperationType | InterfaceType | NamespaceType): boolean {
  if (getScenarioName(program, type)) {
    return true;
  }
  if (type.kind === "Operation" && type.interface) {
    return checkIsInScenario(program, type.interface);
  }
  if (type.namespace === undefined) {
    return false;
  }
  return checkIsInScenario(program, type.namespace);
}
