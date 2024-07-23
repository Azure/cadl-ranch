import { passOnSuccess, mockapi, xml } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const simpleModel = `
<SimpleModel>
  <name>foo</name>
  <age>123</age>
</SimpleModel>
`;

const modelWithSimpleArrays = `
<ModelWithSimpleArrays>
  <colors>
    <string>red</string>
    <string>green</string>
    <string>blue</string>
  </colors>
  <counts>
    <int32>1</int32>
    <int32>2</int32>
  </counts>
</ModelWithSimpleArrays>
`;

const modelWithArrayOfModel = `
<ModelWithArrayOfModel>
  <items>
    <SimpleModel>
      <name>foo</name>
      <age>123</age>
    </SimpleModel>
    <SimpleModel>
      <name>bar</name>
      <age>456</age>
    </SimpleModel>
  </items>
</ModelWithArrayOfModel>
`;

const modelWithOptionalField = `
<ModelWithOptionalField>
  <item>widget</item>
</ModelWithOptionalField>
`;

const modelWithAttributes = `
<ModelWithAttributes id1="123" id2="foo">
  <Enabled>true</Enabled>
</ModelWithAttributes>
`;

const modelWithUnwrappedArray = `
<ModelWithUnwrappedArray>
  <Colors>red</Colors>
  <Colors>green</Colors>
  <Colors>blue</Colors>
  <Counts>
    <int32>1</int32>
    <int32>2</int32>
  </Counts>
</ModelWithUnwrappedArray>
`;

const modelWithRenamedFields = `
<ModelWithRenamedFieldsSrc>
  <InputData>
    <name>foo</name>
    <age>123</age>
  </InputData>
  <OutputData>
    <name>bar</name>
    <age>456</age>
  </OutputData>
</ModelWithRenamedFieldsSrc>
`;

const modelWithEmptyArray = `
<ModelWithEmptyArray>
  <items />
</ModelWithEmptyArray>
`;

const modelWithText = `
<ModelWithText language="foo">
  This is some text.
</ModelWithText>
`;

const modelWithDictionary = `
<ModelWithDictionary>
  <Metadata>
    <Color>blue</Color>
    <Count>123</Count>
    <Enabled>false</Enabled>
  </Metadata>
</ModelWithDictionary>
`;

Scenarios.Payload_Xml_SimpleModelValue_get = passOnSuccess(
  mockapi.get("/payload/xml/simpleModel", (req) => {
    return {
      status: 200,
      body: xml(simpleModel),
    };
  }),
);

Scenarios.Payload_Xml_SimpleModelValue_put = passOnSuccess(
  mockapi.put("/payload/xml/simpleModel", (req) => {
    req.expect.containsHeader("content-type", "application/xml");
    req.expect.xmlBodyEquals(simpleModel);
    return {
      status: 204,
    };
  }),
);

Scenarios.Payload_Xml_ModelWithSimpleArraysValue_get = passOnSuccess(
  mockapi.get("/payload/xml/modelWithSimpleArrays", (req) => {
    return {
      status: 200,
      body: xml(modelWithSimpleArrays),
    };
  }),
);

Scenarios.Payload_Xml_ModelWithSimpleArraysValue_put = passOnSuccess(
  mockapi.put("/payload/xml/modelWithSimpleArrays", (req) => {
    req.expect.containsHeader("content-type", "application/xml");
    req.expect.xmlBodyEquals(modelWithSimpleArrays);
    return {
      status: 204,
    };
  }),
);

Scenarios.Payload_Xml_ModelWithArrayOfModelValue_get = passOnSuccess(
  mockapi.get("/payload/xml/modelWithArrayOfModel", (req) => {
    return {
      status: 200,
      body: xml(modelWithArrayOfModel),
    };
  }),
);

Scenarios.Payload_Xml_ModelWithArrayOfModelValue_put = passOnSuccess(
  mockapi.put("/payload/xml/modelWithArrayOfModel", (req) => {
    req.expect.containsHeader("content-type", "application/xml");
    req.expect.xmlBodyEquals(modelWithArrayOfModel);
    return {
      status: 204,
    };
  }),
);

Scenarios.Payload_Xml_ModelWithOptionalFieldValue_get = passOnSuccess(
  mockapi.get("/payload/xml/modelWithOptionalField", (req) => {
    return {
      status: 200,
      body: xml(modelWithOptionalField),
    };
  }),
);

Scenarios.Payload_Xml_ModelWithOptionalFieldValue_put = passOnSuccess(
  mockapi.put("/payload/xml/modelWithOptionalField", (req) => {
    req.expect.containsHeader("content-type", "application/xml");
    req.expect.xmlBodyEquals(modelWithOptionalField);
    return {
      status: 204,
    };
  }),
);

Scenarios.Payload_Xml_ModelWithAttributesValue_get = passOnSuccess(
  mockapi.get("/payload/xml/modelWithAttributes", (req) => {
    return {
      status: 200,
      body: xml(modelWithAttributes),
    };
  }),
);

Scenarios.Payload_Xml_ModelWithAttributesValue_put = passOnSuccess(
  mockapi.put("/payload/xml/modelWithAttributes", (req) => {
    req.expect.containsHeader("content-type", "application/xml");
    req.expect.xmlBodyEquals(modelWithAttributes);
    return {
      status: 204,
    };
  }),
);

Scenarios.Payload_Xml_ModelWithUnwrappedArrayValue_get = passOnSuccess(
  mockapi.get("/payload/xml/modelWithUnwrappedArray", (req) => {
    return {
      status: 200,
      body: xml(modelWithUnwrappedArray),
    };
  }),
);

Scenarios.Payload_Xml_ModelWithUnwrappedArrayValue_put = passOnSuccess(
  mockapi.put("/payload/xml/modelWithUnwrappedArray", (req) => {
    req.expect.containsHeader("content-type", "application/xml");
    req.expect.xmlBodyEquals(modelWithUnwrappedArray);
    return {
      status: 204,
    };
  }),
);

Scenarios.Payload_Xml_ModelWithRenamedFieldsValue_get = passOnSuccess(
  mockapi.get("/payload/xml/modelWithRenamedFields", (req) => {
    return {
      status: 200,
      body: xml(modelWithRenamedFields),
    };
  }),
);

Scenarios.Payload_Xml_ModelWithRenamedFieldsValue_put = passOnSuccess(
  mockapi.put("/payload/xml/modelWithRenamedFields", (req) => {
    req.expect.containsHeader("content-type", "application/xml");
    req.expect.xmlBodyEquals(modelWithRenamedFields);
    return {
      status: 204,
    };
  }),
);

Scenarios.Payload_Xml_ModelWithEmptyArrayValue_get = passOnSuccess(
  mockapi.get("/payload/xml/modelWithEmptyArray", (req) => {
    return {
      status: 200,
      body: xml(modelWithEmptyArray),
    };
  }),
);

Scenarios.Payload_Xml_ModelWithEmptyArrayValue_put = passOnSuccess(
  mockapi.put("/payload/xml/modelWithEmptyArray", (req) => {
    req.expect.containsHeader("content-type", "application/xml");
    req.expect.xmlBodyEquals(modelWithEmptyArray);
    return {
      status: 204,
    };
  }),
);

Scenarios.Payload_Xml_ModelWithTextValue_get = passOnSuccess(
  mockapi.get("/payload/xml/modelWithText", (req) => {
    return {
      status: 200,
      body: xml(modelWithText),
    };
  }),
);

Scenarios.Payload_Xml_ModelWithTextValue_put = passOnSuccess(
  mockapi.put("/payload/xml/modelWithText", (req) => {
    req.expect.containsHeader("content-type", "application/xml");
    req.expect.xmlBodyEquals(modelWithText);
    return {
      status: 204,
    };
  }),
);

Scenarios.Payload_Xml_ModelWithDictionaryValue_get = passOnSuccess(
  mockapi.get("/payload/xml/modelWithDictionary", (req) => {
    return {
      status: 200,
      body: xml(modelWithDictionary),
    };
  }),
);

Scenarios.Payload_Xml_ModelWithDictionaryValue_put = passOnSuccess(
  mockapi.put("/payload/xml/modelWithDictionary", (req) => {
    req.expect.containsHeader("content-type", "application/xml");
    req.expect.xmlBodyEquals(modelWithDictionary);
    return {
      status: 204,
    };
  }),
);
