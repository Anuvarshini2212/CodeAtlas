const fs = require("fs");

const isSourceFile = require(
  "./sourceFileFilter"
);

const detectLanguage = require(
  "./detectLanguage"
);

const readSourceFiles = (files) => {
  const sourceFiles = [];

  for (const file of files) {
    if (!isSourceFile(file.path)) {
      continue;
    }

    try {
      const content = fs.readFileSync(
        file.path,
        "utf-8"
      );

      sourceFiles.push({
        name: file.name,
        path: file.path,
        relativePath: file.relativePath,
        size: file.size,
        language: detectLanguage(
          file.path
        ),
        content,
      });
    } catch (error) {
      console.log(
        "Failed to read:",
        file.path
      );
    }
  }

  return sourceFiles;
};

module.exports = readSourceFiles;