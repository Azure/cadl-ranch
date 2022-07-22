import { stat } from "fs/promises";

export async function ensureScenariosPathExists(scenariosPath: string) {
  try {
    const stats = await stat(scenariosPath);
    if (!stats.isDirectory()) {
      throw new Error(`Scenarios path ${scenariosPath} is not a directory.`);
    }
  } catch (e) {
    throw new Error(`Scenarios path ${scenariosPath} doesn't exists.`);
  }
}
