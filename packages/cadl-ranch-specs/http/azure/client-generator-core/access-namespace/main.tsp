import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using global.Azure.ClientGenerator.Core;

@doc("Test for access/usage decorator.")
@supportedBy("dpg")
@scenarioService("/azure/client-generator-core/access-namespace")
namespace _Specs_.Azure.ClientGenerator.Core.AccessNamespace;

// this model should be access=internal and usage=output
model OutputModel {
  name: string;
}

// all the oprations and models within this interface should be access=internal
@access(Access.internal)
namespace InternalOperations {
  @get
  op output(): OutputModel;
}

// all the models within this namespace should be access=public and usage=output
@access(Access.public)
@usage(Usage.output)
namespace Models {
  model Model1 {
    ref: Model2;
  }

  model Model2 {
    name: string;
  }
}
