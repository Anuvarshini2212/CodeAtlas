const fs = require("fs");
const path = require("path");

const shouldIgnore = require("./ignoreRules");

const traverseFiles = (
  dirPath,
  rootPath = dirPath,
  fileList = []
) => {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    if (shouldIgnore(file)) {
      continue;
    }

    const fullPath = path.join(
      dirPath,
      file
    );

    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      traverseFiles(
        fullPath,
        rootPath,
        fileList
      );
    } else {
      fileList.push({
        name: file,
        path: fullPath,
        relativePath: path.relative(
          rootPath,
          fullPath
        ),
        size: stats.size,
      });
    }
  }

  return fileList;
};

module.exports = traverseFiles;