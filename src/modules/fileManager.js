import os from "os";
import readline from "readline";
import FileSystem from "./fileSystem.js";

export default class FileManager {
  constructor(username) {
    this.username = username;
    this.homePath = os.homedir();
    this.fileSystem = new FileSystem(this.homePath);
  }

  startProject() {
    console.log(`Welcome to the File Manager, ${this.username}!`);
    this.printCurrentPath();
    this.handleUserInput();
  }

  handleUserInput() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on("line", async (input) => {
      if (input === ".exit") {
        rl.close();
      } else {
        await this.executeCommand(input);
      }
    });

    rl.on("close", () => {
      this.onProgramExit();
    });
  }

  async executeCommand(input) {
    try {
      const [command, ...args] = input.split(" ");

      switch (command) {
        case "up":
          this.fileSystem.goUp();
          break;
        case "cd":
          await this.fileSystem.cd(args[0]);
          break;
        case "ls":
          await this.fileSystem.ls();
      }
    } catch (err) {
      console.log("Operation failed. ", err.message);
    }

    this.printCurrentPath();
  }

  printCurrentPath() {
    const currentPath = this.fileSystem.currentPath;
    console.log(`You are currently in ${currentPath}`);
  }

  onProgramExit() {
    console.log(`Thank you for using File Manager, ${this.username}, goodbye!`);
    process.exit(0);
  }
}
