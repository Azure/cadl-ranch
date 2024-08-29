import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@typespec/versioning";
import "@azure-tools/typespec-azure-core";

using TypeSpec.Http;
using TypeSpec.Versioning;
using TypeSpec.Rest;

/**
 * Test for the `@removed` decorator.
 */
@service
@versioned(Versions)
@server(
  "{endpoint}/versioning/removed/api-version:{version}",
  "Testserver endpoint",
  {
    /**
     * Need to be set as 'http://localhost:3000' in client.
     */
    endpoint: url,

    /**
     * Need to be set as 'v1', 'beta' or 'v2' in client.
     */
    version: Versions,
  }
)
namespace Versioning.Removed;

/**
 * The version of the API.
 */
enum Versions {
  /**
   * The original version v1.
   */
  v1: "v1",

  /**
   * The beta version.
   */
  beta: "beta",

  /**
   * The latest version v2.
   */
  v2: "v2",
}

@removed(Versions.v2)
model ModelV1 {
  prop: string;
  enumProp: EnumV1;
  unionProp: UnionV1;
}

@removed(Versions.v2)
enum EnumV1 {
  enumMember,
}

model ModelV2 {
  prop: string;

  @removed(Versions.v2)
  removedProp: string;

  enumProp: EnumV2;

  @added(Versions.v1)
  unionProp: UnionV2;
}

model ModelV3 {
  id: string;

  @removed(Versions.beta)
  enumProp: EnumV3;
}

enum EnumV2 {
  @removed(Versions.v2)
  enumMemberV1,

  enumMemberV2,
}

enum EnumV3 {
  @removed(Versions.beta)
  enumMemberV1,

  enumMemberBeta,
}

@removed(Versions.v2)
union UnionV1 {
  string,
  int32,
}

union UnionV2 {
  string,
  float32,

  @removed(Versions.v2)
  V1Scalar,
}

@removed(Versions.v2)
scalar V1Scalar extends int32;

/**
 * This operation should not be generated with latest version's signature.
 */
#suppress "@azure-tools/cadl-ranch-expect/missing-scenario" "by design"
@route("/v1")
@post
@removed(Versions.v2)
op v1(@body body: ModelV1): ModelV1;

@scenario
@scenarioDoc("""
  This operation should be generated with latest version's signature.
  
  Expected request body:
  ```json
  { "prop": "foo", "enumProp": "enumMemberV2", "unionProp": "bar" }
  ```
  """)
@route("/v2")
@post
op v2(@body body: ModelV2, @removed(Versions.v2) @query param: string): ModelV2;

/**
 * This operation group should not be generated with latest version.
 */
@route("/interface-v1")
@removed(Versions.v2)
interface InterfaceV1 {
  #suppress "@azure-tools/cadl-ranch-expect/missing-scenario" "by design"
  @post
  @route("/v1")
  v1InInterface(@body body: ModelV1): ModelV1;
}

/** This operation should be generated with the signatures of both the latest and the original versions, rather than beta version */
@scenario
@scenarioDoc("""
  path: "/versioning/removed/api-version:v1/v3"
  Expected request body:
  ```json
  { "id": "123", "enumProp": "enumMemberV1" }
  ```
  """)
@post
@route("/v3inversion1")
op modelV3InVersion1(@body body: ModelV3): ModelV3;

@scenario
@scenarioDoc("""
  Expected request body:
  ```json
  { "id": "123", "enumProp": "enumMemberBeta"}
  ```
  """)
@post
@route("/v3inversionbeta")
op modelV3InVersionBeta(@body body: ModelV3): ModelV3;

@scenario
@scenarioDoc("""
  Expected request body:
  ```json
  { "id": "123", "enumProp": "enumMemberV1" }
  ```
  """)
@post
@route("/v3inversion2")
op modelV3InVersion2(@body body: ModelV3): ModelV3;
