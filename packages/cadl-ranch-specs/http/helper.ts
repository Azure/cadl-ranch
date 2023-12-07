import { resolvePath } from "@typespec/compiler";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { MockRequest } from "@azure-tools/cadl-ranch-api";

const root = resolvePath(fileURLToPath(import.meta.url), "../../../");

export const pngFile = readFileSync(resolvePath(root, "assets/image.png"));
export const jpgFile = readFileSync(resolvePath(root, "assets/image.jpg"));

export function checkApiVersion(req: MockRequest, expected: string) {
  if (req.headers["check-api-version"] === undefined) {
    req.expect.containsQueryParam("api-version", expected);
  }
}
