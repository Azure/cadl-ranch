import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

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

@doc("Base model")
model BaseModel {}

@doc("Derived model")
model DerivedModel extends BaseModel {
  @doc("Required collection")
  requiredList: CollectionItem[];
}

@doc("Collection item model")
model CollectionItem {
  @doc("Required model record")
  requiredModelRecord: Record<RecordItem>;
}

@doc("Record item model")
model RecordItem extends DerivedModel {}

@doc("Fixed string enum")
enum FixedStringEnum {
  One: "1",
  Two: "2",
  Four: "4",
}

@doc("Extensible enum")
union ExtensibleEnum {
  string,
  One: "1",
  Two: "2",
  Four: "4",
}

@doc("Model used only as input")
model InputModel {
  @doc("Required string")
  requiredString: string;

  @doc("Required int")
  requiredInt: int32;

  @doc("Required nullable int")
  requiredNullableInt: int32 | null;

  @doc("Required nullable string")
  requiredNullableString: string | null;

  @doc("Optional nullable int")
  nonRequiredNullableInt?: int32 | null;

  @doc("Optional nullable string")
  nonRequiredNullableString?: string | null;

  @doc("Required model")
  requiredModel: BaseModel;

  @doc("Required model")
  requiredModel2: BaseModel;

  @doc("Required primitive value type collection")
  requiredIntList: int32[];

  @doc("Required primitive reference type collection")
  requiredStringList: string[];

  @doc("Required model collection")
  requiredModelList: CollectionItem[];

  @doc("Required model record")
  requiredModelRecord: Record<RecordItem>;

  @doc("Required collection of which the element is a nullable float")
  requiredCollectionWithNullableFloatElement: (null | float32)[];

  @doc("Required collection of which the element is a nullable boolean")
  requiredCollectionWithNullableBooleanElement: (boolean | null)[];

  @doc("Required model nullable collection")
  requiredNullableModelList: CollectionItem[] | null;

  @doc("Required string nullable collection")
  requiredNullableStringList: string[] | null;

  @doc("Required int nullable collection")
  requiredNullableIntList: int32[] | null;

  @doc("Optional model collection")
  nonRequiredModelList?: CollectionItem[];

  @doc("Optional string collection")
  nonRequiredStringList?: string[];

  @doc("Optional int collection")
  nonRequiredIntList?: int32[];

  @doc("Optional model nullable collection")
  nonRequiredNullableModelList?: CollectionItem[] | null;

  @doc("Optional string nullable collection")
  nonRequiredNullableStringList?: string[] | null;

  @doc("Optional int nullable collection")
  nonRequiredNullableIntList?: int32[] | null;
}

@doc("Output model with readonly properties.")
model RoundTripReadOnlyModel {
  @doc("Required string, illustrating a readonly reference type property.")
  @visibility("read")
  requiredReadonlyString: string;

  @doc("Required int, illustrating a readonly value type property.")
  @visibility("read")
  requiredReadonlyInt: int32;

  @doc("Optional string, illustrating a readonly reference type property.")
  @visibility("read")
  optionalReadonlyString?: string;

  @doc("Optional int, illustrating a readonly value type property.")
  @visibility("read")
  optionalReadonlyInt?: int32;

  @doc("Required readonly model.")
  @visibility("read")
  requiredReadonlyModel: DerivedModel;

  @doc("Optional readonly model.")
  @visibility("read")
  optionalReadonlyModel?: DerivedModel;

  @doc("Required readonly fixed string enum")
  @visibility("read")
  requiredReadonlyFixedStringEnum: FixedStringEnum;

  @doc("Required readonly extensible enum")
  @visibility("read")
  requiredReadonlyExtensibleEnum: ExtensibleEnum;

  @doc("Optional readonly fixed string enum")
  @visibility("read")
  optionalReadonlyFixedStringEnum: FixedStringEnum;

  @doc("Optional readonly extensible enum")
  @visibility("read")
  optionalReadonlyExtensibleEnum: ExtensibleEnum;

  @doc("Required readonly string collection.")
  @visibility("read")
  requiredReadonlyStringList: string[];

  @doc("Required readonly int collection.")
  @visibility("read")
  requiredReadonlyIntList: int32[];

  @doc("Required model collection")
  @visibility("read")
  requiredReadOnlyModelList: CollectionItem[];

  @doc("Required int record")
  @visibility("read")
  requiredReadOnlyIntRecord: Record<int32>;

  @doc("Required string record")
  @visibility("read")
  requiredStringRecord: Record<string>;

  @doc("Required model record")
  @visibility("read")
  requiredReadOnlyModelRecord: Record<RecordItem>;

  @doc("Optional readonly string collection.")
  @visibility("read")
  optionalReadonlyStringList?: string[];

  @doc("Optional readonly int collection.")
  @visibility("read")
  optionalReadonlyIntList?: int32[];

  @doc("Optional model collection")
  @visibility("read")
  optionalReadOnlyModelList?: CollectionItem[];

  @doc("Optional int record")
  optionalReadOnlyIntRecord: Record<int32>;

  @doc("Optional string record")
  optionalReadOnlyStringRecord: Record<string>;

  @doc("Optional model record")
  @visibility("read")
  optionalModelRecord?: Record<RecordItem>;

  @doc("Required collection of which the element is a nullable int")
  requiredCollectionWithNullableIntElement: (null | int32)[];

  @doc("Optional collection of which the element is a nullable boolean")
  optionalCollectionWithNullableBooleanElement?: (boolean | null)[];
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

@route("/inputToRoundTripReadOnly")
@doc("Input to RoundTripReadOnly")
@scenario
@scenarioDoc("""
Generate abd send input model and handle readonly properties.
Expected input body:
```json
{
  requiredString: "test",
  requiredInt: 2,
  requiredNullableString: null,
  requiredNullableInt: null,
  requiredModel: { requiredList: [null] },
  requiredModel2: { requiredList: [null] },
  requiredIntList: [1, 2],
  requiredStringList: ["a", null],
  requiredModelList: [{ requiredModelRecord: {} }],
  requiredModelRecord: {},
  requiredCollectionWithNullableFloatElement: [],
  requiredCollectionWithNullableBooleanElement: [],
  requiredNullableModelList: null,
  requiredNullableStringList: null,
  requiredNullableIntList: null,
}
```
Expected response body:
```json
{
  requiredReadonlyString: "test",
  requiredReadonlyInt: 12,
  optionalReadonlyInt: 11,
  requiredReadonlyModel: { requiredList: [] },
  requiredReadonlyFixedStringEnum: "1",
  requiredReadonlyExtensibleEnum: "3",
  optionalReadonlyFixedStringEnum: "2",
  optionalReadonlyExtensibleEnum: "1",
  requiredReadonlyStringList: ["abc"],
  requiredReadonlyIntList: [],
  requiredReadOnlyModelList: [],
  requiredReadOnlyIntRecord: { test: 1 },
  requiredStringRecord: { test: "1" },
  requiredReadOnlyModelRecord: {},
  optionalReadonlyStringList: [null],
  optionalReadOnlyModelList: [],
  optionalReadOnlyStringRecord: {},
  optionalModelRecord: { test: { requiredList: [] } },
  requiredCollectionWithNullableIntElement: [null, 123],
  optionalCollectionWithNullableBooleanElement: [
    null,
    false,
    true,
    ],
}
```
""")
@get
@convenientAPI(true)
op inputToRoundTripReadOnly(@body input: InputModel): RoundTripReadOnlyModel;
