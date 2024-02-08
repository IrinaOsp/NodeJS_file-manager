const isValidFileName = (fileName) => {
  const fileNameRegex = /^[^\x00-\x1F\\/:*?"<>|']*$/;
  return fileNameRegex.test(fileName);
};

export default isValidFileName;
