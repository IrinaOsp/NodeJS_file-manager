import os from "os";
import readline from "readline";
import FileSystem from "./fileSystem.js";
import FilesOperations from "./filesOperations.js";
import { getPath } from "../utils/getPath.js";
import OperationSystem from "./os.js";
import getHash from "./hashCalculator.js";
import compressFile from "./compress.js";
import decompressFile from "./decompress.js";
import { cwd } from "process";
import checkArgs from "../utils/checkArgs.js";

export default class FileManager {
  constructor(username) {
    this.username = username;
    this.homePath = os.homedir();
    this.fileSystem = new FileSystem(this.homePath);
    this.filesOperations = new FilesOperations();
    this.os = new OperationSystem();
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
      const [command, ...initialArgs] = input.split(" ");
      const args = checkArgs(initialArgs);
      if (args.length > 2) {
        throw new Error("Too many arguments or incorrect path");
      }

      switch (command) {
        case "up":
          this.fileSystem.goUp();
          break;
        case "cd":
          await this.fileSystem.cd(args[0]);
          break;
        case "ls":
          await this.fileSystem.ls();
          break;
        case "cat":
          await this.filesOperations.readFile(getPath(args[0]));
          break;
        case "add":
          await this.filesOperations.createEmptyFile(getPath(args[0]));
          break;
        case "rn":
          await this.filesOperations.renameFile(args[0], args[1]);
          break;
        case "cp":
          await this.filesOperations.copyFile(args[0], args[1]);
          break;
        case "mv":
          await this.filesOperations.moveFile(args[0], args[1]);
          break;
        case "rm":
          await this.filesOperations.deleteFile(getPath(args[0]));
          break;
        case "os":
          this.os.getOSInfo(args[0]);
          break;
        case "hash":
          await getHash(getPath(args[0]));
          break;
        case "compress":
          await compressFile(getPath(args[0]), getPath(args[1]));
          break;
        case "decompress":
          await decompressFile(getPath(args[0]), getPath(args[1]));
          break;
        default:
          console.log("Invalid input.");
      }
    } catch (err) {
      console.log("Operation failed. ", err.message);
    }

    this.printCurrentPath();
  }

  printCurrentPath() {
    console.log(`You are currently in ${cwd()}`);
  }

  onProgramExit() {
    console.log(`Thank you for using File Manager, ${this.username}, goodbye!`);
    process.exit(0);
  }
}
