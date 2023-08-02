import { expect } from "chai";
import "mocha";
import { updatePackageJson } from "../src/cli/typespec-bump-deps.js";

describe("typespec-bump-deps cli", () => {
  describe("updatePackageJson()", () => {
    it("should replace dependency versions", () => {
      const packageJson = {
        dependencies: {
          "package-a": "1.0.0",
        },
        devDependencies: {
          "package-b": "1.0.0",
        },
        peerDependencies: {
          "package-c": "1.0.0",
        },
      };

      const packageToVersionRecord = {
        "package-a": "2.0.0",
        "package-b": "3.0.0",
        "package-c": "4.0.0",
      };

      updatePackageJson(packageJson, packageToVersionRecord, false, false);

      expect(packageJson).to.deep.equal({
        dependencies: { "package-a": "2.0.0" },
        devDependencies: { "package-b": "3.0.0" },
        peerDependencies: { "package-c": "4.0.0" },
      });
    });
  });
});
