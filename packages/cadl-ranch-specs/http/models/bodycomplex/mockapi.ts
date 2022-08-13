import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import * as _ from "underscore";
import * as util from "util";

export const Scenarios: Record<string, ScenarioMockApi> = {};
function coerceDate(targetObject: any) {
  let stringRep = JSON.stringify(targetObject);
  stringRep = stringRep.replace(/(\d\d\d\d-\d\d-\d\d[Tt]\d\d:\d\d:\d\d)\.\d{3,7}([Zz]|[+-]00:00)/g, "$1Z");
  return JSON.parse(stringRep);
}

function composeError(code: number, msg: string) {
  return { status: code, body: json({ message: msg, status: code }) };
}

Scenarios.Basic_put = passOnSuccess(
  mockapi.put("/complex/basic/:scenario", (req) => {
    if (req.params.scenario === "valid") {
      if (_.isEqual(req.body, { id: 2, name: "abc", color: "Magenta" })) {
        return { status: 200 };
      } else {
        console.log(JSON.stringify(req.body));
        console.log(JSON.stringify({ id: 2, name: "abc", color: "Magenta" }));
        return composeError(400, "Did not like valid req " + util.inspect(req.body));
      }
    } else {
      return composeError(400, 'Must specify scenario either "valid" or "empty"');
    }
  }),
);

Scenarios.Basic_get = passOnSuccess(
  mockapi.get("/complex/basic/:scenario", (req) => {
    if (req.params.scenario === "valid") {
      return { status: 200, body: json(JSON.parse('{ "id": 2, "name": "abc", "color": "YELLOW" }')) };
    } else if (req.params.scenario === "empty") {
      return { status: 200, body: json(JSON.parse("{ }")) };
    } else if (req.params.scenario === "notprovided") {
      return { status: 200 };
    } else if (req.params.scenario === "null") {
      return { status: 200, body: json(JSON.parse('{ "id": null, "name": null }')) };
    } else if (req.params.scenario === "invalid") {
      return { status: 200, body: json(JSON.parse('{ "id": "a", "name": "abc" }')) };
    } else {
      return composeError(400, "Request scenario must be valid, empty, null, notprovided, or invalid.");
    }
  }),
);

/**
 * Put and get for primitive
 */
const intBody = { field1: -1, field2: 2 };
const longBody = { field1: 1099511627775, field2: -999511627788 };
const floatBody = { field1: 1.05, field2: -0.003 };
const doubleBody = {
  field1: 3e-100,
  field_56_zeros_after_the_dot_and_negative_zero_before_dot_and_this_is_a_long_field_name_on_purpose:
    -0.000000000000000000000000000000000000000000000000000000005,
};
const doubleBodyInbound = {
  field1: 3e-100,
  field_56_zeros_after_the_dot_and_negative_zero_before_dot_and_this_is_a_long_field_name_on_purpose: -5e-57,
};
const boolBody = { field_true: true, field_false: false };
const stringBody = { field: "goodrequest", empty: "", null: null };
const stringBodyInbound = { field: "goodrequest", empty: "" };
const dateBody = { field: "0001-01-01", leap: "2016-02-29" };
const datetimeBody = { field: "0001-01-01T00:00:00Z", now: "2015-05-18T18:38:00Z" };
const datetimeRfc1123Body = { field: "Mon, 01 Jan 0001 00:00:00 GMT", now: "Mon, 18 May 2015 11:38:00 GMT" };
const datetimeRfc1123BodyAlternate = { field: "Mon, 01 Jan 1 00:00:00 GMT", now: "Mon, 18 May 2015 11:38:00 GMT" };
const datetimeRfc1123BodyAlternateWithSpaces = {
  field: "Mon, 01 Jan    1 00:00:00 GMT",
  now: "Mon, 18 May 2015 11:38:00 GMT",
};
const durationBody = { field: "P123DT22H14M12.011S" };
const durationBodyAlternate = { field: "P123DT22H14M12.010999999998603S" };
const byteString = new Buffer([255, 254, 253, 252, 0, 250, 249, 248, 247, 246]).toString("base64");
const byteBody = '{"field":"' + byteString + '"}';
Scenarios.Primitive_put = passOnSuccess(
  mockapi.put("/complex/primitive/:scenario", (req) => {
    if (req.params.scenario === "integer") {
      if (_.isEqual(req.body, intBody)) {
        return { status: 200 };
      } else {
        return composeError(400, "Did not like integer req " + util.inspect(req.body));
      }
    } else if (req.params.scenario === "long") {
      if (_.isEqual(req.body, longBody)) {
        return { status: 200 };
      } else {
        return composeError(400, "Did not like long req " + util.inspect(req.body));
      }
    } else if (req.params.scenario === "float") {
      if (_.isEqual(req.body, floatBody)) {
        return { status: 200 };
      } else {
        return composeError(400, "Did not like float req " + util.inspect(req.body));
      }
    } else if (req.params.scenario === "double") {
      if (_.isEqual(req.body, doubleBodyInbound)) {
        return { status: 200 };
      } else {
        return composeError(400, "Did not like double req " + util.inspect(req.body));
      }
    } else if (req.params.scenario === "bool") {
      if (_.isEqual(req.body, boolBody)) {
        return { status: 200 };
      } else {
        return composeError(400, "Did not like bool req " + util.inspect(req.body));
      }
    } else if (req.params.scenario === "string") {
      console.log(JSON.stringify(req.body));
      if (_.isEqual(req.body, stringBody) || _.isEqual(req.body, stringBodyInbound)) {
        return { status: 200 };
      } else {
        return composeError(400, "Did not like string req " + util.inspect(req.body));
      }
    } else if (req.params.scenario === "date") {
      if (_.isEqual(req.body, dateBody)) {
        return { status: 200 };
      } else {
        return composeError(400, "Did not like date req " + util.inspect(req.body));
      }
    } else if (req.params.scenario === "datetime") {
      if (_.isEqual(coerceDate(req.body), datetimeBody)) {
        return { status: 200 };
      } else {
        return composeError(400, "Did not like datetime req " + util.inspect(req.body));
      }
    } else if (req.params.scenario === "datetimerfc1123") {
      if (
        _.isEqual(req.body, datetimeRfc1123Body) ||
        _.isEqual(req.body, datetimeRfc1123BodyAlternate) ||
        _.isEqual(req.body, datetimeRfc1123BodyAlternateWithSpaces)
      ) {
        return { status: 200 };
      } else {
        return composeError(400, "Did not like datetimerfc1123 req " + util.inspect(req.body));
      }
    } else if (req.params.scenario === "duration") {
      if (_.isEqual(req.body, durationBody) || _.isEqual(req.body, durationBodyAlternate)) {
        return { status: 200 };
      } else {
        return composeError(400, "Did not like duration req " + util.inspect(req.body));
      }
    } else if (req.params.scenario === "byte") {
      if (JSON.stringify(req.body) === byteBody) {
        return { status: 200 };
      } else {
        return composeError(400, "Did not like byte req " + util.inspect(req.body));
      }
    } else {
      return composeError(400, "Must provide a valid primitive type.");
    }
  }),
);

Scenarios.Primitive_get = passOnSuccess(
  mockapi.get("/complex/primitive/:scenario", (req) => {
    if (req.params.scenario === "integer") {
      return { status: 200, body: json(intBody) };
    } else if (req.params.scenario === "long") {
      return { status: 200, body: json(longBody) };
    } else if (req.params.scenario === "float") {
      return { status: 200, body: json(floatBody) };
    } else if (req.params.scenario === "double") {
      return { status: 200, body: json(doubleBody) };
    } else if (req.params.scenario === "bool") {
      return { status: 200, body: json(boolBody) };
    } else if (req.params.scenario === "string") {
      return { status: 200, body: json(stringBody) };
    } else if (req.params.scenario === "date") {
      return { status: 200, body: json(dateBody) };
    } else if (req.params.scenario === "datetime") {
      return { status: 200, body: json(datetimeBody) };
    } else if (req.params.scenario === "datetimerfc1123") {
      return { status: 200, body: json(datetimeRfc1123Body) };
    } else if (req.params.scenario === "duration") {
      return { status: 200, body: json(durationBody) };
    } else if (req.params.scenario === "byte") {
      return { status: 200, body: json(JSON.parse(byteBody)) };
    } else {
      return composeError(400, "Must provide a valid primitive type scenario.");
    }
  }),
);

/**
 * Put and get for array properties.
 */
const arrayValidBody = '{"array":["1, 2, 3, 4","",null,"&S#$(*Y","The quick brown fox jumps over the lazy dog"]}';
Scenarios.Array_put = passOnSuccess(
  mockapi.put("/complex/array/:scenario", (req) => {
    if (req.params.scenario === "valid") {
      if (JSON.stringify(req.body) === arrayValidBody) {
        return { status: 200 };
      } else {
        return composeError(400, "Did not like complex array req " + util.inspect(req.body));
      }
    } else if (req.params.scenario === "empty") {
      if (JSON.stringify(req.body) === '{"array":[]}') {
        return { status: 200 };
      } else {
        return composeError(400, "Did not like complex array req " + util.inspect(req.body));
      }
    } else {
      return composeError(400, "Must provide a valid scenario.");
    }
  }),
);

Scenarios.Array_get = passOnSuccess(
  mockapi.get("/complex/array/:scenario", (req) => {
    if (req.params.scenario === "valid") {
      return { status: 200, body: json(JSON.parse(arrayValidBody)) };
    } else if (req.params.scenario === "empty") {
      return { status: 200, body: json(JSON.parse('{"array":[]}')) };
    } else if (req.params.scenario === "notprovided") {
      return { status: 200, body: json(JSON.parse("{}")) };
    } else {
      return composeError(400, "Must provide a valid scenario.");
    }
  }),
);

/**
 * Put and get for typed dictionary properties.
 */
const dictionaryValidBody = '{"defaultProgram":{"txt":"notepad","bmp":"mspaint","xls":"excel","exe":"","":null}}';
Scenarios.Dictionary_put = passOnSuccess(
  mockapi.put("/complex/dictionary/typed/:scenario", (req) => {
    if (req.params.scenario === "valid") {
      if (_.isEqual(req.body, JSON.parse(dictionaryValidBody))) {
        return { status: 200 };
      } else {
        return composeError(400, "Did not like complex dictionary req " + util.inspect(req.body));
      }
    } else if (req.params.scenario === "empty") {
      if (JSON.stringify(req.body) === '{"defaultProgram":{}}') {
        return { status: 200 };
      } else {
        return composeError(400, "Did not like complex array req " + util.inspect(req.body));
      }
    } else {
      return composeError(400, "Must provide a valid scenario.");
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
      return composeError(400, "Must provide a valid scenario.");
    }
  }),
);

/**
 * Put and get for untyped dictionary properties.
 */
Scenarios.Dictionary_untyped_put = passOnSuccess(
  mockapi.put("/complex/dictionary/untyped/:scenario", (req) => {
    return composeError(501, "Untyped dictionaries are not supported for now.");
  }),
);
Scenarios.Dictionary_untyped_get = passOnSuccess(
  mockapi.get("/complex/dictionary/untyped/:scenario", (req) => {
    return composeError(501, "Untyped dictionaries are not supported for now.");
  }),
);

/**
 * Put and get for inhertiance.
 */
const siamese =
  '{"breed":"persian","color":"green","hates":[{"food":"tomato","id":1,"name":"Potato"},{"food":"french fries","id":-1,"name":"Tomato"}],"id":2,"name":"Siameeee"}';
Scenarios.Inheritance_put = passOnSuccess(
  mockapi.put("/complex/inheritance/:scenario", (req) => {
    if (req.params.scenario === "valid") {
      if (_.isEqual(req.body, JSON.parse(siamese))) {
        return { status: 200 };
      } else {
        return composeError(400, "Did not like complex inheritance req " + util.inspect(req.body));
      }
    } else {
      return composeError(400, "Must provide a valid scenario.");
    }
  }),
);

Scenarios.Inheritance_get = passOnSuccess(
  mockapi.get("/complex/inheritance/:scenario", (req) => {
    if (req.params.scenario === "valid") {
      return { status: 200, body: json(JSON.parse(siamese)) };
    } else {
      return composeError(400, "Must provide a valid scenario.");
    }
  }),
);

/**
 * Put and get for polymorphism.
 */
const rawFish = {
  fishtype: "salmon",
  location: "alaska",
  iswild: true,
  species: "king",
  length: 1.0,
  siblings: [
    {
      fishtype: "shark",
      age: 6,
      birthday: "2012-01-05T01:00:00Z",
      length: 20.0,
      species: "predator",
    },
    {
      fishtype: "shark",
      sharktype: "sawshark",
      age: 105,
      birthday: "1900-01-05T01:00:00Z",
      length: 10.0,
      picture: new Buffer([255, 255, 255, 255, 254]).toString("base64"),
      species: "dangerous",
    },
    {
      fishtype: "shark",
      sharktype: "goblin",
      age: 1,
      birthday: "2015-08-08T00:00:00Z",
      length: 30.0,
      species: "scary",
      jawsize: 5,
      // Intentionally requiring a value not defined in the enum, since
      // such values should be allowed to be sent to/received from the server
      color: "pinkish-gray",
    },
  ],
};
const rawSalmon = {
  fishtype: "smart_salmon",
  location: "alaska",
  iswild: true,
  species: "king",
  additionalProperty1: 1,
  additionalProperty2: false,
  additionalProperty3: "hello",
  additionalProperty4: { a: 1, b: 2 },
  additionalProperty5: [1, 3],
  length: 1.0,
  siblings: [
    {
      fishtype: "shark",
      age: 6,
      birthday: "2012-01-05T01:00:00Z",
      length: 20.0,
      species: "predator",
    },
    {
      fishtype: "shark",
      sharktype: "sawshark",
      age: 105,
      birthday: "1900-01-05T01:00:00Z",
      length: 10.0,
      picture: new Buffer([255, 255, 255, 255, 254]).toString("base64"),
      species: "dangerous",
    },
    {
      fishtype: "shark",
      sharktype: "goblin",
      age: 1,
      birthday: "2015-08-08T00:00:00Z",
      length: 30.0,
      species: "scary",
      jawsize: 5,
      color: "pinkish-gray",
    },
  ],
};

const regularSalmon = {
  fishtype: "salmon",
  location: "alaska",
  iswild: true,
  species: "king",
  length: 1.0,
  siblings: [
    {
      fishtype: "shark",
      age: 6,
      birthday: "2012-01-05T01:00:00Z",
      length: 20.0,
      species: "predator",
    },
    {
      fishtype: "shark",
      sharktype: "sawshark",
      age: 105,
      birthday: "1900-01-05T01:00:00Z",
      length: 10.0,
      picture: new Buffer([255, 255, 255, 255, 254]).toString("base64"),
      species: "dangerous",
    },
    {
      fishtype: "shark",
      sharktype: "goblin",
      age: 1,
      birthday: "2015-08-08T00:00:00Z",
      length: 30.0,
      species: "scary",
      jawsize: 5,
      color: "pinkish-gray",
    },
  ],
};

const regularSalmonWithoutDiscriminator = {
  location: "alaska",
  iswild: true,
  species: "king",
  length: 1.0,
  siblings: [
    {
      fishtype: "shark",
      age: 6,
      birthday: "2012-01-05T01:00:00Z",
      length: 20.0,
      species: "predator",
    },
    {
      fishtype: "shark",
      sharktype: "sawshark",
      age: 105,
      birthday: "1900-01-05T01:00:00Z",
      length: 10.0,
      picture: new Buffer([255, 255, 255, 255, 254]).toString("base64"),
      species: "dangerous",
    },
    {
      fishtype: "shark",
      sharktype: "goblin",
      age: 1,
      birthday: "2015-08-08T00:00:00Z",
      length: 30.0,
      species: "scary",
      jawsize: 5,
      color: "pinkish-gray",
    },
  ],
};

const dotSalmon = {
  fish_type: "DotSalmon",
  location: "sweden",
  iswild: true,
  species: "king",
};

const dotFishMarketWithDiscriminator = {
  sampleSalmon: {
    fish_type: "DotSalmon",
    location: "sweden",
    iswild: false,
    species: "king",
  },
  salmons: [
    {
      fish_type: "DotSalmon",
      location: "sweden",
      iswild: false,
      species: "king",
    },
    {
      fish_type: "DotSalmon",
      location: "atlantic",
      iswild: true,
      species: "king",
    },
  ],
  sampleFish: {
    fish_type: "DotSalmon",
    location: "australia",
    iswild: false,
    species: "king",
  },
  fishes: [
    {
      fish_type: "DotSalmon",
      location: "australia",
      iswild: false,
      species: "king",
    },
    {
      fish_type: "DotSalmon",
      location: "canada",
      iswild: true,
      species: "king",
    },
  ],
};

const dotFishMarketWithoutDiscriminator = {
  sampleSalmon: {
    location: "sweden",
    iswild: false,
    species: "king",
  },
  salmons: [
    {
      location: "sweden",
      iswild: false,
      species: "king",
    },
    {
      location: "atlantic",
      iswild: true,
      species: "king",
    },
  ],
  sampleFish: {
    location: "australia",
    iswild: false,
    species: "king",
  },
  fishes: [
    {
      location: "australia",
      iswild: false,
      species: "king",
    },
    {
      location: "canada",
      iswild: true,
      species: "king",
    },
  ],
};

Scenarios.Polymorphism_dotsyntax_get = passOnSuccess(
  mockapi.get("/complex/polymorphism/dotsyntax", (req) => {
    return { status: 200, body: json(dotSalmon) };
  }),
);

Scenarios.Polymorphism_composedWithDiscriminator_get = passOnSuccess(
  mockapi.get("/complex/polymorphism/composedWithDiscriminator", (req) => {
    return { status: 200, body: json(dotFishMarketWithDiscriminator) };
  }),
);

Scenarios.Polymorphism_composedWithoutDiscriminator_get = passOnSuccess(
  mockapi.get("/complex/polymorphism/composedWithoutDiscriminator", (req) => {
    return { status: 200, body: json(dotFishMarketWithoutDiscriminator) };
  }),
);

Scenarios.Polymorphism_put = passOnSuccess(
  mockapi.put("/complex/polymorphism/:scenario", (req) => {
    if (req.params.scenario === "valid") {
      console.log(JSON.stringify(req.body, null, 4));
      console.log(JSON.stringify(rawFish, null, 4));
      if (_.isEqual(coerceDate(req.body), rawFish)) {
        return { status: 200 };
      } else {
        return composeError(400, "Did not like complex polymorphism req " + util.inspect(req.body));
      }
    } else if (req.params.scenario === "complicated") {
      console.log(JSON.stringify(req.body, null, 4));
      console.log(JSON.stringify(rawSalmon, null, 4));
      if (_.isEqual(coerceDate(req.body), rawSalmon)) {
        return { status: 200 };
      } else {
        return composeError(400, "Did not like complex polymorphism req " + util.inspect(req.body));
      }
    } else if (req.params.scenario === "missingdiscriminator") {
      console.log(JSON.stringify(req.body, null, 4));
      console.log(JSON.stringify(regularSalmon, null, 4));
      if (_.isEqual(coerceDate(req.body), regularSalmon)) {
        return { status: 200, body: json(regularSalmonWithoutDiscriminator) };
      } else {
        return composeError(400, "Did not like complex polymorphism req " + util.inspect(req.body));
      }
    } else {
      return composeError(400, "Must provide a valid scenario.");
    }
  }),
);

Scenarios.Polymorphism_get = passOnSuccess(
  mockapi.get("/complex/polymorphism/:scenario", (req) => {
    if (req.params.scenario === "valid") {
      return { status: 200, body: json(rawFish) };
    } else if (req.params.scenario === "complicated") {
      return { status: 200, body: json(rawSalmon) };
    } else {
      return composeError(400, "Must provide a valid scenario.");
    }
  }),
);

Scenarios.Polymorphism_missingrequired_invalid_get = passOnSuccess(
  mockapi.put("/complex/polymorphism/missingrequired/invalid", (req) => {
    return {
      status: 400,
      body: json(
        "Reached server in scenario: /complex/polymorphism/missingrequired/invalid, and should not have - since required fields are missing from the request, the client should not be able to send it.",
      ),
    };
  }),
);

/**
 * Put and get for recursive reference.
 */
const bigfishRaw = {
  fishtype: "salmon",
  location: "alaska",
  iswild: true,
  species: "king",
  length: 1,
  siblings: [
    {
      fishtype: "shark",
      age: 6,
      birthday: "2012-01-05T01:00:00Z",
      species: "predator",
      length: 20,
      siblings: [
        {
          fishtype: "salmon",
          location: "atlantic",
          iswild: true,
          species: "coho",
          length: 2,
          siblings: [
            {
              fishtype: "shark",
              age: 6,
              birthday: "2012-01-05T01:00:00Z",
              species: "predator",
              length: 20,
            },
            {
              fishtype: "shark",
              sharktype: "sawshark",
              age: 105,
              birthday: "1900-01-05T01:00:00Z",
              picture: new Buffer([255, 255, 255, 255, 254]).toString("base64"),
              species: "dangerous",
              length: 10,
            },
          ],
        },
        {
          fishtype: "shark",
          sharktype: "sawshark",
          age: 105,
          birthday: "1900-01-05T01:00:00Z",
          picture: new Buffer([255, 255, 255, 255, 254]).toString("base64"),
          species: "dangerous",
          length: 10,
          siblings: [],
        },
      ],
    },
    {
      fishtype: "shark",
      sharktype: "sawshark",
      age: 105,
      birthday: "1900-01-05T01:00:00Z",
      picture: new Buffer([255, 255, 255, 255, 254]).toString("base64"),
      species: "dangerous",
      length: 10,
      siblings: [],
    },
  ],
};

Scenarios.Polymorphicrecursive_put = passOnSuccess(
  mockapi.put("/complex/polymorphicrecursive/:scenario", (req) => {
    if (req.params.scenario === "valid") {
      console.log(JSON.stringify(req.body, null, 4));
      console.log(JSON.stringify(bigfishRaw, null, 4));
      if (_.isEqual(coerceDate(req.body), bigfishRaw)) {
        return { status: 200 };
      } else {
        return composeError(400, "Did not like complex polymorphic recursive req " + util.inspect(req.body));
      }
    } else {
      return composeError(400, "Must provide a valid scenario.");
    }
  }),
);

Scenarios.Polymorphicrecursive_get = passOnSuccess(
  mockapi.get("/complex/polymorphicrecursive/:scenario", (req) => {
    if (req.params.scenario === "valid") {
      return { status: 200, body: json(bigfishRaw) };
    } else {
      return composeError(400, "Must provide a valid scenario.");
    }
  }),
);

Scenarios.Readonlyproperty_get = passOnSuccess(
  mockapi.get("/complex/readonlyproperty/valid", (req) => {
    return { status: 200, body: json({ id: "1234", size: 2 }) };
  }),
);

Scenarios.Readonlyproperty_put = passOnSuccess(
  mockapi.put("/complex/readonlyproperty/valid", (req) => {
    if (req.body) {
      if (typeof req.body.id == "undefined") {
        return { status: 200 };
      } else {
        return composeError(400, "id is readonly");
      }
    } else {
      return composeError(400, "Must provide a body.");
    }
  }),
);

Scenarios.Int_get = passOnSuccess(
  mockapi.get("/nonStringEnums/int/get", () => {
    return { status: 200, body: json(429) };
  }),
);
