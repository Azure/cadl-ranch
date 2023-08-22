import { mockapi, json, withKeys, ValidationError } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Payload_Pageable_list = withKeys(["firstPage", "secondPage"]).pass(
  mockapi.get("/payload/pageable", (req) => {
    req.expect.containsQueryParam("maxpagesize", "3");
    switch (req.query["skip"]) {
      case "5":
        return {
          pass: "firstPage",

          status: 200,
          body: json({
            value: [{ name: "user5" }, { name: "user6" }, { name: "user7" }],
            nextLink: `${req.baseUrl}/payload/pageable?skip=8&maxpagesize=3`,
          }),
        } as const;

      case "8":
        return {
          pass: "secondPage",

          status: 200,
          body: json({ value: [{ name: "user8" }] }),
        } as const;

      default:
        throw new ValidationError(
          "Unsupported skip query parameter",
          `"5" for first page, "8" for second page`,
          req.query["skip"],
        );
    }
  }),
);
