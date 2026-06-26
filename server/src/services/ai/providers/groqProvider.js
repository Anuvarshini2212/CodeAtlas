const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateContent = async (
  prompt
) => {
  try {
    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        model: "llama-3.1-8b-instant",
      });

    return completion.choices[0]
      .message.content;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

module.exports = generateContent;