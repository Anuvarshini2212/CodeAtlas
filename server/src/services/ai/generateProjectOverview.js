const generateContent = require(
  "./providers/groqProvider"
);

const generateProjectOverview =
  async (sourceFiles) => {
    const fileList =
      sourceFiles
        .slice(0, 30)
        .map(
          (file) =>
            `${file.name} (${file.language})`
        )
        .join("\n");

    const prompt = `
You are a senior software architect.

Analyze this repository.

FILES:
${fileList}

Return ONLY:

📌 PURPOSE (2-3 lines)

⚙️ MAIN FEATURES (4 bullet points max)

🏗 ARCHITECTURE (3-4 lines)

🛠 TECH STACK (short list)

📝 SUMMARY (2 lines)

Keep the total response under 250 words.
`;

    return await generateContent(
      prompt
    );
  };

module.exports =
  generateProjectOverview;