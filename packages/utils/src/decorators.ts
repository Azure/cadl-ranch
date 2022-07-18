import {
  createDecoratorDefinition,
  DecoratorContext,
  NamespaceType,
  OperationType,
  Program,
} from "@cadl-lang/compiler";
import { reportDiagnostic } from "./lib.js";
import { ScenarioCategory } from "./types.js";

const AllowedCategories: Set<string> = new Set(["vanilla", "azure", "optional", "dpg"]);
const CategoryKey = Symbol("Category");
const decoratorSignature = createDecoratorDefinition({
  name: "@scenario",
  target: "Namespace",
  args: [{ kind: "String" }],
} as const);
export function $category(context: DecoratorContext, target: NamespaceType, catgory: string) {
  if (!decoratorSignature.validate(context, target, [catgory])) {
    return;
  }

  if (!AllowedCategories.has(catgory)) {
    reportDiagnostic(context.program, {
      code: "category-invalid",
      format: { catgory, allowed: [...AllowedCategories].join(", ") },
      target: context.getArgumentTarget(0)!,
    });
  }
  context.program.stateMap(CategoryKey).set(target, catgory);
}

export function getCategory(program: Program, target: NamespaceType): ScenarioCategory | undefined {
  return program.stateMap(CategoryKey).get(target);
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

const ScenarioNameKey = Symbol("ScenarioName");
const scenarioNameSignature = createDecoratorDefinition({
  name: "@scenario",
  target: "Operation",
  args: [{ kind: "String" }],
} as const);
export function $scenarioName(context: DecoratorContext, target: OperationType, name: string) {
  if (!scenarioNameSignature.validate(context, target, [name])) {
    return;
  }
  context.program.stateMap(ScenarioNameKey).set(target, name);
}

export function getScenarioName(program: Program, target: OperationType): string | undefined {
  return program.stateMap(ScenarioNameKey).get(target);
}
