import { passOnSuccess, mockapi, ValidationError, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import { resolvePath } from "@typespec/compiler";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const root = resolvePath(fileURLToPath(import.meta.url), "../../../../");

const pngFile = readFileSync(resolvePath(root, "assets/image.png"));
const jpegImage = readFileSync(resolvePath(root, "assets/image.jpg"));

Scenarios.ContentNegotiation_SameBody = passOnSuccess(
  mockapi.get("/content-negotiation/same-body", (req) => {
    switch (req.headers["accept"]) {
      case "image/png":
        return {
          status: 200,
          body: {
            contentType: "image/png",
            rawContent: pngFile,
          },
        };
      case "image/jpeg":
        return {
          status: 200,
          body: {
            contentType: "image/jpeg",
            rawContent: jpegImage,
          },
        };
      default:
        throw new ValidationError("Unsupported Accept header", `"image/png" | "image/jpeg"`, req.headers["accept"]);
    }
  }),
);

Scenarios.ContentNegotiation_DifferentBody = passOnSuccess(
  mockapi.get("/content-negotiation/different-body", (req) => {
    switch (req.headers["accept"]) {
      case "image/png":
        return {
          status: 200,
          body: {
            contentType: "image/png",
            rawContent: pngFile,
          },
        };
      case "application/json":
        return {
          status: 200,
          body: json({
            value: pngFile.toString("base64"),
          }),
        };
      default:
        throw new ValidationError("Unsupported Accept header", `"image/png" | "image/jpeg"`, req.headers["accept"]);
    }
  }),
);
