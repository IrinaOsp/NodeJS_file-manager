import { createReadStream } from "fs";
import fs from "fs/promises";

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
}
