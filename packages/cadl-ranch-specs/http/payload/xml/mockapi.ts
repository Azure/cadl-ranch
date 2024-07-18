import { passOnSuccess, mockapi, xml } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const simpleModel =
`
<SimpleModel>
  <Name>foo</Name>
  <Age>123</Age>
</SimpleModel>
`;

const modelWithSimpleArrays =
`
<ModelWithSimpleArrays>
  <Colors>red</Colors>
  <Colors>green</Colors>
  <Colors>blue</Colors>
  <Counts>1</Counts>
  <Counts>2</Counts>
</ModelWithSimpleArrays>
`;

const modelWithArrayOfModel =
`
<ModelWithArrayOfModel>
  <SimpleModel>
    <Name>foo</Name>
    <Age>123</Age>
  </SimpleModel>
  <SimpleModel>
    <Name>bar</Name>
    <Age>456</Age>
  </SimpleModel>
</ModelWithArrayOfModel>
`;

const modelWithOptionalField =
`
<ModelWithOptionalField>
  <Item>widget</Item>
  <Counts />
</ModelWithOptionalField>
`;

Scenarios.Payload_Xml_getSimpleModel = passOnSuccess(
  mockapi.get("/payload/xml/simpleModel", (req) => {
    return {
      status: 200,
      body: xml(simpleModel),
    };
  }),
);

Scenarios.Payload_Xml_putSimpleModel = passOnSuccess(
  mockapi.put("/payload/xml/simpleModel", (req) => {
    req.expect.containsHeader('content-type', 'application/xml');
    req.expect.xmlBodyEquals(simpleModel);
    return {
      status: 204,
    };
  }),
);

Scenarios.Payload_Xml_getModelWithSimpleArrays = passOnSuccess(
  mockapi.get("/payload/xml/modelWithSimpleArrays", (req) => {
    return {
      status: 200,
      body: xml(modelWithSimpleArrays),
    };
  }),
);

Scenarios.Payload_Xml_putModelWithSimpleArrays = passOnSuccess(
  mockapi.put("/payload/xml/modelWithSimpleArrays", (req) => {
    req.expect.containsHeader('content-type', 'application/xml');
    req.expect.xmlBodyEquals(modelWithSimpleArrays);
    return {
      status: 204,
    };
  }),
);

Scenarios.Payload_Xml_getModelWithArrayOfModel = passOnSuccess(
  mockapi.get("/payload/xml/modelWithArrayOfModel", (req) => {
    return {
      status: 200,
      body: xml(modelWithArrayOfModel),
    };
  }),
);

Scenarios.Payload_Xml_putModelWithArrayOfModel = passOnSuccess(
  mockapi.put("/payload/xml/modelWithArrayOfModel", (req) => {
    req.expect.containsHeader('content-type', 'application/xml');
    req.expect.xmlBodyEquals(modelWithArrayOfModel);
    return {
      status: 204,
    };
  }),
);

Scenarios.Payload_Xml_getModelWithOptionalField = passOnSuccess(
  mockapi.get("/payload/xml/modelWithOptionalField", (req) => {
    return {
      status: 200,
      body: xml(modelWithOptionalField),
    };
  }),
);

Scenarios.Payload_Xml_putModelWithOptionalField = passOnSuccess(
  mockapi.put("/payload/xml/modelWithOptionalField", (req) => {
    req.expect.containsHeader('content-type', 'application/xml');
    req.expect.xmlBodyEquals(modelWithOptionalField);
    return {
      status: 204,
    };
  }),
);
