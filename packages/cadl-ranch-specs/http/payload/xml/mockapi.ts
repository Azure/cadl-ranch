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
  <counts />
</ModelWithOptionalField>
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
