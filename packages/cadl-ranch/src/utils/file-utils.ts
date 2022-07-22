import fs from "fs";
import glob from "glob";

export async function findFilesFromPattern(pattern: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    glob(pattern, (err, matches) => {
      if (err) {
        reject(err);
      }
      resolve(matches);
    });
  });
}

/**
 * Ensure the given dir exists.
 * @param path Path to the dir.
 */
export async function ensureDir(path: string): Promise<void> {
  await fs.promises.mkdir(path, { recursive: true });
}
