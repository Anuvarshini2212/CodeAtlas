const express = require("express");

const upload = require(
  "../middleware/uploadMiddleware"
);
const {
  protect,
} = require(
  "../middleware/authMiddleware"
);
const {
  uploadRepository,
  getProjects,
  getProjectById,
  deleteProject,
} = require(
  "../controllers/projectController"
);

const router = express.Router();

// Upload Repository
router.post(
  "/upload",
  protect,
  upload.single("zip"),
  uploadRepository
);

router.get(
  "/",
  protect,
  getProjects
);

router.get(
  "/:id",
  protect,
  getProjectById
);

router.delete(
  "/:id",
  protect,
  deleteProject
);

module.exports = router;