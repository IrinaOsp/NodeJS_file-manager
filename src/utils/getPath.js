import path from "path";
import { cwd } from "process";

export const getPath = (newPath) => {
  console.log("newPath", newPath);
  console.log(path.isAbsolute(newPath));
  return path.isAbsolute(newPath) ? newPath.trim() : path.join(cwd(), newPath);
};
