import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Illustrates models with optional properties.")
@scenarioService("/type/property/optional")
namespace Type.Property.Optional;

@doc("Template type for testing models with optional property. Pass in the type of the property you are looking for")
model ModelTemplate<TProperty> {
  @doc("Property")
  property?: TProperty;
}

@doc("Operations associated with getting and putting models with optional properties.")
interface OperationsTemplate<TModel, TDoc extends string, TDefaultDoc extends string = "{}"> {
  @doc("Get models that will return all properties in the model")
  @scenario
  @scenarioDoc(
    """
  Expected response body:
  ```json
  {"property": {allDoc}}
  ```
  """,
    {
      allDoc: TDoc,
    }
  )
  @route("/all")
  @get
  getAll(): TModel;

  @doc("Get models that will return the default object")
  @scenario
  @scenarioDoc(
    """
  Expected response body:
  ```json
  {defaultDoc}
  ```
  """,
    {
      defaultDoc: TDefaultDoc,
    }
  )
  @route("/default")
  @get
  getDefault(): TModel;

  @doc("Put a body with all properties present.")
  @scenario
  @scenarioDoc(
    """
  Expected request body:
  ```json
  {"property": {allDoc}}
  ```
  """,
    {
      allDoc: TDoc,
    }
  )
  @route("/all")
  @put
  putAll(@body body: TModel): void;

  @doc("Put a body with default properties.")
  @scenario
  @scenarioDoc(
    """
  Expected request body:
  ```json
  {defaultDoc}
  ```
  """,
    {
      defaultDoc: TDefaultDoc,
    }
  )
  @route("/default")
  @put
  putDefault(@body body: TModel): void;
}

// Model with optional string property
model StringProperty is ModelTemplate<string>;
@route("/string")
@operationGroup
interface String extends OperationsTemplate<StringProperty, "\"hello\""> {}

// Model with optional bytes property
model BytesProperty is ModelTemplate<bytes>;
@route("/bytes")
@operationGroup
interface Bytes extends OperationsTemplate<BytesProperty, "\"aGVsbG8sIHdvcmxkIQ==\""> {}

// Model with optional datetime property
@doc("Model with a datetime property")
model DatetimeProperty is ModelTemplate<utcDateTime>;
@route("/datetime")
@operationGroup
interface Datetime extends OperationsTemplate<DatetimeProperty, "\"2022-08-26T18:38:00Z\""> {}

// Model with optional duration property
@doc("Model with a duration property")
model DurationProperty is ModelTemplate<duration>;
@route("/duration")
@operationGroup
interface Duration extends OperationsTemplate<DurationProperty, "\"P123DT22H14M12.011S\""> {}

// Model with optional collection bytes property
@doc("Model with collection bytes properties")
model CollectionsByteProperty is ModelTemplate<bytes[]>;
@route("/collections/bytes")
@operationGroup
interface CollectionsByte
  extends OperationsTemplate<CollectionsByteProperty, "[\"aGVsbG8sIHdvcmxkIQ==\", \"aGVsbG8sIHdvcmxkIQ==\"]"> {}

// Model with optional collection models property
@doc("Model with collection models properties")
model CollectionsModelProperty is ModelTemplate<StringProperty[]>;
@route("/collections/model")
@operationGroup
interface CollectionsModel
  extends OperationsTemplate<CollectionsModelProperty, "[{'property': 'hello'}, {'property': 'world'}]"> {}

// Model with optional string literal property
@doc("Model with string literal property")
model StringLiteralProperty is ModelTemplate<"hello">;
@route("/string/literal")
@operationGroup
interface StringLiteral extends OperationsTemplate<StringLiteralProperty, "\"hello\""> {}

// Model with optional int literal property
@doc("Model with int literal property")
model IntLiteralProperty is ModelTemplate<1>;
@route("/int/literal")
@operationGroup
interface IntLiteral extends OperationsTemplate<IntLiteralProperty, "1"> {}

// Model with optional float literal property
@doc("Model with float literal property")
model FloatLiteralProperty is ModelTemplate<1.25>;
@route("/float/literal")
@operationGroup
interface FloatLiteral extends OperationsTemplate<FloatLiteralProperty, "1.25"> {}

// Model with optional boolean literal property
@doc("Model with boolean literal property")
model BooleanLiteralProperty is ModelTemplate<true>;
@route("/boolean/literal")
@operationGroup
interface BooleanLiteral extends OperationsTemplate<BooleanLiteralProperty, "true"> {}

// Model with union of string literal property
@doc("Model with union of string literal property")
model UnionStringLiteralProperty is ModelTemplate<"hello" | "world">;
@route("/union/string/literal")
@operationGroup
interface UnionStringLiteral extends OperationsTemplate<UnionStringLiteralProperty, "\"world\""> {}

// Model with union of int literal property
@doc("Model with union of int literal property")
model UnionIntLiteralProperty is ModelTemplate<1 | 2>;
@route("/union/int/literal")
@operationGroup
interface UnionIntLiteral extends OperationsTemplate<UnionIntLiteralProperty, "2"> {}

// Model with union of float literal property
@doc("Model with union of float literal property")
model UnionFloatLiteralProperty is ModelTemplate<1.25 | 2.375>;
@route("/union/float/literal")
@operationGroup
interface UnionFloatLiteral extends OperationsTemplate<UnionFloatLiteralProperty, "2.375"> {}

@doc("Model with required and optional properties")
model RequiredAndOptionalProperty {
  @doc("optional string property")
  optionalProperty?: string;

  @doc("required int property")
  requiredProperty: int32;
}
@doc("Test optional and required properties")
@route("/requiredAndOptional")
@operationGroup
interface RequiredAndOptional {
  @doc("Get models that will return all properties in the model")
  @scenario
  @scenarioDoc("""
  Expected response body:
  ```json
  {"optionalProperty": "hello", "requiredProperty": 42}
  ```
  """)
  @route("/all")
  @get
  getAll(): RequiredAndOptionalProperty;

  @doc("Get models that will return only the required properties")
  @scenario
  @scenarioDoc("""
  Expected response body:
  ```json
  {"requiredProperty": 42}
  ```
  """)
  @route("/requiredOnly")
  @get
  getRequiredOnly(): RequiredAndOptionalProperty;

  @doc("Put a body with all properties present.")
  @scenario
  @scenarioDoc("""
  Expected request body:
  ```json
  {"optionalProperty": "hello", "requiredProperty": 42}
  ```
  """)
  @route("/all")
  @put
  putAll(@body body: RequiredAndOptionalProperty): void;

  @doc("Put a body with only required properties.")
  @scenario
  @scenarioDoc("""
  Expected request body:
  ```json
  {"requiredProperty": 42}
  ```
  """)
  @route("/requiredOnly")
  @put
  putRequiredOnly(@body body: RequiredAndOptionalProperty): void;
}

//model with required and optional properties
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

@doc("Derived model with properties")
model DerivedModelWithProperties {
  @doc("Required collection")
  requiredList: string[];
}

@doc("Fixed string enum")
enum FixedStringEnum {
  One: "1",
  Two: "2",
  Four: "4",
}

@doc("Fixed int enum")
enum FixedIntEnum {
  One: 1,
  Two: 2,
  Four: 4,
}

@doc("Extensible enum")
union ExtensibleEnum {
  string,
  One: "1",
  Two: "2",
  Four: "4",
}

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

@doc("Model used both as input and output")
model RoundTripModel {
  @doc("Required string, illustrating a reference type property.")
  requiredString: string;

  @doc("Required int, illustrating a value type property.")
  requiredInt: int32;

  @doc("Optional string")
  nonRequiredString?: string;

  @doc("Optional int")
  nonRequiredInt?: int32;

  @doc("Required nullable int")
  requiredNullableInt: int32 | null;

  @doc("Required nullable string")
  requiredNullableString: string | null;

  @doc("Optional nullable int")
  nonRequiredNullableInt?: int32 | null;

  @doc("Optional nullable string")
  nonRequiredNullableString?: string | null;

  @doc("Required readonly int")
  @visibility("read")
  requiredReadonlyInt: int32;

  @doc("Optional readonly int")
  @visibility("read")
  nonRequiredReadonlyInt?: int32;

  @doc("Required fixed string enum")
  requiredFixedStringEnum: FixedStringEnum;

  @doc("Required fixed int enum")
  requiredFixedIntEnum: FixedIntEnum;

  @doc("Required extensible enum")
  requiredExtensibleEnum: ExtensibleEnum;

  @doc("Required collection")
  requiredList: CollectionItem[];

  @doc("Required int record")
  requiredIntRecord: Record<int32>;

  @doc("Required string record")
  requiredStringRecord: Record<string>;

  @doc("Required Model Record")
  requiredModelRecord: Record<RecordItem>;

  @doc("Required bytes")
  requiredBytes: bytes;

  @doc("Optional bytes")
  optionalBytes?: bytes;

  @doc("Required uint8[]")
  requiredUint8Array: uint8[];

  @doc("Optional uint8[]")
  optionalUint8Array?: uint8[];

  @doc("Required unknown")
  requiredUnknown: unknown;

  @doc("Optional unknown")
  optionalUnknown?: unknown;

  @doc("Required int8[]")
  requiredInt8Array: int8[];

  @doc("Optional int8[]")
  optionalInt8Array?: int8[];

  @doc("Required nullable int list")
  requiredNullableIntList: int32[] | null;

  @doc("Required nullable string list")
  requiredNullableStringList: string[] | null;

  @doc("Optional nullable model list")
  nonRequiredNullableIntList?: int32[] | null;

  @doc("Optional nullable string list")
  nonRequiredNullableStringList?: string[] | null;
}

@doc("RoundTrip model with optional properties.")
model RoundTripOptionalModel {
  @doc("Optional string, illustrating an optional reference type property.")
  optionalString?: string;

  @doc("Optional int, illustrating an optional value type property.")
  optionalInt?: int32;

  @doc("Optional string collection.")
  optionalStringList?: string[];

  @doc("Optional int collection.")
  optionalIntList?: int32[];

  @doc("Optional model collection")
  optionalModelList?: CollectionItem[];

  @doc("Optional model.")
  optionalModel?: DerivedModel;

  @doc("Optional model with properties on base")
  optionalModelWithPropertiesOnBase?: DerivedModelWithProperties;

  @doc("Optional fixed string enum")
  optionalFixedStringEnum?: FixedStringEnum;

  @doc("Optional extensible enum")
  optionalExtensibleEnum?: ExtensibleEnum;

  @doc("Optional int record")
  optionalIntRecord?: Record<int32>;

  @doc("Optional string record")
  optionalStringRecord?: Record<string>;

  @doc("Optional model record")
  optionalModelRecord?: Record<RecordItem>;

  @doc("Optional plainDate")
  optionalPlainDate?: plainDate;

  @doc("Optional plainTime")
  optionalPlainTime?: plainTime;

  @doc("Optional collection of which the element is a nullable int")
  optionalCollectionWithNullableIntElement?: (int32 | null)[];
}

@scenario
@scenarioDoc("""
Expected response body:
```json
{ requiredString: "test",
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

Expected request body:
```json
  {requiredString: "test",
   requiredInt: 2,
   requiredNullableString: null,
   requiredNullableInt: null,
   requiredReadonlyInt: 3,
   requiredFixedStringEnum: "1",
   requiredFixedIntEnum: 2,
   requiredExtensibleEnum: "1",
   requiredList: [{ requiredModelRecord: {} }],
   requiredIntRecord: { "1": 1 },
   requiredStringRecord: { "1": "1" },
   requiredModelRecord: {},
   requiredBytes: "aGVsbG8=",
   requiredUint8Array: [1, 2],
   requiredUnknown: "unknown",
   requiredInt8Array: [1, 2],
   requiredNullableIntList: [1, 2, null],
   requiredNullableStringList: ["a", "b", null],
   nonRequiredNullableIntList: [1, 2, null],
   nonRequiredNullableStringList: ["a", "b", null],
    }
   }
```
""")
@route("/inputToRoundTrip")
@doc("Input to RoundTrip")
@get
@convenientAPI(true)
op inputToRoundTrip(@body input: InputModel): RoundTripModel;

@scenario
@scenarioDoc("""
Expected response body:
```json
{ optionalPlainDate: "2023-02-14",
  optionalPlainTime: "1.02:59:59",
  optionalCollectionWithNullableIntElement: [123, null],
  }
```

Expected request body:
```json
  {
  optionalCollectionWithNullableIntElement: [null, 123],
  }
```

""")
@route("/inputToRoundTripOptional")
@doc("Input to RoundTripOptional")
@get
@convenientAPI(true)
op inputToRoundTripOptional(@body input: RoundTripOptionalModel): RoundTripOptionalModel;
