import { passOnSuccess, ScenarioMockApi, mockapi, ValidationError } from "@azure-tools/cadl-ranch-api";
import { jpgFile, pngFile } from "../../helper.js";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Payload_MultiPart_FormData_basic = passOnSuccess(
  mockapi.post("/multipart/form-data/mixed-parts", (req) => {
    req.expect.deepEqual(req.body.id, "123");
    if (req.files instanceof Array && req.files?.length > 0) {
      req.expect.deepEqual(req.files[0].fieldname, "profileImage");
      req.expect.deepEqual(req.files[0].mimetype, "application/octet-stream");
      req.expect.deepEqual(req.files[0].buffer, jpgFile);
    } else {
      throw new ValidationError("No profileImage found", "jpg file is expected", req.body);
    }

    return { status: 204 };
  }),
);

Scenarios.Payload_MultiPart_FormData_complex = passOnSuccess(
  mockapi.post("/multipart/form-data/complex-parts", (req) => {
    req.expect.deepEqual(req.body.id, "123");
    req.expect.deepEqual(JSON.parse(req.body.address), { city: "X" });
    req.expect.deepEqual(JSON.parse(req.body.previousAddresses), [{ city: "Y" }, { city: "Z" }]);
    if (req.files instanceof Array && req.files?.length === 3) {
      for (const file of req.files) {
        if (file.fieldname === "profileImage") {
          req.expect.deepEqual(file.mimetype, "application/octet-stream");
          req.expect.deepEqual(file.buffer, jpgFile);
        } else if (file.fieldname === "pictures") {
          req.expect.deepEqual(file.mimetype, "application/octet-stream");
          req.expect.deepEqual(file.buffer, pngFile);
        } else {
          throw new ValidationError("unexpected filename", "profileImage or pictures", file.fieldname);
        }
      }
    } else {
      throw new ValidationError("Can't parse files from request", "jpg/png files are expected", req.body);
    }

    return { status: 204 };
  }),
);
