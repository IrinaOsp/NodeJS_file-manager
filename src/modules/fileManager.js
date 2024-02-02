import os from "os";

export default class FileManager {
  constructor(username) {
    this.username = username;
    this.currentPath = os.homedir();
  }

  startProject() {
    console.log(`Welcome to the File Manager, ${this.username}!`);
    this.printCurrentPath();
  }

  printCurrentPath() {
    console.log(`You are currently in ${this.currentPath}`);
  }
}
