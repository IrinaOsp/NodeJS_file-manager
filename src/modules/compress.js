import { createReadStream, createWriteStream } from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import { createBrotliCompress } from "zlib";
import { getPath } from "../utils/getPath.js";

const compressFile = async (pathToFile, pathToDestination) => {
  try {
    const fileName = path.basename(pathToFile).concat(".br");
    const readStream = createReadStream(pathToFile);
    const writeStream = createWriteStream(getPath(pathToDestination, fileName));
    const compressStream = createBrotliCompress();
    await pipeline(readStream, compressStream, writeStream);
  } catch (err) {
    console.log(err);
    throw new Error("Cannot compress file.");
  }
};

export default compressFile;
