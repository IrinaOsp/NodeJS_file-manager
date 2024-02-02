import os from "os";
import readline from "readline";

export default class FileManager {
  constructor(username) {
    this.username = username;
    this.currentPath = os.homedir();
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

    rl.on("line", (input) => {
      console.log(`You entered: ${input}`);
      if (input === ".exit") {
        rl.close();
      }
    });

    rl.on("close", () => {
      this.onProgramExit();
    });
  }

  printCurrentPath() {
    console.log(`You are currently in ${this.currentPath}`);
  }

  onProgramExit() {
    console.log(`Thank you for using File Manager, ${this.username}, goodbye!`);
    process.exit(0);
  }
}
