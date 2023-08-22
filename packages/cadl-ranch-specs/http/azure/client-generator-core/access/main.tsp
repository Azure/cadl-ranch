import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Test for internal decorator.")
@supportedBy("dpg")
@scenarioService("/azure/client-generator-core/access")
namespace _Specs_.Azure.ClientGenerator.Core.Access;

@route("/public")
@global.Azure.ClientGenerator.Core.operationGroup
@scenario
@scenarioDoc("""
This scenario contains public operations. It should be generated and exported.
Expected query parameter: name=<any string>
Expected response body:
```json
{
  "name": <any string>
}
```
""")
namespace Public {
  @doc("Used in a public operation, should be generated and exported.")
  model NoDecoratorModelInPublic {
    name: string;
  }

  @doc("Used in a public operation, should be generated and exported.")
  @access(Access.public)
  model PublicDecoratorModelInPublic {
    name: string;
  }

  @route("/noDecoratorInPublic")
  @get
  @access(Access.public)
  op noDecoratorInPublic(@query name: string): NoDecoratorModelInPublic;

  @route("/publicDecoratorInPublic")
  @get
  @access(Access.public)
  op publicDecoratorInPublic(@query name: string): PublicDecoratorModelInPublic;
}


@route("/internal")
@global.Azure.ClientGenerator.Core.operationGroup
@scenario
@scenarioDoc("""
This scenario contains internal operations. All should be generated but not exposed.
Expected query parameter: name=<any string>
Expected response body:
```json
{
  "name": <any string>
}
```
""")
namespace Internal {
  @doc("Used in an internal operation, should be generated but not exported.")
  model NoDecoratorModelInInternal {
    name: string;
  }

  @doc("Used in an internal operation, should be generated but not exported.")
  @access(Access.internal)
  model InternalDecoratorModelInInternal {
    name: string;
  }

  @doc("Used in an internal operation but with public decorator, should be generated and exported.")
  @access(Access.public)
  model PublicDecoratorModelInInternal {
    name: string;
  }

  @route("/noDecoratorInInternal")
  @get
  @access(Access.internal)
  op noDecoratorInInternal(@query name: string): NoDecoratorModelInInternal;

  @route("/internalDecoratorInInternal")
  @get
  @access(Access.internal)
  op internalDecoratorInInternal(@query name: string): InternalDecoratorModelInInternal;
  
  @route("/publicDecoratorInInternal")
  @get
  @access(Access.internal)
  op publicDecoratorInInternal(@query name: string): PublicDecoratorModelInInternal;
}

@route("/shared")
@global.Azure.ClientGenerator.Core.operationGroup
@scenario
@scenarioDoc("""
This scenario contains two operations, one public, another internal. The public one should be generated and exported while the internal one should be generated but not exposed.
Expected query parameter: name=<any string>
Expected response body:
```json
{
  "name": <any string>
}
```
""")
namespace Shared {
  @doc("Used by both public and internal operation. It should be generated and exported.")
  model SharedModel {
    name: string;
  }

  @route("/public")
  @get
  @access(Access.public)
  op public(@query name: string): SharedModel;

  @route("/internal")
  @get
  @access(Access.internal)
  op internal(@query name: string): SharedModel;
}

@route("/relative")
@global.Azure.ClientGenerator.Core.operationGroup
@scenario
@scenarioDoc("""
This scenario contains internal operations. All should be generated but not exposed.
""")
namespace Relative {
  @doc("Used in internal operations, should be generated but not exported.")
  model OuterModel extends BaseModel {
    inner: InnerModel;
  }

  @doc("Used in internal operations, should be generated but not exported.")
  model InnerModel {
    name: string;
  }

  @doc("Used in internal operations, should be generated but not exported.")
  model BaseModel {
    name: string;
  }

  @doc("Used in internal operations, should be generated but not exported.")
  @discriminator("kind")
  model AbstractModel {
    name: string;
  }

  @doc("Used in internal operations, should be generated but not exported.")
  model RealModel extends AbstractModel {
    kind: "real";
  }

  @doc("""
  Expected query parameter: name=<any string>
  Expected response body:
  ```json
  {
    "name": <any string>,
    "inner":
    {
      "name": <any string>
    }
  }
  ```
  """)
  @route("/operation")
  @get
  @access(Access.internal)
  op operation(@query name: string): OuterModel;

  @doc("""
  Expected query parameter: kind=<any string>
  Expected response body:
  ```json
  {
    "name": <any string>,
    "kind": "real"
  }
  ```
  """)
  @route("/discriminator")
  @get
  @access(Access.internal)
  op discriminator(@query kind: string): AbstractModel;
}