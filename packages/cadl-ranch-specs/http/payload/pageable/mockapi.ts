import { json, ValidationError, withServiceKeys, MockRequest } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

function pageableHandler(req: MockRequest) {
  req.expect.containsQueryParam("maxpagesize", "3");
  const skipToken = req.query["skipToken"];
  if (skipToken === undefined) {
    return {
      pass: "firstPage",
      status: 200,
      body: json({
        value: [{ name: "user5" }, { name: "user6" }, { name: "user7" }],
        nextLink: `${req.baseUrl}/payload/pageable?skipToken=name-user7&maxpagesize=3`,
      }),
    } as const;
  } else if (skipToken === "name-user7") {
    return {
      pass: "secondPage",
      status: 200,
      body: json({ value: [{ name: "user8" }] }),
    } as const;
  } else {
    throw new ValidationError(
      "Unsupported skipToken query parameter",
      `Not provided for first page, "name-user7" for second page`,
      req.query["skipToken"],
    );
  }
}

Scenarios.Payload_Pageable_list = withServiceKeys(["firstPage", "secondPage"]).pass([
  {
    uri: "/payload/pageable",
    method: "get",
    request: {
      params: {
        maxpagesize: "3",
      },
    },
    response: {
      status: 200,
      body: json({
        value: [{ name: "user5" }, { name: "user6" }, { name: "user7" }],
        nextLink: `/payload/pageable?skipToken=name-user7&maxpagesize=3`,
      }),
    },
    handler: pageableHandler,
    kind: "MockApiDefinition",
  },
  {
    uri: "/payload/pageable",
    method: "get",
    request: {
      params: {
        maxpagesize: "3",
        skipToken: "name-user7",
      },
    },
    response: {
      status: 200,
      body: json({ value: [{ name: "user8" }] }),
    },
    handler: pageableHandler,
    kind: "MockApiDefinition",
  },
]);
