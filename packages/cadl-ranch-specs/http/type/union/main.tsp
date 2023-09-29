import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;
@doc("Test for type of union.")
@supportedBy("dpg")
@scenarioService("/type/union")
namespace Type.Union;

model Cat {
  name: string;
}

model Dog {
  bark: string;
}

enum LR {
  left,
  right,
}
enum UD {
  up,
  down,
}

/**
 * Describe union of string "a" | "b" | "c"
 */
@route("/strings-only")
interface StringOnly extends GetAndSend<"a" | "b" | "c", "\"b\""> {}

/**
 * Describe union of string string | "b" | "c"
 */
@route("/string-extensible")
interface StringExtensible extends GetAndSend<string | "b" | "c", "\"custom\""> {}

/**
 * Describe union of integer 1 | 2 | 3
 */
@route("/ints-only")
interface IntOnly extends GetAndSend<1 | 2 | 3, "2"> {}

/**
 * Describe union of floats 1.1 | 2.2 | 3.3
 */
@route("/floats-only")
interface FloatOnly extends GetAndSend<1.1 | 2.2 | 3.3, "2.2"> {}

/**
 * Describe union of models
 */
@route("/models-only")
interface ModelsOnly extends GetAndSend<Cat | Dog, """
  {
  "name": "test"
  }
  """> {}

model EnumsOnlyCases {
  /** This should be recieve/send the left variant */
  lr: LR;
  /** This should be recieve/send the up variant */
  ud: UD;
}

/**
 * Describe union of 2 different enums
 */
@route("/enums-only")
interface EnumsOnly extends GetAndSend<LR | UD, """
  {
    "lr": "right",
    "ud": "up"
  }
  """, EnumsOnlyCases> {}

model StringAndArrayCases {
  /** This should be recieve/send the string variant */
  string: string;
  /** This should be recieve/send the array variant */
  array: string[];
}

/**
 * Describe union of a string and an array of strings
 */
@route("/enums-only")
interface StringAndArray
  extends GetAndSend<
      string | string[],
      """
      {
        "string": "test",
        "array": ["test1", "test2"]
      }
      """,
      StringAndArrayCases
    > {}

alias MixedTypesUnion = Cat | "a" | 2 | 3.3 | true;
model MixedTypesCases {
  /** This should be recieve/send the TestModel variant */
  `model`: MixedTypesUnion;
  /** This should be recieve/send the "a" variant */
  stringLiteral: MixedTypesUnion;
  /** This should be recieve/send the 2 variant */
  intLiteral: MixedTypesUnion;
  /** This should be recieve/send the 3.3 variant */
  floatLiteral: MixedTypesUnion;
  /** This should be recieve/send the true variant */
  booleanLiteral: MixedTypesUnion;
}

/**
 * Describe union of floats "a" | 2 | 3.3
 */
@route("/mixed-types")
interface MixedTypes
  extends GetAndSend<
      MixedTypesUnion,
      """
      {
        "model": {
          "name": "test"
        },
        "stringLiteral": "a",
        "intLiteral": 2,
        "floatLiteral": 3.3
      }
      """,
      MixedTypesCases
    > {}

/**
 * Helper interface to describe a test involving getting and sending a specific data
 */
interface GetAndSend<Union, Payload extends valueof string, Cases = Union> {
  @scenario
  @scenarioDoc(
    """
    Verify a union can be processed in a response: 
    ```tsp
    {type}
    ```

    Expected response body:
    ```json
    { "prop": {value}}
    ```
    """,
    {
      type: Union,
      value: Payload,
    }
  )
  get(): {
    prop: Cases;
  };

  @scenario
  @scenarioDoc(
    """
    Verify a union can be processed in a response: 
    ```tsp
    {type}
    ```

    Expected request to send body:
    ```json
    { "prop": {value}}
    ```
    """,
    {
      type: Union,
      value: Payload,
    }
  )
  send(prop: Cases): void;
}
