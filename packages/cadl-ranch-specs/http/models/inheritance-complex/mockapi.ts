import { passOnSuccess, mockapi, json, ValidationError } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};
function coerceDate(targetObject: any) {
  let stringRep = JSON.stringify(targetObject);
  stringRep = stringRep.replace(/(\d\d\d\d-\d\d-\d\d[Tt]\d\d:\d\d:\d\d)\.\d{3,7}([Zz]|[+-]00:00)/g, "$1Z");
  return JSON.parse(stringRep);
}

Scenarios.BodyComplexPolymorphism_basicOps = passOnSuccess([
  mockapi.put("/complex/basic/:scenario", (req) => {
    if (req.params.scenario === "valid") {
      req.expect.bodyEquals({ id: 2, name: "abc", color: "Magenta" });
      return { status: 200 };
    } else {
      throw new ValidationError('Must specify scenario either "valid" or "empty"', null, req.params.scenario);
    }
  }),
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
      throw new ValidationError(
        "Request scenario must be valid, empty, null, notprovided, or invalid.",
        null,
        req.params.scenario,
      );
    }
  }),
]);

/**
 * Put and get for inhertiance.
 */
const siamese =
  '{"breed":"persian","color":"green","hates":[{"food":"tomato","id":1,"name":"Potato"},{"food":"french fries","id":-1,"name":"Tomato"}],"id":2,"name":"Siameeee"}';
Scenarios.BodyComplexPolymorphism_inheritance = passOnSuccess([
  mockapi.put("/complex/inheritance/:scenario", (req) => {
    if (req.params.scenario === "valid") {
      req.expect.bodyEquals(JSON.parse(siamese));
      return { status: 200 };
    } else {
      throw new ValidationError("Must provide a valid scenario.", null, req.params.scenario);
    }
  }),
  mockapi.get("/complex/inheritance/:scenario", (req) => {
    if (req.params.scenario === "valid") {
      return { status: 200, body: json(JSON.parse(siamese)) };
    } else {
      throw new ValidationError("Must provide a valid scenario.", null, req.params.scenario);
    }
  }),
]);

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

Scenarios.BodyComplexPolymorphism_polymorphism = passOnSuccess([
  mockapi.put("/complex/polymorphism/:scenario", (req) => {
    if (req.params.scenario === "valid") {
      console.log(JSON.stringify(req.body, null, 4));
      console.log(JSON.stringify(rawFish, null, 4));
      req.expect.deepEqual(coerceDate(req.body), rawFish);
      return { status: 200 };
    } else if (req.params.scenario === "complicated") {
      console.log(JSON.stringify(req.body, null, 4));
      console.log(JSON.stringify(rawSalmon, null, 4));
      req.expect.deepEqual(coerceDate(req.body), rawSalmon);
      return { status: 200 };
    } else if (req.params.scenario === "missingdiscriminator") {
      console.log(JSON.stringify(req.body, null, 4));
      console.log(JSON.stringify(regularSalmon, null, 4));
      req.expect.deepEqual(coerceDate(req.body), regularSalmon);
      return { status: 200, body: json(regularSalmonWithoutDiscriminator) };
    } else {
      throw new ValidationError("Must provide a valid scenario.", null, req.params.scenario);
    }
  }),
  mockapi.get("/complex/polymorphism/:scenario", (req) => {
    if (req.params.scenario === "valid") {
      return { status: 200, body: json(rawFish) };
    } else if (req.params.scenario === "complicated") {
      return { status: 200, body: json(rawSalmon) };
    } else if (req.params.scenario === "dotsyntax") {
      return { status: 200, body: json(dotSalmon) };
    } else if (req.params.scenario === "composedWithDiscriminator") {
      return { status: 200, body: json(dotFishMarketWithDiscriminator) };
    } else if (req.params.scenario === "composedWithoutDiscriminator") {
      return { status: 200, body: json(dotFishMarketWithoutDiscriminator) };
    } else {
      throw new ValidationError("Must provide a valid scenario.", null, req.params.scenario);
    }
  }),
  mockapi.put("/complex/polymorphism/missingrequired/invalid", (req) => {
    throw new ValidationError(
      "Reached server in scenario: /complex/polymorphism/missingrequired/invalid, and should not have - since required fields are missing from the request, the client should not be able to send it.",
      null,
      null,
    );
  }),
]);

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

Scenarios.BodyComplexPolymorphism_polymorphicrecursive = passOnSuccess([
  mockapi.put("/complex/polymorphicrecursive/:scenario", (req) => {
    if (req.params.scenario === "valid") {
      console.log(JSON.stringify(req.body, null, 4));
      console.log(JSON.stringify(bigfishRaw, null, 4));
      req.expect.deepEqual(coerceDate(req.body), bigfishRaw);
      return { status: 200 };
    } else {
      throw new ValidationError("Must provide a valid scenario.", null, req.params.scenario);
    }
  }),
  mockapi.get("/complex/polymorphicrecursive/:scenario", (req) => {
    if (req.params.scenario === "valid") {
      return { status: 200, body: json(bigfishRaw) };
    } else {
      throw new ValidationError("Must provide a valid scenario.", null, req.params.scenario);
    }
  }),
]);
