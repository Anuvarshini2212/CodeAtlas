const mongoose = require("mongoose");

const chunkSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    fileName: {
      type: String,
      required: true,
      relativepath: true,
    },

    content: {
      type: String,
      required: true,
    },

    chunkIndex: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
    }
);

module.exports =
  mongoose.model(
    "Chunk",
    chunkSchema
  );