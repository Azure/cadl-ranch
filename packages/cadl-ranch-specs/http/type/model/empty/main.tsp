import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

/**
 * Those tests are meant to test different behavior of records if they are used as input, output or both.
 * This is something that might not matter in your emitter.
 *
 * This is valuable if you for example only decide to create a public constructor if a model is used as input.
 */
@doc("Illustrates usage of empty model used in operation's parameters and responses.")
@scenarioService("/type/model/empty")
namespace Type.Model.Empty;

@doc("Empty model used in operation parameters")
model EmptyInput {}

@doc("Empty model used in operation return type")
model EmptyOutput {}

@scenario
@scenarioDoc("Send a POST request with the following body {}")
@route("/input")
op input(@body input: EmptyInput): void;

@scenario
@scenarioDoc("Send a GET request which return the following body {}")
@route("/output")
op output(): EmptyOutput;
