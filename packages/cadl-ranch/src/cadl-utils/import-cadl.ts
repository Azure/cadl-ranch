import { realpath, readFile, stat } from "fs/promises";
import { pathToFileURL } from "url";
import { ResolveModuleHost, resolveModule } from "./module-resolver.js";

export async function importCadl(baseDir: string): Promise<typeof import("@cadl-lang/compiler")> {
  return importCadlLibrary("@cadl-lang/compiler", baseDir);
}
export async function importCadlRanchExpect(baseDir: string): Promise<typeof import("@azure-tools/cadl-ranch-expect")> {
  return importCadlLibrary("@azure-tools/cadl-ranch-expect", baseDir);
}
export async function importCadlRest(baseDir: string): Promise<typeof import("@cadl-lang/rest")> {
  return importCadlLibrary("@cadl-lang/rest", baseDir);
}

export async function importCadlLibrary(name: string, baseDir: string): Promise<any> {
  try {
    const host: ResolveModuleHost = {
      realpath,
      readFile: async (path: string) => await readFile(path, "utf-8"),
      stat,
    };
    const resolved = await resolveModule(host, name, {
      baseDir,
    });
    return import(pathToFileURL(resolved).toString());
  } catch (err: any) {
    if (err.code === "MODULE_NOT_FOUND") {
      // Resolution from cwd failed: use current package.
      return import(name);
    } else {
      throw err;
    }
  }
}
