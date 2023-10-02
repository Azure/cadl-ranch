import { passOnSuccess, ScenarioMockApi, mockapi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

// ------------------------------------------------------------------------
// Operation name scenarios
// ------------------------------------------------------------------------
function opNameScenario(name: string) {
  return passOnSuccess(
    mockapi.get(`/special-words/operation/${name}`, (req) => {
      return {
        status: 204,
      };
    }),
  );
}

Scenarios.SpecialWords_Operations_and = opNameScenario("and");
Scenarios.SpecialWords_Operations_as = opNameScenario("as");
Scenarios.SpecialWords_Operations_assert = opNameScenario("assert");
Scenarios.SpecialWords_Operations_async = opNameScenario("async");
Scenarios.SpecialWords_Operations_await = opNameScenario("await");
Scenarios.SpecialWords_Operations_break = opNameScenario("break");
Scenarios.SpecialWords_Operations_class = opNameScenario("class");
Scenarios.SpecialWords_Operations_constructor = opNameScenario("constructor");
Scenarios.SpecialWords_Operations_continue = opNameScenario("continue");
Scenarios.SpecialWords_Operations_def = opNameScenario("def");
Scenarios.SpecialWords_Operations_del = opNameScenario("del");
Scenarios.SpecialWords_Operations_elif = opNameScenario("elif");
Scenarios.SpecialWords_Operations_else = opNameScenario("else");
Scenarios.SpecialWords_Operations_except = opNameScenario("except");
Scenarios.SpecialWords_Operations_exec = opNameScenario("exec");
Scenarios.SpecialWords_Operations_finally = opNameScenario("finally");
Scenarios.SpecialWords_Operations_for = opNameScenario("for");
Scenarios.SpecialWords_Operations_from = opNameScenario("from");
Scenarios.SpecialWords_Operations_global = opNameScenario("global");
Scenarios.SpecialWords_Operations_if = opNameScenario("if");
Scenarios.SpecialWords_Operations_import = opNameScenario("import");
Scenarios.SpecialWords_Operations_in = opNameScenario("in");
Scenarios.SpecialWords_Operations_is = opNameScenario("is");
Scenarios.SpecialWords_Operations_lambda = opNameScenario("lambda");
Scenarios.SpecialWords_Operations_not = opNameScenario("not");
Scenarios.SpecialWords_Operations_or = opNameScenario("or");
Scenarios.SpecialWords_Operations_pass = opNameScenario("pass");
Scenarios.SpecialWords_Operations_raise = opNameScenario("raise");
Scenarios.SpecialWords_Operations_return = opNameScenario("return");
Scenarios.SpecialWords_Operations_try = opNameScenario("try");
Scenarios.SpecialWords_Operations_while = opNameScenario("while");
Scenarios.SpecialWords_Operations_with = opNameScenario("with");
Scenarios.SpecialWords_Operations_yield = opNameScenario("yield");

// ------------------------------------------------------------------------
// Parameter name scenarios
// ------------------------------------------------------------------------
function paramNameScenario(name: string) {
  return passOnSuccess(
    mockapi.get(`/special-words/parameter/${name}`, (req) => {
      req.expect.containsQueryParam(name, "ok");
      return {
        status: 204,
      };
    }),
  );
}

Scenarios.SpecialWords_Parameters_and = paramNameScenario("and");
Scenarios.SpecialWords_Parameters_as = paramNameScenario("as");
Scenarios.SpecialWords_Parameters_assert = paramNameScenario("assert");
Scenarios.SpecialWords_Parameters_async = paramNameScenario("async");
Scenarios.SpecialWords_Parameters_await = paramNameScenario("await");
Scenarios.SpecialWords_Parameters_break = paramNameScenario("break");
Scenarios.SpecialWords_Parameters_class = paramNameScenario("class");
Scenarios.SpecialWords_Parameters_constructor = paramNameScenario("constructor");
Scenarios.SpecialWords_Parameters_continue = paramNameScenario("continue");
Scenarios.SpecialWords_Parameters_def = paramNameScenario("def");
Scenarios.SpecialWords_Parameters_del = paramNameScenario("del");
Scenarios.SpecialWords_Parameters_elif = paramNameScenario("elif");
Scenarios.SpecialWords_Parameters_else = paramNameScenario("else");
Scenarios.SpecialWords_Parameters_except = paramNameScenario("except");
Scenarios.SpecialWords_Parameters_exec = paramNameScenario("exec");
Scenarios.SpecialWords_Parameters_finally = paramNameScenario("finally");
Scenarios.SpecialWords_Parameters_for = paramNameScenario("for");
Scenarios.SpecialWords_Parameters_from = paramNameScenario("from");
Scenarios.SpecialWords_Parameters_global = paramNameScenario("global");
Scenarios.SpecialWords_Parameters_if = paramNameScenario("if");
Scenarios.SpecialWords_Parameters_import = paramNameScenario("import");
Scenarios.SpecialWords_Parameters_in = paramNameScenario("in");
Scenarios.SpecialWords_Parameters_is = paramNameScenario("is");
Scenarios.SpecialWords_Parameters_lambda = paramNameScenario("lambda");
Scenarios.SpecialWords_Parameters_not = paramNameScenario("not");
Scenarios.SpecialWords_Parameters_or = paramNameScenario("or");
Scenarios.SpecialWords_Parameters_pass = paramNameScenario("pass");
Scenarios.SpecialWords_Parameters_raise = paramNameScenario("raise");
Scenarios.SpecialWords_Parameters_return = paramNameScenario("return");
Scenarios.SpecialWords_Parameters_try = paramNameScenario("try");
Scenarios.SpecialWords_Parameters_while = paramNameScenario("while");
Scenarios.SpecialWords_Parameters_with = paramNameScenario("with");
Scenarios.SpecialWords_Parameters_yield = paramNameScenario("yield");

Scenarios.SpecialWords_Parameters_cancellationToken = paramNameScenario("cancellationToken");

// ------------------------------------------------------------------------
// Model name scenarios
// ------------------------------------------------------------------------
function modelNameScenario(name: string) {
  return passOnSuccess(
    mockapi.get(`/special-words/model/${name}`, (req) => {
      req.expect.bodyEquals({ name: "ok" });
      return {
        status: 204,
      };
    }),
  );
}

Scenarios.SpecialWords_Models_and = modelNameScenario("and");
Scenarios.SpecialWords_Models_as = modelNameScenario("as");
Scenarios.SpecialWords_Models_assert = modelNameScenario("assert");
Scenarios.SpecialWords_Models_async = modelNameScenario("async");
Scenarios.SpecialWords_Models_await = modelNameScenario("await");
Scenarios.SpecialWords_Models_break = modelNameScenario("break");
Scenarios.SpecialWords_Models_class = modelNameScenario("class");
Scenarios.SpecialWords_Models_constructor = modelNameScenario("constructor");
Scenarios.SpecialWords_Models_continue = modelNameScenario("continue");
Scenarios.SpecialWords_Models_def = modelNameScenario("def");
Scenarios.SpecialWords_Models_del = modelNameScenario("del");
Scenarios.SpecialWords_Models_elif = modelNameScenario("elif");
Scenarios.SpecialWords_Models_else = modelNameScenario("else");
Scenarios.SpecialWords_Models_except = modelNameScenario("except");
Scenarios.SpecialWords_Models_exec = modelNameScenario("exec");
Scenarios.SpecialWords_Models_finally = modelNameScenario("finally");
Scenarios.SpecialWords_Models_for = modelNameScenario("for");
Scenarios.SpecialWords_Models_from = modelNameScenario("from");
Scenarios.SpecialWords_Models_global = modelNameScenario("global");
Scenarios.SpecialWords_Models_if = modelNameScenario("if");
Scenarios.SpecialWords_Models_import = modelNameScenario("import");
Scenarios.SpecialWords_Models_in = modelNameScenario("in");
Scenarios.SpecialWords_Models_is = modelNameScenario("is");
Scenarios.SpecialWords_Models_lambda = modelNameScenario("lambda");
Scenarios.SpecialWords_Models_not = modelNameScenario("not");
Scenarios.SpecialWords_Models_or = modelNameScenario("or");
Scenarios.SpecialWords_Models_pass = modelNameScenario("pass");
Scenarios.SpecialWords_Models_raise = modelNameScenario("raise");
Scenarios.SpecialWords_Models_return = modelNameScenario("return");
Scenarios.SpecialWords_Models_try = modelNameScenario("try");
Scenarios.SpecialWords_Models_while = modelNameScenario("while");
Scenarios.SpecialWords_Models_with = modelNameScenario("with");
Scenarios.SpecialWords_Models_yield = modelNameScenario("yield");

// ------------------------------------------------------------------------
// Property name scenarios
// ------------------------------------------------------------------------
function propertyNameScenario(route: string, name: string) {
  return passOnSuccess(
    mockapi.get(`/special-words/model-properties/${route}`, (req) => {
      req.expect.bodyEquals({ [name]: "ok" });
      return {
        status: 204,
      };
    }),
  );
}

Scenarios.SpecialWords_ModelProperties_sameAsModel = propertyNameScenario("same-as-model", "SameAsModel");
