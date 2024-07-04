import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

@doc("Illustrates models with visibility properties.")
@scenarioService("/type/model/visibility")
namespace Type.Model.Visibility;

@doc("Output model with visibility properties.")
model VisibilityModel {
  @doc("Required string, illustrating a readonly property.")
  @visibility("read")
  readProp: string;

  @doc("Required int32, illustrating a query property.")
  @visibility("query")
  queryProp: int32;

  @doc("Required string[], illustrating a create property.")
  @visibility("create")
  createProp: string[];

  @doc("Required int32[], illustrating a update property.")
  @visibility("update")
  updateProp: int32[];

  @doc("Required bool, illustrating a delete property.")
  @visibility("delete")
  deleteProp: boolean;
}

/** Innermodel used as a readonly property for testing. */
model InnerModel {
  name: string;
}

/** RoundTrip model with readonly properties. */
model ReadOnlyModel {
  /** Required readonly nullable int list. */
  @visibility("read")
  requiredNullableIntList: int32[] | null;

  /** Optional readonly nullable int list. */
  @visibility("read")
  optionalNullableIntList?: int32[] | null;

  /** Required readonly nullable model list. */
  @visibility("read")
  requiredNullableModelList: InnerModel[] | null;

  /** Optional readonly nullable model list. */
  @visibility("read")
  optionalNullableModelList?: InnerModel[] | null;

  /** Required readonly string dictionary. */
  @visibility("read")
  requiredStringRecord: Record<string>;

  /** Optional readonly string dictionary. */
  @visibility("read")
  optionalStringRecord?: Record<string>;

  /** Required readonly model dictionary. */
  @visibility("read")
  requiredModelRecord: Record<InnerModel>;

  /** Optional readonly model dictionary. */
  @visibility("read")
  optionalModelRecord?: Record<InnerModel>;
}

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
op getModel(@body input: VisibilityModel): {
  @body
  output: VisibilityModel;
};

@scenario
@scenarioDoc("""
Generate abd send put model with write/create properties.
Expected input body:
```json
{
  queryProp: 123,
}
```
""")
@head
op headModel(@body input: VisibilityModel): OkResponse;

@scenario
@scenarioDoc("""
Generate abd send put model with write/create/update properties.
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
Generate abd send put model with write/update properties.
Expected input body:
```json
{
  updateProp: [1, 2],
}
```
""")
@patch
op patchModel(@body input: VisibilityModel): void;

@scenario
@scenarioDoc("""
Generate abd send put model with write/create properties.
Expected input body:
```json
{
  createProp: ["foo", "bar"],
}
```
""")
@post
op postModel(@body input: VisibilityModel): void;

@scenario
@scenarioDoc("""
Generate abd send put model with write/create properties.
Expected input body:
```json
{
  deleteProp: true,
}
```
""")
@delete
op deleteModel(@body input: VisibilityModel): void;

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
  requiredIntList: [1, 2, 3],
  optionalIntList: null,
  requiredModelList: [{name: "foo"}, {name: "bar"}],
  requiredStringRecord: { k1: "value1", k2: "value2" },
  optionalStringRecord: { k1: "value1", k2: "value2" },
  requiredModelRecord: { k1: { name: "foo" }, k2: { name: "bar" } },
}
```
""")
@put
op putReadOnlyModel(@body input: ReadOnlyModel): ReadOnlyModel;
