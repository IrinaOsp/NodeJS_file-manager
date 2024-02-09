import { createReadStream, createWriteStream } from "fs";
import fs from "fs/promises";
import path from "path";
import { getPath } from "../utils/getPath.js";
import { pipeline } from "stream/promises";
import isValidFileName from "../utils/validateFileName.js";

export default class FilesOperations {
  async readFile(pathToFile) {
    try {
      const readStream = createReadStream(pathToFile);
      readStream.on("data", (data) => console.log(data.toString().trim()));
    } catch {
      throw new Error("Cannot read file content of the file");
    }
  }

  async createEmptyFile(fileName) {
    try {
      await fs.writeFile(fileName, "", { flag: "wx" });
    } catch {
      throw new Error("Cannot create empty file.");
    }
  }

  async renameFile(pathToFile, newFileName) {
    try {
      await fs.access(pathToFile);
      console.log(isValidFileName(newFileName));
      if (!isValidFileName(newFileName)) {
        throw new Error("Enter valid file name");
      }
      await fs.rename(
        getPath(pathToFile),
        path.join(getPath(path.dirname(pathToFile)), newFileName)
      );
    } catch (err) {
      throw new Error(err.message || "Cannot rename file.");
    }
  }

  async copyFile(pathToFile, pathToNewDir) {
    try {
      await fs.access(getPath(pathToFile));
      await fs.access(getPath(pathToNewDir));
      const fileName = path.basename(pathToFile);
      const readStream = createReadStream(pathToFile);
      const writeStream = createWriteStream(
        path.join(getPath(pathToNewDir), fileName)
      );
      await pipeline(readStream, writeStream);
    } catch {
      throw new Error("Cannot copy file.");
    }
  }

  async moveFile(pathToFile, pathToNewDir) {
    try {
      await this.copyFile(pathToFile, pathToNewDir);
      await this.deleteFile(pathToFile);
    } catch (error) {
      throw new Error("Cannot move file.");
    }
  }

  async deleteFile(pathToFile) {
    try {
      await fs.access(getPath(pathToFile));
      await fs.unlink(getPath(pathToFile));
    } catch {
      throw new Error("Cannot delete file.");
    }
  }
}
