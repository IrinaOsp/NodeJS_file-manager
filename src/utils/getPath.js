import path from "path";
import { cwd } from "process";

export const getPath = (newPath) => {
  return path.isAbsolute(newPath) ? newPath.trim() : path.join(cwd(), newPath);
};
