const generateContent = require(
  "./providers/groqProvider"
);

const analyzeRepository = async (
  sourceFiles
) => {
  const summaries = [];

  for (const file of sourceFiles) {
    try {
      console.log(
        `Analyzing: ${file.name}`
      );

      // Skip extremely large files
      if (
        file.content.length > 10000
      ) {
        summaries.push({
          fileName: file.name,
          language: file.language,
          summary:
            "File is too large to analyze within current AI limits.",
        });

        continue;
      }

      const prompt = `
You are a senior software engineer and technical mentor.

Analyze this source code file and explain it in a way that is easy for students and developers to understand.

Return the response in EXACTLY this format:

📌 WHAT IS THIS FILE?

Explain the purpose of this file in simple language.

----------------------------------

⚙️ WHAT DOES IT DO?

Explain the main functionality and responsibilities of the file.

----------------------------------

🔄 HOW DOES IT WORK?

Explain the important logic step-by-step.

Mention important functions, components, API calls, state management, loops, conditions, hooks, etc.

----------------------------------

🏗 ROLE IN THE PROJECT

Explain how this file fits into the overall repository architecture and which other files it is likely connected to.

----------------------------------

🛠 TECHNOLOGIES USED

List frameworks, libraries, APIs, and concepts used.

----------------------------------

💡 KEY TAKEAWAYS

Give 3-5 important points a developer should understand after reading this file.

----------------------------------

📝 SIMPLE SUMMARY

Explain this file in 2-3 easy sentences that even a beginner can understand.

FILE NAME:
${file.name}

LANGUAGE:
${file.language}

CODE:
${file.content.slice(0, 800
  
)}
`;

      const aiResponse =
        await generateContent(
          prompt
        );

      summaries.push({
        fileName: file.name,
        language: file.language,
        summary: aiResponse,
      });

      // Wait 1 second between requests
      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            200
          )
      );
    } catch (error) {
      console.log(
        "========== AI ERROR =========="
      );

      console.log(
        error.message
      );

      console.log(
        "================================"
      );

      summaries.push({
        fileName: file.name,
        language: file.language,
        error:
          error.message,
      });

      // Wait before continuing
      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            100
          )
      );
    }
  }

  return summaries;
};

module.exports =
  analyzeRepository;