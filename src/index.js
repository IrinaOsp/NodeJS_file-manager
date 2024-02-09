import FileManager from "./modules/fileManager.js";

const name = "--username";
const args = process.argv.slice(2);
const isUserNameProvided = args.some((arg) => arg.includes(name));
const userName = isUserNameProvided
  ? args.find((arg) => arg.includes(name)).slice(name.length + 1)
  : "Anonymous";

const fileManager = new FileManager(userName);

fileManager.startProject();
