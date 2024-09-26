import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

@doc("Illustrates models with visibility properties.")
@scenarioService("/type/model/visibility")
namespace Type.Model.Visibility;

@doc("Input model with create/update properties.")
model VisibilityModel {
  @doc("Required string[], illustrating a create property.")
  @visibility("create")
  createProp: string[];

  @doc("Required int32[], illustrating a update property.")
  @visibility("update")
  updateProp: int32[];
}

@doc("Input model with visibility properties for opeation 'headmodel'.")
model HeadInputModel {
  @doc("Required int32, illustrating a query property.")
  @visibility("query")
  queryProp: int32;

  @doc("Required string[], illustrating a create property.")
  @visibility("create")
  createProp: string[];

  @doc("Required int32[], illustrating a update property.")
  @visibility("update")
  updateProp: int32[];

  @doc("Required boolean, illustrating a delete property.")
  @visibility("delete")
  deleteProp: boolean;
}

/** Output model with readonly properties. */
model ReadModel {
  @doc("Required string, illustrating a readonly property.")
  @visibility("read")
  readProp: string;
}

/** Input model with readonly properties. */
model QueryModel {
  @doc("Required int32, illustrating a query property.")
  @visibility("query")
  queryProp: int32;
}

/** Input model with readonly properties. */
model CreateModel {
  @doc("Required string[], illustrating a create property.")
  @visibility("create")
  createProp: string[];
}

/** Input model with readonly properties. */
model UpdateModel {
  @doc("Required int32[], illustrating a update property.")
  @visibility("update")
  updateProp: int32[];
}

/** Input model with readonly properties. */
model DeleteModel {
  @doc("Required boolean, illustrating a delete property.")
  @visibility("delete")
  deleteProp: boolean;
}

/** RoundTrip model with readonly optional properties. */
model ReadOnlyModel {
  /** Optional readonly nullable int list. */
  @visibility("read")
  optionalNullableIntList?: int32[] | null;

  /** Optional readonly string dictionary. */
  @visibility("read")
  optionalStringRecord?: Record<string>;
}

@scenario
@scenarioDoc("""
  Generate and send put model with visibility properties.
  Expected input body:
  ```json
  {
    queryProp: 123,
    createProp: ["foo", "bar"],
    updateProp: [1, 2],
    deleteProp: true,
  }
  ```
  """)
@head
op headModel(@body input: HeadInputModel): OkResponse;

@scenario
@scenarioDoc("""
  Generate and receive output model with readonly properties.
  Expected input body:
  ```json
  {
    queryProp: 123,
  }
  ```
  
  Expected response body:
  ```json
  {
    readProp: "abc",
  }
  ```
  """)
@get
op getModel(@body input: QueryModel): {
  @body
  output: ReadModel;
};

@scenario
@scenarioDoc("""
  Generate and receive output model with readonly properties.
  Expected header: "queryProp": "123"
  
  Expected response body:
  ```json
  {
    readProp: "abc",
  }
  ```
  """)
@get
@route("/getwithquery")
op getModelWithQuery(@query queryProp: int32): {
  @body
  output: ReadModel;
};

@scenario
@scenarioDoc("""
  Generate and send put model with write/create/update properties.
  Expected input body:
  ```json
  {
    createProp: ["foo", "bar"],
    updateProp: [1, 2],
  }
  ```
  """)
@put
op putModel(@body input: VisibilityModel): void;

@scenario
@scenarioDoc("""
  Generate and send put model with write/update properties.
  Expected input body:
  ```json
  {
    updateProp: [1, 2],
  }
  ```
  """)
@patch
op patchModel(@body input: UpdateModel): void;

@scenario
@scenarioDoc("""
  Generate and send put model with write/create properties.
  Expected input body:
  ```json
  {
    createProp: ["foo", "bar"],
  }
  ```
  """)
@post
op postModel(@body input: CreateModel): void;

@scenario
@scenarioDoc("""
  Generate and send put model with delete properties.
  Expected input body:
  ```json
  {
    deleteProp: true,
  }
  ```
  """)
@delete
op deleteModel(@body input: DeleteModel): void;

@route("/readonlyroundtrip")
@scenario
@scenarioDoc("""
  Generate and receive output model with readonly properties.
  
  Expected input body:
  ```json
  {}
  ```
  
  Expected response body:
  ```json
  {
    optionalNullableIntList: [1, 2, 3],
    optionalStringRecord: { k1: "value1", k2: "value2" },
  }
  ```
  """)
@put
op putReadOnlyModel(@body input: ReadOnlyModel): ReadOnlyModel;
