const generateFileSummaryPrompt = (
  file
) => {
  return `
You are an expert software engineer.

Analyze this source code file and explain:

1. Purpose of the file
2. What the code does
3. Important functions/components
4. Technologies/frameworks used

File Name:
${file.name}

Language:
${file.language}

Code:
${file.content.slice(0, 3000)}
`;
};

module.exports = {
  generateFileSummaryPrompt,
};