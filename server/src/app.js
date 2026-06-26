const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const projectDashboardRoutes =
  require(
    "./routes/projectDashboardRoutes"
  );
  const chatRoutes =
require("./routes/chatRoutes");
const fileRoutes =
require("./routes/fileRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use(
  "/api/projects",
  projectDashboardRoutes
);
app.use(
  "/api/chat",
  chatRoutes
);

app.use(
"/api/files",
fileRoutes
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CodeAtlas API Running",
  });
});

module.exports = app;