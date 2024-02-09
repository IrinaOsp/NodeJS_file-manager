import { dirname } from "path";
import { access, readdir } from "fs/promises";
import { getPath } from "../utils/getPath.js";
import { chdir, cwd } from "process";

export default class FileSystem {
  constructor(homePath) {
    this.homePath = homePath;
    chdir(this.homePath);
    this.currentPath = cwd();
  }

  goUp() {
    try {
      this.currentPath = cwd();
      const upperDir = dirname(this.currentPath);
      if (upperDir === this.currentPath) {
        throw new Error("Cannot go up from root directory");
      }
      chdir(upperDir);
    } catch {
      throw new Error("Cannot go up from root directory");
    }
  }

  async cd(pathCommand) {
    if (pathCommand === ".." || pathCommand === "../") {
      this.goUp();
    } else {
      try {
        const newPath = getPath(pathCommand);
        await access(newPath);
        chdir(newPath);
        this.currentPath = cwd();
      } catch {
        throw new Error("Cannot access directory");
      }
    }
  }

  async ls() {
    try {
      const files = await readdir(cwd(), {
        withFileTypes: true,
      }).then((files) => {
        return files
          .map((file) => ({
            name: file.name,
            type: file.isFile() ? "file" : "directory",
          }))
          .sort(
            (a, b) =>
              a.name.localeCompare(b.name) && a.type.localeCompare(b.type)
          );
      });
      console.table(files, ["name", "type"]);
    } catch (err) {
      throw new Error("Cannot read files in the directory");
    }
  }
}
