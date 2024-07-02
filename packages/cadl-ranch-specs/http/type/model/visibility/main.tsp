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
  @doc("Required property")
  resourceName: string;
}

@doc("Collection item model")
model CollectionItem {
  @doc("Required resource id")
  requiredId: int32;
}

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

@doc("Output model with readonly properties.")
model RoundTripReadOnlyModel {
  @doc("Required string, illustrating a reference type property.")
  requiredString: string;

  @doc("Required int, illustrating a readonly value type property.")
  @visibility("read")
  requiredReadonlyInt: int32;

  @doc("Optional string, illustrating a readonly reference type property.")
  @visibility("read")
  optionalReadonlyString?: string;

  @doc("Optional int, illustrating a readonly value type property.")
  @visibility("read")
  optionalReadonlyInt?: int32;

  @doc("Required readonly bytes")
  @visibility("read")
  requiredReadonlyBytes: bytes;

  @doc("Optional readonly bytes")
  @visibility("read")
  optionalReadonlyBytes?: bytes;

  @doc("Required readonly uint8[]")
  @visibility("read")
  requiredReadonlyUint8Array: uint8[];

  @doc("Optional readonly uint8[]")
  @visibility("read")
  optionalReadonlyUint8Array?: uint8[];

  @doc("Required readonly unknown array")
  @visibility("read")
  requiredReadonlyUnknown: unknown[];

  @doc("Optional readonly unknown array")
  @visibility("read")
  optionalReadonlyUnknown?: unknown[];

  @doc("Required readonly int8[]")
  @visibility("read")
  requiredReadonlyInt8Array: int8[];

  @doc("Optional readonly int8[]")
  @visibility("read")
  optionalReadonlyInt8Array?: int8[];

  @doc("Optional readonly nullable int")
  @visibility("read")
  nonRequiredReadOnlyNullableInt?: int32 | null;

  @doc("Optional readonly nullable string")
  @visibility("read")
  nonRequiredReadOnlyNullableString?: string | null;

  @doc("ReadOnly plainDate")
  @visibility("read")
  requiredReadOnlyPlainDate: plainDate;

  @doc("ReadOnly plainTime")
  @visibility("read")
  requiredReadOnlyPlainTime: plainTime;

  @doc("Optional plainDate")
  @visibility("read")
  optionalReadOnlyPlainDate?: plainDate;

  @doc("Optional plainTime")
  @visibility("read")
  optionalReadOnlyPlainTime?: plainTime;

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
  requiredReadonlyStringRecord: Record<string>;

  @doc("Required model record")
  @visibility("read")
  requiredReadOnlyModelRecord: Record<DerivedModel>;

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
  @visibility("read")
  optionalReadOnlyIntRecord: Record<int32>;

  @doc("Optional string record")
  @visibility("read")
  optionalReadOnlyStringRecord: Record<string>;

  @doc("Optional model record")
  @visibility("read")
  optionalReadOnlyModelRecord?: Record<DerivedModel>;

  @doc("Required ReadOnly collection of which the element is a nullable int")
  @visibility("read")
  requiredReadOnlyCollectionWithNullableIntElement: (int32 | null)[];

  @doc("Optional ReadOnly collection of which the element is a nullable boolean")
  @visibility("read")
  optionalReadOnlyCollectionWithNullableBooleanElement?: (boolean | null)[];

  @doc("Required readonly nullable int list")
  @visibility("read")
  requiredReadOnlyNullableIntList: int32[] | null;

  @doc("Required readonly nullable string list")
  @visibility("read")
  requiredReadOnlyNullableStringList: string[] | null;

  @doc("Optional readonly nullable model list")
  @visibility("read")
  nonRequiredReadOnlyNullableIntList?: int32[] | null;

  @doc("Optional readonly nullable string list")
  @visibility("read")
  nonRequiredReadOnlyNullableStringList?: string[] | null;
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
@doc("ReadOnly Property RoundTrip")
@scenario
@scenarioDoc("""
Generate abd send input model and handle readonly properties.
Expected input body:
```json
{
  requiredString: "writableString",
}
```

Expected response body:
```json
{
  requiredString: "writableString",
  requiredReadOnlyInt: 123,
  optionalReadOnlyString: "optionalString",
  optionalReadOnlyInt: 456,
  requiredReadOnlyBytes: new Uint8Array([1, 2, 3]),
  optionalReadOnlyBytes: new Uint8Array([4, 5, 6]),
  requiredReadOnlyUint8Array: [1, 2, 3],
  optionalReadOnlyUint8Array: [4, 5, 6],
  requiredReadOnlyUnknown: [1, "string", true],
  requiredReadOnlyInt8Array: [-1, -2, -3],
  optionalReadOnlyInt8Array: [-4, -5, -6],
  nonRequiredReadOnlyNullableInt: 1,
  nonRequiredReadOnlyNullableString: null,
  requiredReadOnlyPlainDate: "2023-01-01",
  requiredReadOnlyPlainTime: "12:00:00",
  optionalReadOnlyPlainDate: "2023-01-02",
  optionalReadOnlyPlainTime: "13:00:00",
  requiredReadOnlyModel: { resourceName: "testResource" },
  requiredReadOnlyFixedStringEnum: "1",
  requiredReadOnlyExtensibleEnum: "2",
  optionalReadOnlyFixedStringEnum: "2",
  optionalReadOnlyExtensibleEnum: "4",
  requiredReadOnlyStringList: ["string1", "string2"],
  requiredReadOnlyIntList: [1, 2],
  requiredReadOnlyModelList: [{ requireId: "14159" }],
  requiredReadOnlyIntRecord: { key1: 1, key2: 2 },
  requiredReadOnlyStringRecord: { key1: "value1", key2: "value2" },
  requiredReadOnlyModelRecord: {
    Key1: { resourceName: "recordtest" },
    Key2: { resourceName: "recordtest2" },
  },
  optionalReadOnlyStringList: ["optionalString1", "optionalString2"],
  optionalReadOnlyIntList: [3, 4],
  optionalReadOnlyIntRecord: { key3: 3, key4: 4 },
  optionalReadOnlyStringRecord: { key3: "value3", key4: "value4" },
  requiredReadOnlyCollectionWithNullableIntElement: [null, 1, null],
  optionalReadOnlyCollectionWithNullableBooleanElement: [null, true, false],
  requiredReadOnlyNullableIntList: null,
  requiredReadOnlyNullableStringList: null,
  nonRequiredReadOnlyNullableIntList: null,
  nonRequiredReadOnlyNullableStringList: null,
}
```
""")
@put
op ReadOnlyRoundTrip(@body input: RoundTripReadOnlyModel): RoundTripReadOnlyModel;
