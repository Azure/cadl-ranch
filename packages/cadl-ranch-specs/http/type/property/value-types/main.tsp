import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-client-generator-core";
import "@azure-tools/typespec-azure-core";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@doc("Illustrates various property types for models")
@scenarioService("/type/property/value-types")
namespace Type.Property.ValueTypes;

// TEMPLATES
@doc("Template type for testing models with specific properties. Pass in the type of the property you are looking for")
model ModelTemplate<TProperty> {
  @doc("Property")
  property: TProperty;
}

@doc("Template to have models operations")
interface ModelOperations<TModel, TDoc extends string> {
  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc(
    """
  Expected response body:
  ```json
  {"property": {doc}}
  ```
  """,
    {
      doc: TDoc,
    }
  )
  @get
  @doc("Get call")
  get(): TModel;

  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "For testing"
  @scenario
  @scenarioDoc(
    """
  Expected input body:
  ```json
  {"property": {doc}}
  ```
  """,
    {
      doc: TDoc,
    }
  )
  @put
  @doc("Put operation")
  put(@body @doc("body") body: TModel): void;
}

// Test a model with a boolean property
@doc("Model with a boolean property")
model BooleanProperty is ModelTemplate<boolean>;
@route("/boolean")
@operationGroup
interface Boolean extends ModelOperations<BooleanProperty, "true"> {}

// Test a model with a string property
@doc("Model with a string property")
model StringProperty is ModelTemplate<string>;
@route("/string")
@operationGroup
interface String extends ModelOperations<StringProperty, "hello"> {}

// Test a model with a bytes property
@doc("Model with a bytes property")
model BytesProperty is ModelTemplate<bytes>;
@route("/bytes")
@operationGroup
interface Bytes extends ModelOperations<BytesProperty, "aGVsbG8sIHdvcmxkIQ=="> {}

// Test a model with an int property
@doc("Model with a int property")
model IntProperty is ModelTemplate<int32>;
@route("/int")
@operationGroup
interface Int extends ModelOperations<IntProperty, "42"> {}

// Test a model with a float property
@doc("Model with a float property")
model FloatProperty is ModelTemplate<float32>;
@route("/float")
@operationGroup
interface Float extends ModelOperations<FloatProperty, "42.42"> {}

// Test a model with a datetime property
@doc("Model with a datetime property")
model DatetimeProperty is ModelTemplate<utcDateTime>;
@route("/datetime")
@operationGroup
interface Datetime extends ModelOperations<DatetimeProperty, "2022-08-26T18:38:00Z"> {}

// Test a model with a duration property
@doc("Model with a duration property")
model DurationProperty is ModelTemplate<duration>;
@route("/duration")
@operationGroup
interface Duration extends ModelOperations<DurationProperty, "P123DT22H14M12.011S"> {}

// Test a model with an enum property
@doc("Enum that will be used as a property for model EnumProperty. Non-extensible.")
enum InnerEnum {
  @doc("First value.")
  ValueOne,

  @doc("Second value.")
  ValueTwo,
}

#suppress "@azure-tools/typespec-azure-core/use-extensible-enum" "For testing"
@doc("Enum that will be used as a property for model EnumProperty. Non-extensible.")
@Azure.Core.fixed
enum FixedInnerEnum {
  @doc("First value.")
  ValueOne,

  @doc("Second value.")
  ValueTwo,
}

@doc("Model with enum properties")
model EnumProperty is ModelTemplate<FixedInnerEnum>;
@route("/enum")
@operationGroup
interface Enum extends ModelOperations<EnumProperty, "ValueOne"> {}

@doc("Model with extensible enum properties")
model ExtensibleEnumProperty is ModelTemplate<InnerEnum>;
@route("/extensible-enum")
@operationGroup
interface ExtensibleEnum extends ModelOperations<ExtensibleEnumProperty, "UnknownValue"> {}

// Test a model with a model property
@doc("Inner model. Will be a property type for ModelWithModelProperties")
model InnerModel {
  @doc("Required string property")
  property: string;
}
@doc("Model with model properties")
model ModelProperty is ModelTemplate<InnerModel>;
@route("/model")
@operationGroup
interface Model extends ModelOperations<ModelProperty, "{'property': 'hello'}"> {}

// Test a model with a string collection property
@doc("Model with collection string properties")
model CollectionsStringProperty is ModelTemplate<string[]>;
@route("/collections/string")
@operationGroup
interface CollectionsString extends ModelOperations<CollectionsStringProperty, "['hello', 'world']"> {}

// Test a model with an int collection property
@doc("Model with collection int properties")
model CollectionsIntProperty is ModelTemplate<int32[]>;
@route("/collections/int")
@operationGroup
interface CollectionsInt extends ModelOperations<CollectionsIntProperty, "[1, 2]"> {}

// Test a model with a model collection property
@doc("Model with collection model properties")
model CollectionsModelProperty is ModelTemplate<InnerModel[]>;
@route("/collections/model")
@operationGroup
interface CollectionsModel
  extends ModelOperations<CollectionsModelProperty, "[{'property': 'hello'}, {'property': 'world'}]"> {}

// Test a model with a string dictionary property
@doc("Model with dictionary string properties")
model DictionaryStringProperty is ModelTemplate<Record<string>>;
@route("/dictionary/string")
@operationGroup
interface DictionaryString extends ModelOperations<DictionaryStringProperty, "{'k1': 'hello', 'k2': 'world'}"> {}

// Test a model with a never property
@doc("Model with a property never. (This property should not be included).")
model NeverProperty is ModelTemplate<never>;
@route("/never")
@operationGroup
interface Never extends ModelOperations<NeverProperty, "<don't include this property>"> {}

// Test a model with unknown and string
@doc("Model with a property unknown, and the data is a string.")
model UnknownStringProperty is ModelTemplate<unknown>;
@route("/unknown/string")
@operationGroup
interface UnknownString extends ModelOperations<UnknownStringProperty, "\"hello\""> {}

// Test a model with unknown and int
@doc("Model with a property unknown, and the data is a int32.")
model UnknownIntProperty is ModelTemplate<unknown>;
@route("/unknown/int")
@operationGroup
interface UnknownInt extends ModelOperations<UnknownIntProperty, "42"> {}

// Test a model with unknown and a dictionnary
@doc("Model with a property unknown, and the data is a dictionnary.")
model UnknownDictProperty is ModelTemplate<unknown>;
@route("/unknown/dict")
@operationGroup
interface UnknownDict extends ModelOperations<UnknownDictProperty, "{'k1': 'hello', 'k2': 42}"> {}
