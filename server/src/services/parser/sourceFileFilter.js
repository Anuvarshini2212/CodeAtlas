const allowedExtensions = [
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".py",
  ".java",
  ".json",
  ".html",
  ".css",
  ".md",
];

const isSourceFile = (filePath) => {
  return allowedExtensions.some((ext) =>
    filePath.endsWith(ext)
  );
};

module.exports = isSourceFile;