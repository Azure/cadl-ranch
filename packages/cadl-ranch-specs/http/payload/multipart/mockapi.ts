import { passOnSuccess, ScenarioMockApi, mockapi, ValidationError } from "@azure-tools/cadl-ranch-api";
import { jpgFile } from "../../helper.js";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Payload_MultiPart_FormData_basic = passOnSuccess(
  mockapi.post("/multipart/form-data/mixed-parts", (req) => {
    req.expect.deepEqual(req.body.id, "123");
    if (req.files?.length > 0) {
      req.expect.deepEqual("profileImage", req.files[0].fieldname);
      req.expect.deepEqual("application/octet-stream", req.files[0].mimetype);
      req.expect.deepEqual(jpgFile, req.files[0].buffer);
    } else {
      throw new ValidationError("No profileImage found", "jpg file is expected", req.body);
    }

    return { status: 204 };
  }),
);
