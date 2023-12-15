import {
  passOnSuccess,
  ScenarioMockApi,
  mockapi,
  ValidationError,
  MockRequest,
  MockApi,
} from "@azure-tools/cadl-ranch-api";
import { jpgFile, pngFile } from "../../helper.js";

export const Scenarios: Record<string, ScenarioMockApi> = {};

function checkId(req: MockRequest) {
  req.expect.deepEqual(req.body.id, "123");
}

function checkAddress(req: MockRequest) {
  req.expect.deepEqual(JSON.parse(req.body.address), { city: "X" });
}

function checkPreviousAddresses(req: MockRequest) {
  req.expect.deepEqual(JSON.parse(req.body.previousAddresses), [{ city: "Y" }, { city: "Z" }]);
}

function checkFile(req: MockRequest, file: Record<string, any>, expected: Buffer) {
  req.expect.deepEqual(file.mimetype, "application/octet-stream");
  req.expect.deepEqual(file.buffer, expected);
}

function checkJpgFile(req: MockRequest, file: Record<string, any>) {
  req.expect.deepEqual(file.fieldname, "profileImage");
  checkFile(req, file, jpgFile);
}

function checkPngFile(req: MockRequest, file: Record<string, any>) {
  req.expect.deepEqual(file.fieldname, "pictures");
  checkFile(req, file, pngFile);
}

function checkProfileImage(req: MockRequest) {
  if (req.files instanceof Array && req.files?.length > 0) {
    checkJpgFile(req, req.files[0]);
  } else {
    throw new ValidationError("No profileImage found", "jpg file is expected", req.body);
  }
}

function checkAllFiles(req: MockRequest) {
  if (req.files instanceof Array && req.files?.length === 3) {
    for (const file of req.files) {
      if (file.fieldname === "profileImage") {
        checkJpgFile(req, file);
      } else if (file.fieldname === "pictures") {
        checkPngFile(req, file);
      } else {
        throw new ValidationError("unexpected filename", "profileImage or pictures", file.fieldname);
      }
    }
  } else {
    throw new ValidationError("Can't parse files from request", "jpg/png files are expected", req.body);
  }
}

function checkPictures(req: MockRequest) {
  if (req.files instanceof Array && req.files?.length === 2) {
    for (const file of req.files) {
      checkPngFile(req, file);
    }
  } else {
    throw new ValidationError("No pictures found", "png files are expected", req.body);
  }
}

function createMockApis(route: string, checkList: ((param: MockRequest) => void)[]): MockApi {
  const url = `/multipart/form-data/${route}`;
  return mockapi.post(url, (req) => {
    for (const callback of checkList) {
      callback(req);
    }
    return { status: 204 };
  });
}

Scenarios.Payload_MultiPart_FormData_basic = passOnSuccess(createMockApis("mixed-parts", [checkId, checkProfileImage]));

Scenarios.Payload_MultiPart_FormData_complex = passOnSuccess(
  createMockApis("complex-parts", [checkId, checkAddress, checkPreviousAddresses, checkAllFiles]),
);

Scenarios.Payload_MultiPart_FormData_withJsonPart = passOnSuccess(
  createMockApis("json-part", [checkAddress, checkProfileImage]),
);

Scenarios.Payload_MultiPart_FormData_withMultiBinaryParts = passOnSuccess(
  createMockApis("multi-binary-parts", [checkId, checkPictures]),
);

Scenarios.Payload_MultiPart_FormData_withMultiJsonParts = passOnSuccess(
  createMockApis("multi-json-parts", [checkPreviousAddresses, checkProfileImage]),
);
