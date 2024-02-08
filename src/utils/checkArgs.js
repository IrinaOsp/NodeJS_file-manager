const checkArgs = (args) => {
  if (args.join(" ").includes('"')) {
    return args
      .join(" ")
      .split('" ')
      .map((arg) => arg.replace(/"/g, ""));
  } else {
    return args;
  }
};

export default checkArgs;
