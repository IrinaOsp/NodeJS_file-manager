import { createReadStream } from "fs";
import fs from "fs/promises";
import path from "path";
import { getPath } from "../utils/getPath.js";

export default class OperationSystem {
  readFile(path) {
    const readStream = createReadStream(path);
    readStream.on("data", (data) => console.log(data.toString().trim()));
    readStream.on("error", () => {
      throw new Error("Cannot read file content of the file");
    });
  }

  async createEmptyFile(path) {
    try {
      await fs.writeFile(path, "", { flag: "wx" });
    } catch {
      throw new Error("Cannot create empty file.");
    }
  }

  async renameFile(pathToFile, newPath) {
    try {
      const pathToFolder = pathToFile
        .split(path.sep)
        .slice(0, -1)
        .join(path.sep);
      await fs.access(pathToFile);
      await fs.access(pathToFolder);
      await fs.rename(getPath(pathToFile), getPath(pathToFolder, newPath));
    } catch {
      throw new Error("Cannot rename file.");
    }
  }
}
