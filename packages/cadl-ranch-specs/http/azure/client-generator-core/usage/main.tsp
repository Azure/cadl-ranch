import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Test for internal decorator.")
@supportedBy("dpg")
@scenarioService("/azure/client-generator-core/usage")
namespace _Specs_.Azure.ClientGenerator.Core.Usage;

@scenario
@scenarioDoc("""
This scenario contains two public operations. Both should be generated and exported.
The models are override to roundtrip, so they should be generated and exported as well.
""")
namespace ModelInOperation {
  @doc("Usage override to roundtrip.")
  @usage(Usage.Input | Usage.Output)
  model InputModel {
    name: string;
  }

  @doc("""
  Expected body parameter: 
  ```json
  {
    "name": <any string>
  }
  ```
  """)
  @route("/inputToRoundTrip")
  @post
  op inputToRoundTrip(@body body: InputModel): void;

  @doc("Usage override to roundtrip.")
  @usage(Usage.Input | Usage.Output)
  model OutputModel {
    name: string;
  }

  @doc("""
  Expected response body: 
  ```json
  {
    "name": <any string>
  }
  ```
  """)
  @route("/outputToRoundTrip")
  @get
  op outputToRoundTrip(): OutputModel;
}

namespace Orphan {
  @doc("Not used anywhere, but access is override to public so still need to be generated and exported with serialization.")
  @usage(Usage.Input)
  @access(Access.Public)
  model OrphanModel {
    name: string;
  }
}
