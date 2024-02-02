import path from "path";
import { fileURLToPath } from "url";
import os from "os";

const name = "--username";

const getCurrentPath = () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  console.log(`You are currently in ${__dirname}`);
};

export const startProject = async () => {
  const args = process.argv.slice(2);
  const userName = args
    .find((arg) => arg.includes(name))
    .slice(name.length + 1);
  console.log(`Welcome to the File Manager, ${userName}!`);
  const getStartingPath = () => {
    const homePath = os.homedir();
    console.log(`You are currently in ${homePath}`);
  };
  getStartingPath();
};
