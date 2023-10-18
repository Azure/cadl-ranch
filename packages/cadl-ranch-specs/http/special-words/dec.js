// @ts-check

import { $scenario, $scenarioDoc } from "@azure-tools/cadl-ranch-expect";
import { $route } from "@typespec/http";

export function $opNameScenario(context, target, name) {
  context.call($scenario, target, name.value);
  context.call(
    $scenarioDoc,
    target,
    `Verify that the name "${name.value}" works as an operation name. Call this operation to pass.`,
  );
  context.call($route, target, `/${name.value}`);
}

export function $paramNameScenario(context, target, name) {
  context.call($scenario, target, name.value);
  context.call(
    $scenarioDoc,
    target,
    `Verify that the name "${name.value}" works. Send this parameter to pass with value \`ok\`.`,
  );
  context.call($route, target, `/${name.value}`);
}

export function $modelNameScenario(context, target, name) {
  context.call($scenario, target, name.value);
  context.call(
    $scenarioDoc,
    target,
    `Verify that the name "${name.value}" works. Send\n\`\`\`\json\n{"name": "ok"}\n\`\`\` `,
  );
  context.call($route, target, `/${name.value}`);
}
