const path = require("path");

const buildTree = (files, rootPath) => {
  return files.map((file) => ({
    name: file.name,
    relativePath: path.relative(
      rootPath,
      file.path
    ),
    size: file.size,
  }));
};

module.exports = buildTree;