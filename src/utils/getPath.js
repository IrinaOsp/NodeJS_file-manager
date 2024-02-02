import path from "path";

export const getPath = (currentPath, newPath) => {
  return path.resolve(currentPath, newPath);
};
