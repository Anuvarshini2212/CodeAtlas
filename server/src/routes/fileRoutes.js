const express =
  require("express");

const {
  getFileSummary,
} = require(
  "../controllers/fileController"
);

const router =
  express.Router();

router.get(
  "/:id/:fileName",
  getFileSummary
);

module.exports = router;