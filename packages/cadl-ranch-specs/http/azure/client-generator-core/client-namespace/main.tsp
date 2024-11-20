import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

/** Illustrates the clientNamespace cases. */
@scenarioService("/azure/client-generator-core/client-namespace")
namespace _Specs_.Azure.ClientGenerator.Core.ClientNamespace;

interface First {
  #suppress "@azure-tools/cadl-ranch-expect/missing-scenario" "scenario defined in client.tsp"
  @route("/first")
  @get
  get(): FirstModel.FirstClientResult;
}

namespace FirstModel {
  model FirstClientResult {
    name: string;
  }
}

namespace Second {
  #suppress "@azure-tools/cadl-ranch-expect/missing-scenario" "scenario defined in client.tsp"
  @route("/second")
  @get
  op get(): Model.SecondClientResult;

  namespace Model {
    model SecondClientResult {
      type: SecondClientEnumType;
    }

    union SecondClientEnumType {
      string,
      "type",
    }
  }
}
