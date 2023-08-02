import { expect } from "chai";
import { describe, it } from "mocha";
import { updatePackageJson } from "../src/cli/typespec-bump-deps.js";

describe("typespec-bump-deps cli", () => {
  describe("updatePackageJson()", () => {
    it("should replace dependency versions", () => {
      const packageJson = {
        dependencies: {
          "package-a": "1.0.0",
          "extra": "1",
        },
        devDependencies: {
          "package-b": "1.0.0",
          "extra": "1",
        },
        peerDependencies: {
          "package-c": "1.0.0",
          "extra": "1",
        },
      };

      const packageToVersionRecord = {
        "package-a": "2.0.0",
        "package-b": "3.0.0",
        "package-c": "4.0.0",
      };

      const addNpmOverrides = false;
      const addRushOverrides = false;
      updatePackageJson(packageJson, packageToVersionRecord, addNpmOverrides, addRushOverrides);

      expect(packageJson).to.deep.equal({
        dependencies: {
          "package-a": "2.0.0",
          "extra": "1",
        },
        devDependencies: {
          "package-b": "3.0.0",
          "extra": "1",
        },
        peerDependencies: {
          "package-c": "4.0.0",
          "extra": "1",
        },
      });
    });

    it("should add overrides when addNpmOverrides == true", () => {
      const packageJson = {
        dependencies: {},
      };

      const packageToVersionRecord = {
        "package-a": "2.0.0",
        "package-b": "3.0.0",
        "package-c": "4.0.0",
      };

      const addNpmOverrides = true;
      const addRushOverrides = false;
      updatePackageJson(packageJson, packageToVersionRecord, addNpmOverrides, addRushOverrides);

      expect(packageJson).to.deep.equal({
        dependencies: {},
        overrides: {
          "package-a": "2.0.0",
          "package-b": "3.0.0",
          "package-c": "4.0.0",
        },
      });
    });

    it("should add globalOverrides when addRushOverrides == true", () => {
      const packageJson = {
        dependencies: {},
      };

      const packageToVersionRecord = {
        "package-a": "2.0.0",
        "package-b": "3.0.0",
        "package-c": "4.0.0",
      };

      const addNpmOverrides = false;
      const addRushOverrides = true;
      updatePackageJson(packageJson, packageToVersionRecord, addNpmOverrides, addRushOverrides);

      expect(packageJson).to.deep.equal({
        dependencies: {},
        globalOverrides: {
          "package-a": "2.0.0",
          "package-b": "3.0.0",
          "package-c": "4.0.0",
        },
      });
    });
  });
});
