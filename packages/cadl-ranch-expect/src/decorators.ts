import {
  createDecoratorDefinition,
  DecoratorContext,
  InterfaceType,
  NamespaceType,
  OperationType,
  Program,
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
export function $scenarioDoc(context: DecoratorContext, target: OperationType, doc: string) {
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
export function $scenario(
  context: DecoratorContext,
  target: NamespaceType | OperationType | InterfaceType,
  name?: string,
) {
  if (!scenarioSignature.validate(context, target, [name])) {
    return;
  }
  context.program.stateMap(ScenarioKey).set(target, name ?? target.name);
}

export interface Scenario {
  name: string;
  target: OperationType | InterfaceType | NamespaceType;
}

export function listScenarios(program: Program): Scenario[] {
  return [...(program.stateMap(ScenarioKey).entries() as any)].map(([target, name]) => {
    return {
      target,
      name: resolveScenarioName(target, name),
    };
  });
}

function resolveScenarioName(target: OperationType | NamespaceType, name: string) {
  if (target.kind === "Operation" && target.interface) {
    name = `${target.interface.name}_${name}`;
  }
  return target.namespace ? `${target.namespace.name}_${name}` : name;
}

export function getScenarioName(program: Program, target: OperationType | NamespaceType): string | undefined {
  const name = program.stateMap(ScenarioKey).get(target);
  return resolveScenarioName(target, name);
}
