import { logger } from "../logger.js";
import pc from "picocolors";
import { getSourceLocation, Type } from "@cadl-lang/compiler";

export interface Diagnostic {
  message: string;
  target?: Type | string;
}

export interface DiagnosticReporter {
  readonly diagnostics: Diagnostic[];
  reportDiagnostic(diagnostic: Diagnostic): void;
}

export function createDiagnosticReporter(): DiagnosticReporter {
  const diagnostics: Diagnostic[] = [];

  return {
    diagnostics,
    reportDiagnostic(diagnostic: Diagnostic) {
      const target = diagnostic.target ? `\n  ${resolveSourceLocation(diagnostic.target)}` : "";
      logger.error(`${pc.red("✘")} ${diagnostic.message}${target}`);
      diagnostics.push(diagnostic);
    },
  };
}

function resolveSourceLocation(target: Type | string) {
  if (typeof target === "string") {
    return pc.cyan(target);
  }

  const location = getSourceLocation(target);
  const position = location.file.getLineAndCharacterOfPosition(location.pos);
  const path = pc.cyan(location.file.path);
  const line = pc.yellow(position.line + 1);
  const column = pc.yellow(position.character + 1);
  return `${path}:${line}:${column}`;
}
