import path from "path";
import { access, readdir } from "fs/promises";
import { getPath } from "../utils/getPath.js";

export default class FileSystem {
  constructor(homePath) {
    this.homePath = homePath;
    this.currentPath = homePath;
  }

  goUp() {
    if (this.currentPath === this.homePath) {
      throw new Error("Cannot go up from home directory");
    } else {
      this.currentPath = this.currentPath
        .split(path.sep)
        .slice(0, -1)
        .join(path.sep);
    }
  }

  async cd(path) {
    if (path === ".." || path === "../") {
      this.goUp();
    } else {
      try {
        await access(getPath(this.currentPath, path));
        this.currentPath = `${this.currentPath}\\${path}`;
      } catch {
        throw new Error("Cannot access directory");
      }
    }
  }

  async ls() {
    try {
      const files = await readdir(getPath(this.currentPath), {
        withFileTypes: true,
      }).then((files) => {
        return files.map((file) => ({
          name: file.name,
          type: file.isDirectory() ? "directory" : "file",
        }));
      });
      console.table(files, ["name", "type"]);
    } catch (err) {
      throw new Error("Cannot read files in the directory");
    }
  }
}
