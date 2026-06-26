const path = require("path");

const extensionMap = {
  ".js": "JavaScript",
  ".jsx": "React JSX",
  ".ts": "TypeScript",
  ".tsx": "React TSX",
  ".py": "Python",
  ".java": "Java",
  ".html": "HTML",
  ".css": "CSS",
  ".json": "JSON",
  ".md": "Markdown",
};

const detectLanguage = (filePath) => {
  const ext = path.extname(filePath);

  return extensionMap[ext] || "Unknown";
};

module.exports = detectLanguage;