import { passOnSuccess, ScenarioMockApi, mockapi } from "@azure-tools/cadl-ranch-api";
import { resolvePath } from "@typespec/compiler";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const root = resolvePath(fileURLToPath(import.meta.url), "../../../../../");

const pngFile = readFileSync(resolvePath(root, "assets/image.png"));
const jpgFile = readFileSync(resolvePath(root, "assets/image.jpg"));

Scenarios.ContentType_MultipartFormData_multipart = passOnSuccess(
  mockapi.post("/content-type/multipart-formdata", (req) => {
    req.expect.deepEqual(req.body.id, "123");
    req.expect.deepEqual(JSON.parse(req.body.address), { city: "X" });
    req.expect.deepEqual(JSON.parse(req.body.previousAddresses), [{ city: "Y" }, { city: "Z" }]);
    for (const file of req.files) {
      if (["image1.png", "image2.png"].includes(file.originalname)) {
        req.expect.deepEqual(file.buffer, pngFile);
      } else if ("image.jpg" === file.originalname) {
        req.expect.deepEqual(file.buffer, jpgFile);
      } else {
        throw new Error(`Unexpected file: ${file.originalname}`);
      }
    }

    return { status: 204 };
  }),
);
