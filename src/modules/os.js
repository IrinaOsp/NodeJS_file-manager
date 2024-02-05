import os from "os";

export default class OperationSystem {
  constructor() {}
  getOSInfo(arg) {
    switch (arg) {
      case "--EOL":
        console.log(`default system End-Of-Line: ${JSON.stringify(os.EOL)}`);
        break;
      case "--cpus":
        this.getCPUsInfo();
        break;
      case "--homedir":
        console.log(`home directory: ${os.homedir()}`);
        break;
      case "--username":
        console.log(`username: ${os.userInfo().username}`);
        break;
      case "--architecture":
        console.log(`architecture: ${os.arch()}`);
        break;
    }
  }

  getCPUsInfo() {
    const data = os.cpus().map((cpu) => {
      return { model: cpu.model.trim(), speed: cpu.speed };
    });
    console.log(`Overall amount of CPUs: ${JSON.stringify(os.cpus().length)}`);
    console.table(data, ["model", "speed"]);
  }
}
