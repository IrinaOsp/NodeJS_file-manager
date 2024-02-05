import { createReadStream, createWriteStream } from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import { createBrotliDecompress } from "zlib";
import { getPath } from "../utils/getPath.js";

const decompressFile = async (pathToFile, pathToDestination) => {
  try {
    const compressedName = path.basename(pathToFile);
    const newName = path.basename(pathToDestination);
    if (path.extname(compressedName) !== ".br") {
      throw new Error("Enter compressed file name with extension .br");
    }
    if (path.extname(newName) === "") {
      throw new Error("Enter file name with extension");
    }
    const readStream = createReadStream(pathToFile);
    const writeStream = createWriteStream(getPath(pathToDestination));
    const decompressStream = createBrotliDecompress();
    await pipeline(readStream, decompressStream, writeStream);
  } catch (err) {
    throw new Error("Cannot compress file. ", err.toString());
  }
};

export default decompressFile;
