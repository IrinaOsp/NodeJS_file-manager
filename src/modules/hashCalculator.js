import { readFile } from "fs/promises";
import { createHash } from "crypto";

const getHash = async (pathToFile) => {
  try {
    const data = await readFile(pathToFile, "utf-8");
    const hash = createHash("sha256").update(data).digest("hex");
    console.log(`Hash: ${hash}`);
  } catch {
    throw new Error("Cannot read file content of the file");
  }
};

export default getHash;
