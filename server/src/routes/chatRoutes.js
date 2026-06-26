const express =
  require("express");

const {
  askRepository,
} = require(
  "../controllers/chatController"
);

const router =
  express.Router();

router.post(
  "/ask",
  askRepository
);

module.exports = router;