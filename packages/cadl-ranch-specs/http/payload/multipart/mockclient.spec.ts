import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, pngFile, jpgFile, SERVICE_CALL_TYPE, uint8ArrayToString } from "../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe.skip("payload/multi-part endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  describe("string + bytes", () => {
    it("Buffer extends Uint8Array should be allowed", async () => {
      const endPoint = `${serverBasePath}/multipart/form-data/mixed-parts`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: [
            { name: "id", body: "123" },
            { name: "profileImage", body: jpgFile, filename: "hello.jpg", contentType: "image/jpg" },
          ],
          config: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("supports anonymous model file upload", async () => {
      const endPoint = `${serverBasePath}/multipart/form-data/anonymous-model`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: [
            {
              name: "profileImage",
              body: jpgFile,
              filename: "test.jpg",
            },
          ],
          config: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });
  });

  describe("custom content type + filename", () => {
    it("raises 400 error when filename and MIME type unspecified", async () => {
      const endPoint = `${serverBasePath}/multipart/form-data/check-filename-and-content-type`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: [
            { name: "id", body: "123" },
            { name: "profileImage", body: jpgFile, filename: "profileImage.jpg" },
          ],
          config: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        },
      });
      assert.strictEqual(response.status, 400);
      assert.strictEqual(response.data.expected, "image/jpg");
      assert.strictEqual(response.data.actual, "application/octet-stream");
    });

    it("allows specifying MIME type and filename", async () => {
      const endPoint = `${serverBasePath}/multipart/form-data/check-filename-and-content-type`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: [
            { name: "id", body: "123" },
            { name: "profileImage", body: jpgFile, filename: "hello.jpg", contentType: "image/jpg" },
          ],
          config: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });
  });

  describe("bytes + bytes", () => {
    it("can upload multiple files with same part name", async () => {
      const endPoint = `${serverBasePath}/multipart/form-data/binary-array-parts`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: [
            { name: "id", body: "123" },
            { name: "pictures", body: pngFile, filename: "test1.png" },
            { name: "pictures", body: pngFile, filename: "test.png" },
          ],
          config: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("can skip uploading optional file parts", async () => {
      const endPoint = `${serverBasePath}/multipart/form-data/multi-binary-parts`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: [{ name: "profileImage", body: jpgFile, filename: "profileImage.jpg" }],
          config: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("can upload optional file parts", async () => {
      const endPoint = `${serverBasePath}/multipart/form-data/multi-binary-parts`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: [
            { name: "profileImage", body: jpgFile, filename: "profileImage.jpg" },
            { name: "picture", body: pngFile, filename: "aaa.png" },
          ],
          config: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });

    it("complex body with multiple parts of different kinds", async () => {
      const endPoint = `${serverBasePath}/multipart/form-data/complex-parts`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: [
            { name: "id", body: "123" },
            { name: "address", body: { city: "X" } },
            { name: "previousAddresses", body: [{ city: "Y" }, { city: "Z" }] },
            {
              name: "profileImage",
              body: jpgFile,
              filename: "profileImage.jpg",
            },
            { name: "pictures", body: pngFile, filename: "aaa.png" },
            { name: "pictures", body: pngFile, filename: "aaa.png" },
          ],
          config: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });
  });

  describe("JSON parts", () => {
    it("supports JSON part with file upload", async () => {
      const endPoint = `${serverBasePath}/multipart/form-data/json-part`;
      const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
        endPoint,
        options: {
          requestBody: [
            { name: "address", body: { city: "X" } },
            {
              name: "profileImage",
              body: jpgFile,
              filename: "profileImage.jpg",
            },
          ],
          config: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        },
      });
      assert.strictEqual(response.status, 204);
    });
  });
});
