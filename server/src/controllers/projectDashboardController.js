const Project = require(
  "../models/Project"
);

exports.getAllProjects =
  async (req, res) => {
    try {
      const projects =
        await Project.find()
          .sort({
            createdAt: -1,
          })
          .select(
            "projectName createdAt"
          );

      res.status(200).json({
        success: true,

        count: projects.length,

        projects,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message:
          "Failed to fetch projects",

        error: error.message,
      });
    }
  };

exports.getSingleProject =
  async (req, res) => {
    try {
      const project =
        await Project.findById(
          req.params.id
        );

      if (!project) {
        return res.status(404).json({
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
      res.status(500).json({
        success: false,

        message:
          "Failed to fetch project",

        error: error.message,
      });
    }
  };