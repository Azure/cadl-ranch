import { mockapi, ValidationError, json, withKeys } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import { resolvePath } from "@typespec/compiler";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const root = resolvePath(fileURLToPath(import.meta.url), "../../../../");

const pngFile = readFileSync(resolvePath(root, "assets/image.png"));
const jpegImage = readFileSync(resolvePath(root, "assets/image.jpg"));

Scenarios.Payload_ContentNegotiation_SameBody = withKeys(["image/png", "image/jpeg"]).pass(
  mockapi.get("/content-negotiation/same-body", (req) => {
    switch (req.headers["accept"]) {
      case "image/png":
        return {
          pass: "image/png",
          status: 200,
          body: {
            contentType: "image/png",
            rawContent: pngFile,
          },
        } as const;
      case "image/jpeg":
        return {
          pass: "image/jpeg",

          status: 200,
          body: {
            contentType: "image/jpeg",
            rawContent: jpegImage,
          },
        } as const;
      default:
        throw new ValidationError("Unsupported Accept header", `"image/png" | "image/jpeg"`, req.headers["accept"]);
    }
  }),
);

Scenarios.Payload_ContentNegotiation_DifferentBody = withKeys(["image/png", "application/json"]).pass(
  mockapi.get("/content-negotiation/different-body", (req) => {
    switch (req.headers["accept"]) {
      case "image/png":
        return {
          pass: "image/png",
          status: 200,
          body: {
            contentType: "image/png",
            rawContent: pngFile,
          },
        } as const;
      case "application/json":
        return {
          pass: "application/json",
          status: 200,
          body: json({
            value: pngFile.toString("base64"),
          }),
        } as const;
      default:
        throw new ValidationError(
          "Unsupported Accept header",
          `"image/png" | "application/json"`,
          req.headers["accept"],
        );
    }
  }),
);
