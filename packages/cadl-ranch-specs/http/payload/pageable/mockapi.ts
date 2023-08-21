import { mockapi, json, withKeys } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Payload_Pageable_list = withKeys(["firstPage", "secondPage"]).pass(
  mockapi.get("/payload/pageable", (req) => {
    req.expect.containsQueryParam("top", "100");
    req.expect.containsQueryParam("maxpagesize", "3");
    switch (req.query("skip")) {
      case "5":
        return {
          status: 200,
          body: json({ value: [ {name: "user5"}, {name: "user6"}, {name: "user7"}], nextLink: `${req.baseUrl}//payload/pageable?top=100&skip=8&maxpagesize=3` }),
        } as const;
    
      case "8":
        return {
          status: 200,
          body: json({ value: [ {name: "user8"}] }),
        } as const;
    
      default:
        throw new ValidationError("Unsupported skip query parameter", `"5" | "8"`, req.query("skip"));
      }
  })
);
