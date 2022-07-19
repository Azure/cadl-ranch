import {
  createDecoratorDefinition,
  DecoratorContext,
  NamespaceType,
  OperationType,
  Program,
  Type,
} from "@cadl-lang/compiler";
import { reportDiagnostic } from "./lib.js";
import { SupportedBy } from "./types.js";

const SupportedByOptions: Set<string> = new Set(["arm", "dpg"]);
const SupportedBy = Symbol("SupportedBy");
const decoratorSignature = createDecoratorDefinition({
  name: "@scenario",
  target: "Namespace",
  args: [{ kind: "String" }],
} as const);
export function $supportedBy(context: DecoratorContext, target: NamespaceType, catgory: string) {
  if (!decoratorSignature.validate(context, target, [catgory])) {
    return;
  }

  if (!SupportedByOptions.has(catgory)) {
    reportDiagnostic(context.program, {
      code: "category-invalid",
      format: { catgory, allowed: [...SupportedByOptions].join(", ") },
      target: context.getArgumentTarget(0)!,
    });
  }
  context.program.stateMap(SupportedBy).set(target, catgory);
}

export function getSupportedBy(program: Program, target: NamespaceType): SupportedBy | undefined {
  return program.stateMap(SupportedBy).get(target);
}

const ScenarioDocKey = Symbol("ScenarioDoc");
const scenarioDocSignature = createDecoratorDefinition({
  name: "@scenario",
  target: "Operation",
  args: [{ kind: "String" }],
} as const);
export function $senarioDoc(context: DecoratorContext, target: OperationType, doc: string) {
  if (!scenarioDocSignature.validate(context, target, [doc])) {
    return;
  }
  context.program.stateMap(ScenarioDocKey).set(target, doc);
}

export function getScenarioDoc(program: Program, target: OperationType): string | undefined {
  return program.stateMap(ScenarioDocKey).get(target);
}

const ScenarioKey = Symbol("Scenario");
const scenarioSignature = createDecoratorDefinition({
  name: "@scenario",
  target: ["Operation", "Namespace"] as any,
  args: [{ kind: "String", optional: true }],
} as const);
export function $scenario(context: DecoratorContext, target: NamespaceType | OperationType, name?: string) {
  if (!scenarioSignature.validate(context, target, [name])) {
    return;
  }
  context.program.stateMap(ScenarioKey).set(target, name ?? target.name);
}

export function listScenarios(program: Program): [OperationType | NamespaceType, string][] {
  return [...(program.stateMap(ScenarioKey).entries() as any)];
}

export function getScenarioName(program: Program, target: OperationType | NamespaceType): string | undefined {
  return program.stateMap(ScenarioKey).get(target);
}
