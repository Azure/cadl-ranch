import { logger } from "../logger.js";
import pc from "picocolors";
import { getSourceLocation, Type } from "@cadl-lang/compiler";

interface Diagnostic {
  message: string;
  target?: Type;
}

export interface Diagnosticreporter {
  readonly diagnostics: Diagnostic[];
  reportDiagnostic(diagnostic: Diagnostic): void;
}

export function createDiagnosticReporter(): Diagnosticreporter {
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

function resolveSourceLocation(target: Type) {
  const location = getSourceLocation(target);
  const position = location.file.getLineAndCharacterOfPosition(location.pos);
  const path = pc.cyan(location.file.path);
  const line = pc.yellow(position.line);
  const column = pc.yellow(position.character);
  return `${path}:${line}:${column}`;
}
