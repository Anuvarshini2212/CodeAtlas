const Project = require(
  "../models/Project"
);

const Chunk = require(
  "../models/Chunk"
);

const extractZip = require(
  "../services/parser/extractZip"
);

const traverseFiles = require(
  "../services/parser/traverseFiles"
);

const readSourceFiles = require(
  "../services/parser/readSourceFiles"
);

const analyzeRepository = require(
  "../services/ai/analyzeRepository"
);

const saveChunks = require(
  "../services/rag/chunkRepository"
);

const generateProjectOverview =
require(
  "../services/ai/generateProjectOverview"
);
// ======================================
// Upload Repository
// ======================================

exports.uploadRepository = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No ZIP file uploaded",
      });
    }

    // ZIP file path
    const zipFilePath =
      req.file.path;

    // Extract ZIP
    const extractedPath =
      await extractZip(
        zipFilePath
      );

    // Traverse files
    const files =
      traverseFiles(
        extractedPath
      );

    // Read source files
    const sourceFiles =
      readSourceFiles(files);


      const metrics = {
  totalFiles: sourceFiles.length,

  languages: [
    ...new Set(
      sourceFiles.map(
        file => file.language
      )
    ),
  ].length,

  models:
    sourceFiles.filter(file =>
      file.relativePath
        .toLowerCase()
        .includes("models")
    ).length,

  routes:
    sourceFiles.filter(file =>
      file.relativePath
        .toLowerCase()
        .includes("routes")
    ).length,

  controllers:
    sourceFiles.filter(file =>
      file.relativePath
        .toLowerCase()
        .includes("controllers")
    ).length,

  components:
    sourceFiles.filter(file =>
      file.relativePath
        .toLowerCase()
        .includes("components")
    ).length,

  jsFiles:
    sourceFiles.filter(file =>
      file.language ===
      "JavaScript"
    ).length,
};


  // Generate only project overview

const overview =
  await generateProjectOverview(
    sourceFiles
  );

  

    // Format files
    const formattedFiles =
  sourceFiles.map(
    (file) => ({
      fileName: file.name,

      language: file.language,

      relativePath:
        file.relativePath,

      content: file.content,

      summary: "",
    })
  );

    // Save Project
   const newProject =
await Project.create({

projectName:
req.file.originalname,

overview,

metrics,

uploadedBy: req.user._id,

files:
formattedFiles,

});
    // Save Chunks
    await saveChunks(
      newProject._id,
      sourceFiles
    );

    res.status(200).json({
      success: true,

      message:
        "Repository analyzed successfully",

      totalFiles:
        files.length,

      sourceFilesCount:
        sourceFiles.length,

      project:
        newProject,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

// ======================================
// Get All Projects
// ======================================

exports.getProjects =
  async (req, res) => {
    try {
      const projects =
await Project.find({
uploadedBy: req.user._id,
})
.sort({
createdAt:-1
});
      res.status(200).json({
        success: true,
        count:
          projects.length,
        projects,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ======================================
// Get Single Project
// ======================================

exports.getProjectById =
  async (req, res) => {
    try {
      const { id } = req.params;

const project =
await Project.findOne({
  _id: id,
  uploadedBy: req.user._id,
});

      if (!project) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Project not found",
          });
      }

      res.status(200).json({
        success: true,
        project,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ======================================
// Delete Project
// ======================================

exports.deleteProject =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const project =
        await Project.findById(
          id
        );

      if (!project) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Project not found",
          });
      }

      await Project.findOneAndDelete({
_id:id,
uploadedBy:req.user._id,
});

      await Chunk.deleteMany({
        projectId: id,
      });

      res.status(200).json({
        success: true,
        message:
          "Project deleted successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };