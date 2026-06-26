const Chunk = require(
  "../models/Chunk"
);

const generateContent = require(
  "../services/ai/providers/groqProvider"
);

exports.askRepository =
  async (req, res) => {
    try {
      const {
        projectId,
        question,
      } = req.body;

     const chunks =
  await Chunk.find({
    projectId,
  });

const relevantChunks =
  chunks.filter((chunk) =>
    chunk.content
      .toLowerCase()
      .includes(
        question
          .toLowerCase()
          .split(" ")[0]
      )
  );

const context =
  (relevantChunks.length
    ? relevantChunks
    : chunks.slice(0, 10))
    .map(
      (chunk) =>
        chunk.content
    )
    .join("\n\n");

      const prompt = `
You are an expert software engineer.

Repository Context:

${context}

Question:
${question}

Answer clearly and simply.
`;

      const answer =
        await generateContent(
          prompt
        );

      res.json({
        success: true,
        answer,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };