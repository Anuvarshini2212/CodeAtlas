const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generateContent = async (prompt) => {
  try {
    const result =
      await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.log(
      "========== GEMINI ERROR =========="
    );

    console.log(error);

    console.log(
      "=================================="
    );

    throw error;
  }
};

module.exports = generateContent;