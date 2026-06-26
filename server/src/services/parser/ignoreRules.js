const ignoredFolders = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  "coverage",
];

const ignoredFiles = [
  ".DS_Store",
  "package-lock.json",
  "yarn.lock",
];

const shouldIgnore = (name) => {
  return (
    ignoredFolders.includes(name) ||
    ignoredFiles.includes(name)
  );
};

module.exports = shouldIgnore;