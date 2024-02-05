import { createReadStream } from "fs";
import { pipeline } from "stream/promises";

export default class OperationSystem {
  readFile(path) {
    const readStream = createReadStream(path);
    readStream.on("data", (data) => console.log(data.toString().trim()));
    readStream.on("error", () => {
      throw new Error("Cannot read file content of the file");
    });
  }
}
