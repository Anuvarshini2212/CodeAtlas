const Project = require("../models/Project");

const generateContent = require(
  "../services/ai/providers/groqProvider"
);

exports.getFileSummary = async (
  req,
  res
) => {
  try {
    const { id, fileName } =
      req.params;

    const project =
      await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
      });
    }

    const file =
      project.files.find(
        (f) =>
          f.fileName === fileName
      );

    if (!file) {
      return res.status(404).json({
        success: false,
      });
    }

    // Already generated

    if (
      file.summary &&
      file.summary.length > 0
    ) {
      return res.json({
        summary: file.summary,
      });
    }

    const prompt = `
Explain this source code.

Purpose

Main Functions

Technologies

Simple Summary

Code:

${file.content}
`;

    const summary =
      await generateContent(prompt);

    file.summary = summary;

    await project.save();

    res.json({
      summary,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
    });

  }
};