import { passOnSuccess, mockapi, json, ValidationError } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import * as _ from "underscore";

export const Scenarios: Record<string, ScenarioMockApi> = {};

/**
 * Put and get for typed dictionary properties.
 */
const dictionaryValidBody = '{"defaultProgram":{"txt":"notepad","bmp":"mspaint","xls":"excel","exe":"","":null}}';
Scenarios.Dictionary_put = passOnSuccess(
  mockapi.put("/complex/dictionary/typed/:scenario", (req) => {
    if (req.params.scenario === "valid") {
      req.expect.bodyEquals(JSON.parse(dictionaryValidBody));
      return { status: 200 };
    } else if (req.params.scenario === "empty") {
      if (JSON.stringify(req.body) === '{"defaultProgram":{}}') {
        return { status: 200 };
      } else {
        throw new ValidationError("Did not like complex dictionary req ", { defaultProgram: {} }, req.body);
      }
    } else {
      throw new ValidationError("Must provide a valid scenario.", null, req.params.scenario);
    }
  }),
);

Scenarios.Dictionary_get = passOnSuccess(
  mockapi.get("/complex/dictionary/typed/:scenario", (req) => {
    if (req.params.scenario === "valid") {
      return { status: 200, body: json(JSON.parse(dictionaryValidBody)) };
    } else if (req.params.scenario === "empty") {
      return { status: 200, body: json(JSON.parse('{"defaultProgram":{}}')) };
    } else if (req.params.scenario === "null") {
      return { status: 200, body: json(JSON.parse('{"defaultProgram":null}')) };
    } else if (req.params.scenario === "notprovided") {
      return { status: 200, body: json(JSON.parse("{}")) };
    } else {
      throw new ValidationError("Must provide a valid scenario.", null, req.params.scenario);
    }
  }),
);
