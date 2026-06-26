const express = require(
  "express"
);

const router = express.Router();

const {
  getAllProjects,

  getSingleProject,
} = require(
  "../controllers/projectDashboardController"
);

router.get(
  "/",
  getAllProjects
);

router.get(
  "/:id",
  getSingleProject
);

module.exports = router;