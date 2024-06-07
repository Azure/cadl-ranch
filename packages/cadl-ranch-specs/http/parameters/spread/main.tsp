import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Test for the spread operator.")
@supportedBy("dpg")
@scenarioService("/parameters/spread")
namespace Parameters.Spread;

@route("/model")
@operationGroup
namespace Model {
  @doc("This is a simple model.")
  model BodyParameter {
    name: string;
  }

  @scenario
  @scenarioDoc("""
  Test case for spread named model. 
  
  Should generate request body model named `BodyParameter`.
  Should generate an operation like below:
  ```
  spreadAsRequestBody(bodyParameter: BodyParameter)
  ```
  Note the parameter name is guessed from the model name and it may vary by language.
  
  Expected request body:
  ```json
  { "name": "foo" }
  ```
  """)
  @route("/request-body")
  @put
  op spreadAsRequestBody(...BodyParameter): NoContentResponse;

  @doc("This is a model only with `@body` property.")
  model CompositeRequestOnlyWithBody {
    @body body: BodyParameter;
  }

  @scenario
  @scenarioDoc("""
  Test case for spread model only with `@body` property. 
  
  Should generate request body model named `BodyParameter`.
  Should not generate model named `CompositeRequestOnlyWithBody`.
  Should generate an operation like below:
  ```
  spreadCompositeRequestOnlyWithBody(bodyParameter: BodyParameter)
  ```
  Note the parameter name is guessed from the model name and it may vary by language.
  
  Expected request body:
  ```json
  { "name": "foo" }
  ```
  """)
  @route("/composite-request-only-with-body")
  @put
  op spreadCompositeRequestOnlyWithBody(...CompositeRequestOnlyWithBody): NoContentResponse;

  @doc("This is a model without `@body` property.")
  model CompositeRequestWithoutBody {
    @path
    name: string;

    @header
    testHeader: string;
  }

  @scenario
  @scenarioDoc("""
  Test case for spread model without `@body` property. 
  
  Should not generate model named `CompositeRequestOnlyWithBody`.
  Should generate an operation like below:
  ```
  spreadCompositeRequestWithoutBody(name: string, testHeader: string)
  ```

  Expected path parameter: name="foo"
  Expected header parameter: testHeader="bar"
  """)
  @route("/composite-request-without-body/{name}")
  @put
  op spreadCompositeRequestWithoutBody(...CompositeRequestWithoutBody): NoContentResponse;

  @doc("This is a model with all http request decorator.")
  model CompositeRequest {
    @path
    name: string;

    @header
    testHeader: string;

    @body
    body: BodyParameter;
  }

  @scenario
  @scenarioDoc("""
  Test case for spread model with all http request decorator. 
  
  Should generate request body model named `BodyParameter`.
  Should not generate model named `CompositeRequest`.
  Should generate an operation like below:
  ```
  spreadCompositeRequest(name: string, testHeader: string, bodyParameter: BodyParameter)
  ```
  Note the parameter name is guessed from the model name and it may vary by language.
  
  Expected path parameter: name="foo"
  Expected header parameter: testHeader="bar"
  Expected request body:
  ```json
  { "name": "foo" }
  ```
  """)
  @route("/composite-request/{name}")
  @put
  op spreadCompositeRequest(...CompositeRequest): NoContentResponse;

  @doc("This is a model with non-body http request decorator.")
  model CompositeRequestMix {
    @path
    name: string;

    @header
    testHeader: string;

    prop: string;
  }

  @scenario
  @scenarioDoc("""
  Test case for spread model with non-body http request decorator. 
  
  Should generate request body model named `CompositeRequestMix`.
  Should generate an operation like below:
  ```
  spreadCompositeRequestMix(name: string, testHeader: string, bodyParameter: CompositeRequestMix)
  ```
  Note the parameter name is guessed from the model name and it may vary by language.
  
  Expected path parameter: name="foo"
  Expected header parameter: testHeader="bar"
  Expected request body:
  ```json
  { "prop": "foo" }
  ```
  """)
  @route("/composite-request-mix/{name}")
  @put
  op spreadCompositeRequestMix(...CompositeRequestMix): NoContentResponse;
}

@route("/alias")
@operationGroup
namespace Alias {
  alias BodyParameter = {
    name: string;
  };

  @scenario
  @scenarioDoc("""
  Test case for spread alias. 
  
  Should not generate any model named `BodyParameter`.
  Should generate an operation like:
  ```
  spreadAsRequestBody(name: string)
  ```
  
  Expected request body:
  ```json
  { "name": "foo" }
  ```
  """)
  @route("/request-body")
  @put
  op spreadAsRequestBody(...BodyParameter): NoContentResponse;

  model ModelParameter {
    name: string;
  }

  alias BodyParameterAliasWithModel = {
    @path
    id: string;

    ...ModelParameter;

    @header
    `x-ms-test-header`: string;
  };

  @scenario
  @scenarioDoc("""
  Test case for spread alias. 
  
  Should  generate a model named `BodyParameterAliasWithModel`.
  Should generate an operation like:
  ```
  spreadAliasWithModel(BodyParameterAliasWithModel: withModelParameter)
  ```
  Note the parameter name is guessed from the model name and it may vary by language.

  Expected path parameter: id="1"
  Expected header parameter: x-ms-test-header="bar"
  Expected request body:
  ```json
  { "name": "foo" }
  ```
  """)
  @route("/request-with-model/{id}")
  @put
  op spreadAliasWithModel(...BodyParameterAliasWithModel): NoContentResponse;

  alias RequestParameter = {
    @path
    id: string;

    @header
    `x-ms-test-header`: string;

    name: string;
  };

  @scenario
  @scenarioDoc("""
  Test case for spread alias with path and header parameter. 
  
  Should not generate any model named `RequestParameter`.
  Should generate an operation like below:
  ```
  spreadAsRequestParameter(id: string, x_ms_test_header: string, name: string)
  ```
  Note the parameter name may be normalized and vary by language.
  
  Expected path parameter: id="1"
  Expected header parameter: x-ms-test-header="bar"
  Expected request body:
  ```json
  { "name": "foo" }
  ```
  """)
  @route("/request-parameter/{id}")
  @put
  op spreadAsRequestParameter(...RequestParameter): NoContentResponse;

  alias MultipleRequestParameters = {
    @path
    id: string;

    @header
    `x-ms-test-header`: string;

    prop1: string;
    prop2: string;
    prop3: string;
    prop4: string;
    prop5: string;
    prop6: string;
  };

  @scenario
  @scenarioDoc("""
  Test case for spread alias including 6 parameters. May handle as property bag for these parameters.
  
  Should not generate any model named `AliasMultipleRequestParameters`.
  Should generate an operation like below:
  ```
  spreadWithMultipleParameters(id: string, x_ms_test_header: string, prop1: string, prop2: string, prop3: string, prop4: string, prop5: string, prop6: string)
  ```
  Note it's also acceptable if some languages handle it as property bag.
  
  Expected path parameter: id="1"
  Expected header parameter: x-ms-test-header="bar"
  Expected request body:
  ```json
  {
    "prop1":"foo1",
    "prop2":"foo2",
    "prop3":"foo3",
    "prop4":"foo4",
    "prop5":"foo5",
    "prop6":"foo6"
  }
  ```
  """)
  @route("/multiple-parameters/{id}")
  @put
  op spreadWithMultipleParameters(...MultipleRequestParameters): NoContentResponse;

  alias BodyParameterAliasWithOptionalProps = {
    @path id: string;

    @doc("name of the Thing")
    name: string;

    @doc("optional property of the Thing")
    color?: string;

    @doc("age of the Thing")
    age?: int32;

    @header
    `x-ms-test-header`: string;

    @doc("required array")
    items: int32[];

    @doc("optional array")
    elements?: string[];
  };

  @scenario
  @scenarioDoc("""
  Test case for spread alias. 
  
  Should  generate a model named `BodyParameterAliasWithOptionalProps`.
  Should generate an operation like:
  ```
  spreadAliasWithOptionalProps(spreadAliasWithOptionalProps: optionalProps)
  ```
  Note the parameter name is guessed from the model name and it may vary by language.

  Expected path parameter: id="1"
  Expected header parameter: x-ms-test-header="bar"
  Expected request body:
  ```json
  { "name": "foo" 
  "color": "red",
    "age": 10,
    "items": [1, 2, 3],
    "elements": ["a", "b", "c"]}
  ```
  """)
  @route("/spread-Alias-With-Optional-Props/{id}")
  @put
  op spreadAliasWithOptionalProps(...BodyParameterAliasWithOptionalProps): NoContentResponse;

  alias AliasWithRequiredAndOptionalCollections = {
    @doc("required list")
    requiredStringList: string[];

    @doc("optional list")
    optionalStringList?: string[];
  };

  @scenario
  @scenarioDoc("""
  Test case for spread alias. 
  
  Should  generate a model named `AliasWithRequiredAndOptionalCollections`.
  Should generate an operation like:
  ```
  spreadAliasWithOptionalCollections(AliasWithRequiredAndOptionalCollections: optionalCollections)
  ```
  Note the parameter name is guessed from the model name and it may vary by language.

  Expected request body:
  ```json
  { requiredStringList: ["a", "b"],
  optionalStringList: ["c", "d"]}
  ```
  """)
  @route("/spread-Alias-With-Optional-Collections")
  @put
  op spreadAliasWithOptionalCollections(...AliasWithRequiredAndOptionalCollections): NoContentResponse;
}
