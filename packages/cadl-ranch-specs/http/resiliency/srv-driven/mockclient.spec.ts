import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, matrix, SERVICE_CALL_TYPE } from "../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("resiliency/srv-driven service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  describe("add optional parameter from none", () => {
    const ops = [
      { path: `/resiliency/service-driven/client:v1/service:v1/api-version:v1/add-optional-param/from-none` },
      { path: `/resiliency/service-driven/client:v1/service:v2/api-version:v1/add-optional-param/from-none` },
      { path: `/resiliency/service-driven/client:v2/service:v2/api-version:v1/add-optional-param/from-none` },
      {
        path: `/resiliency/service-driven/client:v2/service:v2/api-version:v2/add-optional-param/from-none`,
        params: {
          "new-parameter": "new",
        },
      },
    ];

    matrix([ops], async (op: { path: string; params?: any }) => {
      it("should add optional parameter from none", async () => {
        const response = await makeServiceCall(SERVICE_CALL_TYPE.head, {
          endPoint: `${serverBasePath}${op.path}`,
          options: {
            config: {
              params: op.params,
            },
          },
        });
        assert.equal(response.status, 204);
      });
    });
  });

  describe("add optional parameter from required/optional", () => {
    const ops = [
      {
        path: `/resiliency/service-driven/client:v1/service:v1/api-version:v1/add-optional-param/from-one-required`,
        params: {
          parameter: "required",
        },
      },
      {
        path: `/resiliency/service-driven/client:v1/service:v2/api-version:v1/add-optional-param/from-one-required`,
        params: {
          parameter: "required",
        },
      },
      {
        path: `/resiliency/service-driven/client:v2/service:v2/api-version:v1/add-optional-param/from-one-required`,
        params: {
          parameter: "required",
        },
      },
      {
        path: `/resiliency/service-driven/client:v2/service:v2/api-version:v2/add-optional-param/from-one-required`,
        params: {
          "new-parameter": "new",
          "parameter": "required",
        },
      },
      {
        path: `/resiliency/service-driven/client:v1/service:v1/api-version:v1/add-optional-param/from-one-optional`,
        params: {
          parameter: "optional",
        },
      },
      {
        path: `/resiliency/service-driven/client:v1/service:v2/api-version:v1/add-optional-param/from-one-optional`,
        params: {
          parameter: "optional",
        },
      },
      {
        path: `/resiliency/service-driven/client:v2/service:v2/api-version:v1/add-optional-param/from-one-optional`,
        params: {
          parameter: "optional",
        },
      },
      {
        path: `/resiliency/service-driven/client:v2/service:v2/api-version:v2/add-optional-param/from-one-optional`,
        params: {
          "new-parameter": "new",
          "parameter": "optional",
        },
      },
    ];

    matrix([ops], async (op: { path: string; params?: any }) => {
      it("should add optional parameter from one required/optional", async () => {
        const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
          endPoint: `${serverBasePath}${op.path}`,
          options: {
            config: {
              params: op.params,
            },
          },
        });
        assert.equal(response.status, 204);
      });
    });
  });

  describe("add operations in delete method", () => {
    const relativePaths: string[] = [
      `/resiliency/service-driven/client:v1/service:v2/api-version:v2/add-operation`,
      `/resiliency/service-driven/client:v2/service:v2/api-version:v2/add-operation`,
    ];

    matrix([relativePaths], async (relativePath: string) => {
      it("should add operation in delete method", async () => {
        const response = await makeServiceCall(SERVICE_CALL_TYPE.delete, {
          endPoint: `${serverBasePath}${relativePath}`,
        });
        assert.equal(response.status, 204);
      });
    });
  });
});
