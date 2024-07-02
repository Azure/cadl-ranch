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

@doc("RoundTrip model with readonly properties.")
model RoundTripReadOnlyModel {
  @doc("Required string, illustrating a readonly reference type property.")
  @visibility("read")
  requiredReadOnlyString: string;

  @doc("Required int, illustrating a readonly value type property.")
  @visibility("read")
  requiredReadOnlyInt: int32;

  @doc("Optional string, illustrating a readonly reference type property.")
  @visibility("read")
  optionalReadOnlyString?: string;

  @doc("Optional int, illustrating a readonly value type property.")
  @visibility("read")
  optionalReadOnlyInt?: int32;

  @doc("Required readonly uint8[]")
  @visibility("read")
  requiredReadOnlyUint8Array: uint8[];

  @doc("Optional readonly uint8[]")
  @visibility("read")
  optionalReadOnlyUint8Array?: uint8[];

  @doc("Required readonly unknown array")
  @visibility("read")
  requiredReadOnlyUnknown: unknown[];

  @doc("Optional readonly unknown array")
  @visibility("read")
  optionalReadOnlyUnknown?: unknown[];

  @doc("Required readonly int8[]")
  @visibility("read")
  requiredReadOnlyInt8Array: int8[];

  @doc("Optional readonly int8[]")
  @visibility("read")
  optionalReadOnlyInt8Array?: int8[];

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
  requiredReadOnlyModel: DerivedModel;

  @doc("Optional readonly model.")
  @visibility("read")
  optionalReadOnlyModel?: DerivedModel;

  @doc("Required readonly fixed string enum")
  @visibility("read")
  requiredReadOnlyFixedStringEnum: FixedStringEnum;

  @doc("Required readonly extensible enum")
  @visibility("read")
  requiredReadOnlyExtensibleEnum: ExtensibleEnum;

  @doc("Optional readonly fixed string enum")
  @visibility("read")
  optionalReadOnlyFixedStringEnum: FixedStringEnum;

  @doc("Optional readonly extensible enum")
  @visibility("read")
  optionalReadOnlyExtensibleEnum: ExtensibleEnum;

  @doc("Required readonly string collection.")
  @visibility("read")
  requiredReadOnlyStringList: string[];

  @doc("Required readonly int collection.")
  @visibility("read")
  requiredReadOnlyIntList: int32[];

  @doc("Required model collection")
  @visibility("read")
  requiredReadOnlyModelList: DerivedModel[];

  @doc("Required int record")
  @visibility("read")
  requiredReadOnlyIntRecord: Record<int32>;

  @doc("Required string record")
  @visibility("read")
  requiredReadOnlyStringRecord: Record<string>;

  @doc("Required model record")
  @visibility("read")
  requiredReadOnlyModelRecord: Record<DerivedModel>;

  @doc("Optional readonly string collection.")
  @visibility("read")
  optionalReadOnlyStringList?: string[];

  @doc("Optional readonly int collection.")
  @visibility("read")
  optionalReadOnlyIntList?: int32[];

  @doc("Optional model collection")
  @visibility("read")
  optionalReadOnlyModelList?: DerivedModel[];

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
}
```

Expected response body:
```json
{
  requiredReadOnlyString: "requiredString",
  requiredReadOnlyInt: 123,
  optionalReadOnlyString: "optionalString",
  requiredReadOnlyUint8Array: [1, 2, 3],
  optionalReadOnlyUint8Array: [4, 5, 6],
  requiredReadOnlyUnknown: [1, "string", true],
  requiredReadOnlyInt8Array: [-1, -2, -3],
  nonRequiredReadOnlyNullableInt: 1,
  nonRequiredReadOnlyNullableString: null,
  requiredReadOnlyPlainDate: "2023-01-01",
  requiredReadOnlyPlainTime: "12:00:00",
  optionalReadOnlyPlainDate: "2023-01-02",
  requiredReadOnlyModel: { resourceName: "testResource" },
  requiredReadOnlyFixedStringEnum: "1",
  requiredReadOnlyExtensibleEnum: "2",
  optionalReadOnlyFixedStringEnum: "2",
  optionalReadOnlyExtensibleEnum: "4",
  requiredReadOnlyStringList: ["string1", "string2"],
  requiredReadOnlyIntList: [1, 2],
  requiredReadOnlyModelList: [{ resourceName: "list1" }, { resourceName: "list2" }],
  requiredReadOnlyIntRecord: { key1: 1, key2: 2 },
  requiredReadOnlyStringRecord: { key1: "value1", key2: "value2" },
  requiredReadOnlyModelRecord: {
    Key1: { resourceName: "recordtest" }, Key2: { resourceName: "recordtest2" },
  },
  requiredReadOnlyCollectionWithNullableIntElement: [null, 1, null],
  optionalReadOnlyCollectionWithNullableBooleanElement: [null, true, false],
  requiredReadOnlyNullableIntList: null,
  requiredReadOnlyNullableStringList: null,
  nonRequiredReadOnlyNullableIntList: null,
}
```
""")
@put
op readOnlyRoundTrip(@body input: RoundTripReadOnlyModel): RoundTripReadOnlyModel;
