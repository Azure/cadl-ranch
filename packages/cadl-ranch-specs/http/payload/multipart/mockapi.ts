import { passOnSuccess, ScenarioMockApi, mockapi } from "@azure-tools/cadl-ranch-api";
import { pngFile, jpgFile } from "../../helper.js";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Payload_MultiPart_FormData_mixedParts = passOnSuccess(
  mockapi.post("/multipart/form-data/mixed-parts", (req) => {
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
