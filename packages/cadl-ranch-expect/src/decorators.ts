import {
  $serviceTitle,
  $serviceVersion,
  createDecoratorDefinition,
  DecoratorContext,
  getServiceNamespace,
  InterfaceType,
  ModelType,
  NamespaceType,
  OperationType,
  Program,
} from "@cadl-lang/compiler";
import { $route, $server, getOperationVerb, getRoutePath, HttpVerb } from "@cadl-lang/rest/http";
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
  args: [{ kind: "String" }, { kind: "Model", optional: true }],
} as const);
export function $scenarioDoc(context: DecoratorContext, target: OperationType, doc: string, formatArgs?: ModelType) {
  if (!scenarioDocSignature.validate(context, target, [doc, formatArgs])) {
    return;
  }
  const formattedDoc = formatArgs ? replaceTemplatedStringFromProperties(doc, formatArgs) : doc;
  context.program.stateMap(ScenarioDocKey).set(target, formattedDoc);
}

export function getScenarioDoc(
  program: Program,
  target: OperationType | InterfaceType | NamespaceType,
): string | undefined {
  return program.stateMap(ScenarioDocKey).get(target);
}

function replaceTemplatedStringFromProperties(formatString: string, formatArgs: ModelType) {
  return formatString.replace(/{(\w+)}/g, (_, propName) => {
    const type = formatArgs.properties.get(propName)?.type;
    return type && "value" in type ? type.value : propName;
  });
}

const ScenarioKey = Symbol("Scenario");
const scenarioSignature = createDecoratorDefinition({
  name: "@scenario",
  target: ["Operation", "Namespace", "Interface"],
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
  scenarioDoc: string;
  target: OperationType | InterfaceType | NamespaceType;
  endpoints: ScenarioEndpoint[];
}

export interface ScenarioEndpoint {
  verb: HttpVerb;
  path: string;
  target: OperationType;
}

export function listScenarios(program: Program): Scenario[] {
  const serviceNamespace = getServiceNamespace(program);
  if (serviceNamespace === undefined) {
    return [];
  }
  return listScenarioIn(program, serviceNamespace);
}

export function getScenarioEndpoints(
  program: Program,
  target: NamespaceType | InterfaceType | OperationType,
): ScenarioEndpoint[] {
  switch (target.kind) {
    case "Namespace":
      return [
        ...[...target.namespaces.values()].flatMap((x) => getScenarioEndpoints(program, x)),
        ...[...target.interfaces.values()].flatMap((x) => getScenarioEndpoints(program, x)),
        ...[...target.operations.values()].flatMap((x) => getScenarioEndpoints(program, x)),
      ];
    case "Interface":
      return [...target.operations.values()].flatMap((x) => getScenarioEndpoints(program, x));
    case "Operation":
      return [
        {
          verb: getOperationVerb(program, target) ?? "get",
          path: getOperationRoute(program, target),
          target,
        },
      ];
  }
}

function getRouteSegements(program: Program, target: OperationType | InterfaceType | NamespaceType): string[] {
  const route = getRoutePath(program, target)?.path;
  const seg = route ? [route] : [];
  switch (target.kind) {
    case "Namespace":
      return target.namespace ? [...getRouteSegements(program, target.namespace), ...seg] : seg;
    case "Interface":
      return target.namespace ? [...getRouteSegements(program, target.namespace), ...seg] : seg;

    case "Operation":
      return target.interface
        ? [...getRouteSegements(program, target.interface), ...seg]
        : target.namespace
        ? [...getRouteSegements(program, target.namespace), ...seg]
        : seg;
  }
}

function getOperationRoute(program: Program, target: OperationType): string {
  const segements = getRouteSegements(program, target);
  return "/" + segements.map((x) => (x.startsWith("/") ? x.substring(1) : x)).join("/");
}

export function listScenarioIn(program: Program, target: NamespaceType | InterfaceType | OperationType): Scenario[] {
  const scenarioName = getScenarioName(program, target);
  if (scenarioName) {
    return [
      {
        target,
        scenarioDoc: getScenarioDoc(program, target)!, /// `onValidate` validate against this happening
        name: scenarioName,
        endpoints: getScenarioEndpoints(program, target),
      },
    ];
  }
  switch (target.kind) {
    case "Namespace":
      return [
        ...[...target.namespaces.values()].flatMap((x) => listScenarioIn(program, x)),
        ...[...target.interfaces.values()].flatMap((x) => listScenarioIn(program, x)),
        ...[...target.operations.values()].flatMap((x) => listScenarioIn(program, x)),
      ];
    case "Interface":
      return [...target.operations.values()].flatMap((x) => listScenarioIn(program, x));
    case "Operation":
      return [];
  }
}

function resolveScenarioName(target: OperationType | InterfaceType | NamespaceType, name: string): string {
  const names = [name];

  let current: OperationType | InterfaceType | NamespaceType | undefined = target;
  while (true) {
    current = current.kind === "Operation" && current.interface ? current.interface : current.namespace;
    if (current === undefined || (current.kind === "Namespace" && current.name === "")) {
      break;
    }
    names.unshift(current.name);
  }
  return names.join("_");
}

export function isScenario(program: Program, target: OperationType | InterfaceType | NamespaceType): boolean {
  return program.stateMap(ScenarioKey).has(target);
}

export function getScenarioName(
  program: Program,
  target: OperationType | InterfaceType | NamespaceType,
): string | undefined {
  const name = program.stateMap(ScenarioKey).get(target);
  if (name === undefined) {
    return undefined;
  }
  return resolveScenarioName(target, name);
}

const ScenarioServiceKey = Symbol("ScenarioService");
const scenarioServiceSignature = createDecoratorDefinition({
  name: "@scenarioService",
  target: "Namespace",
  args: [{ kind: "String" }],
} as const);
export function $scenarioService(context: DecoratorContext, target: NamespaceType, route: string) {
  if (!scenarioServiceSignature.validate(context, target, [route])) {
    return;
  }
  context.program.stateSet(ScenarioServiceKey).add(target);
  context.call($serviceTitle, target, context.program.checker.getNamespaceString(target).replace(/\./g, ""));
  context.call($serviceVersion, target, "1.0.0");
  context.call($server, target, "http://localhost:3000", "TestServer endpoint");
  context.call($route, target, route);
}
