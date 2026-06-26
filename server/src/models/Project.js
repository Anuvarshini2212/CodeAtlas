const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
    },

    language: {
      type: String,
    },

    relativePath: {
      type: String,
    },

    summary: {
      type: String,
    },

    content: {
      type: String,
    },
  },

  { _id: false }
);

const projectSchema =
  new mongoose.Schema(
    {
      projectName: {
        type: String,
        required: true,
      },
 overview: {
  type: String,
  default: "",
},

metrics: {
  totalFiles: Number,

  languages: Number,

  models: Number,

  routes: Number,

  controllers: Number,

  components: Number,

  jsFiles: Number,
},

      uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,

        ref: "User",
      },

      files: [fileSchema],
    },

   
    {
      timestamps: true,
    }

    
    
  );

module.exports = mongoose.model(
  "Project",
  projectSchema
);