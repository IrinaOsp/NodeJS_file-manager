import { createReadStream, createWriteStream } from "fs";
import fs from "fs/promises";
import path from "path";
import { getPath } from "../utils/getPath.js";
import { pipeline } from "stream/promises";

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

  async copyFile(pathToFile, pathToNewDir) {
    try {
      await fs.access(getPath(pathToFile));
      await fs.access(getPath(pathToNewDir));
      const fileName = path.basename(pathToFile);
      const readStream = createReadStream(pathToFile);
      const writeStream = createWriteStream(getPath(pathToNewDir, fileName));
      await pipeline(readStream, writeStream);
    } catch {
      throw new Error("Cannot copy file.");
    }
  }

  async moveFile(pathToFile, pathToNewDir) {
    try {
      await fs.access(getPath(pathToFile));
      await fs.access(getPath(pathToNewDir));
      const fileName = path.basename(pathToFile);
      const readStream = createReadStream(getPath(pathToFile));
      const writeStream = createWriteStream(getPath(pathToNewDir, fileName));
      await pipeline(readStream, writeStream);
      await fs.unlink(pathToFile);
    } catch (error) {
      console.log(error);
      throw new Error("Cannot move file.");
    }
  }
}
