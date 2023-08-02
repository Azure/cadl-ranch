import { readFile, writeFile } from "fs/promises";
import pacote from "pacote";
import semver from "semver";
import { parseArgs } from "util";

const knownPackages = [
  "@typespec/compiler",
  "@typespec/rest",
  "@typespec/http",
  "@typespec/versioning",
  "@azure-tools/typespec-client-generator-core",
  "@azure-tools/typespec-azure-core",
  "@typespec/eslint-config-typespec",
];

function isComplex(range: semver.Range): boolean {
  /* a complex range has multiple segments,
   *   ">=0.1.2 || 1.2.3"
   *  or multiple comparators,
   *   ">=0.1.2 <1.2.3"
   *  or an operator
   *   ">=1.2.3"
   *
   *  a simple range has a single segment with a single comparator and no operator
   *   "1.2.3"
   */
  return range?.set.length > 0 && (range.set.length > 1 || range.set[0].length > 1 || range.set[0][0].operator !== "");
}

function getVersionRange(version: string): string {
  const parsed = semver.parse(version);
  if (!parsed) {
    throw new Error(`Unable to parse version ${version}`);
  }

  const preReleaseSuffix = parsed.prerelease.length > 0 ? `-${parsed.prerelease[0]}` : "";

  return `>=${parsed.major}.${parsed.minor}.0${preReleaseSuffix} <${parsed.major}.${parsed.minor}.0`;
}

async function getKnownPackageVersion(packageName: string): Promise<string> {
  return (await pacote.manifest(`${packageName}@next`)).version;
}

export async function main() {
  const args = process.argv.slice(2);
  const options = {
    "add-rush-overrides": {
      type: "boolean",
    },
    "add-npm-overrides": {
      type: "boolean",
    },
    "keep-ranges": {
      type: "boolean",
    },
  } as const;

  const { values, positionals } = parseArgs({ args, options, allowPositionals: true });

  const packageJsonPaths = positionals;
  const addRushOverrides = values["add-rush-overrides"] ?? false;
  const addNpmOverrides = values["add-npm-overrides"] ?? false;
  const keepRanges = values["keep-ranges"] ?? false;

  const packageToVersionRecord = Object.fromEntries(
    await Promise.all(knownPackages.map(async (x) => [x, await getKnownPackageVersion(x)])),
  );
  const packageToVersionRange = Object.fromEntries(
    knownPackages.map((x) => [x, getVersionRange(packageToVersionRecord[x])]),
  );
  // eslint-disable-next-line no-console
  console.log("The following is a mapping between packages and the versions we will update them to");
  // eslint-disable-next-line no-console
  console.log(packageToVersionRecord);

  for (const packageJsonPath of packageJsonPaths) {
    const content = await readFile(packageJsonPath);
    const packageJson = JSON.parse(content.toString());

    updatePackageJson(
      packageJson,
      packageToVersionRecord,
      packageToVersionRange,
      keepRanges,
      addNpmOverrides,
      addRushOverrides,
    );

    // eslint-disable-next-line no-console
    console.log(`Updated ${packageJsonPath}`);
    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }
}

export function updatePackageJson(
  packageJson: any,
  packageToVersionRecord: any,
  packageToVersionRange: { [k: string]: string },
  keepRanges: boolean,
  addNpmOverrides: boolean,
  addRushOverrides: boolean,
) {
  const depTypes = ["dependencies", "devDependencies", "peerDependencies"];

  for (const packageName of knownPackages) {
    const newVersion = packageToVersionRecord[packageName];

    if (keepRanges && packageJson.peerDependencies && packageJson.devDependencies) {
      const peerDependency = packageJson.peerDependencies[packageName];
      const peerRange = peerDependency ? new semver.Range(peerDependency) : undefined;
      const devDependency = packageJson.devDependencies[packageName];
      const dependency = packageJson.dependencies[packageName];

      if (peerRange && devDependency && !dependency) {
        // we don't do range based peerDependencies if there's a dependencies entry for the same package
        if (!semver.satisfies(newVersion, peerRange)) {
          // if the new version doesn't satisfy the existing range, we add the new range
          if (isComplex(peerRange)) {
            // complex ranges get the new range appended
            // ">= 0.3.0 <1.0.0" => ">= 0.3.0 <1.0.0 || >= 0.4.0-dev <0.4.0"
            packageJson.peerDependencies[packageName] += ` || ${packageToVersionRange[packageName]}`;
          } else {
            // simple ranges get replaced with the new range
            // "1.2.0" => ">= 0.4.0-dev <0.4.0"
            packageJson.peerDependencies[packageName] = packageToVersionRange[packageName];
          }
        }
        packageJson.devDependencies[packageName] = newVersion;
        if (packageJson.dependencies && packageJson.dependencies[packageName]) {
          delete packageJson.dependencies[packageName];
        }
        return;
      }
    }

    for (const depType of depTypes) {
      const deps = packageJson[depType];

      if (deps && deps[packageName]) {
        deps[packageName] = newVersion;
      }
    }
  }

  // add/merge package versions into "overrides" or "globalOverrides"
  let overridesType: string | undefined = undefined;
  if (addNpmOverrides) {
    overridesType = "overrides";
  } else if (addRushOverrides) {
    overridesType = "globalOverrides";
  }
  if (overridesType) {
    let deps = packageJson[overridesType];
    if (deps === undefined) {
      deps = {};
      packageJson[overridesType] = deps;
    }
    for (const [packageName, version] of Object.entries(packageToVersionRecord)) {
      deps[packageName] = version;
    }
  }
}
