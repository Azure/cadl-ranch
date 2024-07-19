import { passOnSuccess, mockapi, xml } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const simpleModel = `
<SimpleModel>
  <Name>foo</Name>
  <Age>123</Age>
</SimpleModel>
`;

const modelWithSimpleArrays = `
<ModelWithSimpleArrays>
  <Colors>
    <string>red</string>
    <string>green</string>
    <string>blue</string>
  </Colors>
  <Counts>
    <int32>1</int32>
    <int32>2</int32>
  </Counts>
</ModelWithSimpleArrays>
`;

const modelWithArrayOfModel = `
<ModelWithArrayOfModel>
  <Items>
    <SimpleModel>
      <Name>foo</Name>
      <Age>123</Age>
    </SimpleModel>
    <SimpleModel>
      <Name>bar</Name>
      <Age>456</Age>
    </SimpleModel>
  </Items>
</ModelWithArrayOfModel>
`;

const modelWithOptionalField = `
<ModelWithOptionalField>
  <Item>widget</Item>
  <Counts />
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
