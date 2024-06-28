import {
  passOnSuccess,
  ScenarioMockApi,
  mockapi,
  ValidationError,
  MockRequest,
  MockApi,
  withKeys,
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

function checkFile(
  req: MockRequest,
  file: Record<string, any>,
  expected: Buffer,
  contentType: string = "application/octet-stream",
  fileName: string | undefined = undefined,
) {
  req.expect.deepEqual(file.mimetype, contentType);
  req.expect.deepEqual(file.buffer, expected);
  if (fileName) {
    req.expect.deepEqual(file.originalname, fileName);
  }
}

function checkJpgFile(
  req: MockRequest,
  file: Record<string, any>,
  contentType: string = "application/octet-stream",
  fileName: string | undefined = undefined,
) {
  req.expect.deepEqual(file.fieldname, "profileImage");
  checkFile(req, file, jpgFile, contentType, fileName);
}

function checkPngFile(req: MockRequest, file: Record<string, any>, fieldName: string = "pictures") {
  req.expect.deepEqual(file.fieldname, fieldName);
  checkFile(req, file, pngFile);
}

function checkProfileImage(req: MockRequest) {
  if (req.files instanceof Array && req.files?.length > 0) {
    checkJpgFile(req, req.files[0]);
  } else {
    throw new ValidationError("No profileImage found", "jpg file is expected", req.body);
  }
}

function checkFileNameAndContentType(req: MockRequest) {
  if (req.files instanceof Array && req.files?.length > 0) {
    checkJpgFile(req, req.files[0], "image/jpg", "hello.jpg");
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
        throw new ValidationError("unexpected fieldname", "profileImage or pictures", file.fieldname);
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

Scenarios.Payload_MultiPart_FormData_jsonPart = passOnSuccess(
  createMockApis("json-part", [checkAddress, checkProfileImage]),
);

Scenarios.Payload_MultiPart_FormData_binaryArrayParts = passOnSuccess(
  createMockApis("binary-array-parts", [checkId, checkPictures]),
);

Scenarios.Payload_MultiPart_FormData_jsonArrayParts = passOnSuccess(
  createMockApis("json-array-parts", [checkPreviousAddresses, checkProfileImage]),
);

Scenarios.Payload_MultiPart_FormData_multiBinaryParts = withKeys(["profileImage", "profileImage,picture"]).pass(
  mockapi.post("/multipart/form-data/multi-binary-parts", (req) => {
    if (req.files instanceof Array) {
      switch (req.files.length) {
        case 1:
          checkJpgFile(req, req.files[0]);
          return { pass: "profileImage", status: 204 } as const;
        case 2:
          let profileImage = false;
          let picture = false;
          for (const file of req.files) {
            if (file.fieldname === "profileImage") {
              checkJpgFile(req, file);
              profileImage = true;
            } else if (file.fieldname === "picture") {
              checkPngFile(req, file, "picture");
              picture = true;
            } else {
              throw new ValidationError("unexpected fieldname", "profileImage or picture", file.fieldname);
            }
          }
          if (!profileImage) {
            throw new ValidationError("No profileImage found", "jpg file is expected", req.body);
          } else if (!picture) {
            throw new ValidationError("No picture found", "png file are expected", req.body);
          }
          return { pass: "profileImage,picture", status: 204 } as const;
        default:
          throw new ValidationError("number of files is incorrect", "1 or 2 files are expected", req.body);
      }
    } else {
      throw new ValidationError("Can't parse files from request", "jpg/png files are expected", req.body);
    }
  }),
);

Scenarios.Payload_MultiPart_FormData_checkFileNameAndContentType = passOnSuccess(
  createMockApis("check-filename-and-content-type", [checkId, checkFileNameAndContentType]),
);

Scenarios.Payload_MultiPart_FormData_anonymousModel = passOnSuccess(
  createMockApis("anonymous-model", [checkProfileImage]),
);

Scenarios.Payload_MultiPart_FormData_checkFileNameAndContentTypeWithHttpPart = passOnSuccess(
  createMockApis("/check-filename-and-content-type-with-httppart", [checkId, checkFileNameAndContentType]),
);

Scenarios.Payload_MultiPart_FormData_complexWithHttpPart = passOnSuccess(
  createMockApis("/complex-parts-with-httppart", [checkId, checkAddress, checkPreviousAddresses, checkAllFiles]),
);
