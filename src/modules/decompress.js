import { createReadStream, createWriteStream } from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import { createBrotliDecompress } from "zlib";
import { getPath } from "../utils/getPath.js";

const decompressFile = async (pathToFile, pathToDestination) => {
  try {
    const compressedName = path.basename(pathToFile);
    if (compressedName.lastIndexOf(".br") === -1) {
      throw new Error("Cannot decompress file.");
    }
    const fileName = compressedName.slice(0, compressedName.lastIndexOf(".br"));
    const fileNameWithExtension =
      fileName.lastIndexOf(".") !== -1 ? fileName : fileName.concat(".txt");
    const readStream = createReadStream(pathToFile);
    const writeStream = createWriteStream(
      getPath(pathToDestination, fileNameWithExtension)
    );
    const decompressStream = createBrotliDecompress();
    await pipeline(readStream, decompressStream, writeStream);
  } catch (err) {
    console.log(err);
    throw new Error("Cannot compress file.");
  }
};

export default decompressFile;
