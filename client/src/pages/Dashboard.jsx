import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import {
  getProjects,
  deleteProject,
} from "../services/projectService";

import { uploadRepository } from "../services/uploadService";
import {
  FaRobot,
  FaFolder,
  FaFolderOpen,
  FaUpload,
  FaHome,
  FaSignOutAlt,
  FaUserCircle,
  FaSearch,
  FaCloudUploadAlt,
  FaArrowRight,
  FaTrash,
} from "react-icons/fa";
const Dashboard = () => {
  const { user, logout } =
    useContext(AuthContext);

  const [projects, setProjects] =
    useState([]);

  const [selectedFile,
    setSelectedFile] =
    useState(null);

  const [uploading,
    setUploading] =
    useState(false);

  const [searchTerm,
    setSearchTerm] =
    useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects =
    async () => {
      try {
        const data =
          await getProjects();

        setProjects(
          data.projects
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleUpload =
    async () => {
      if (!selectedFile) {
        alert(
          "Please select a ZIP file"
        );

        return;
      }

      try {
        setUploading(true);

        await uploadRepository(
          selectedFile
        );

        await fetchProjects();

        setSelectedFile(null);

        alert(
          "Repository analyzed successfully"
        );
      } catch (error) {
        console.log(error);

        alert(
          "Upload failed"
        );
      } finally {
        setUploading(false);
      }
    };

  const handleDelete =
    async (projectId) => {
      const confirmDelete =
        window.confirm(
          "Delete this project?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteProject(
          projectId
        );

        await fetchProjects();
      } catch (error) {
        console.log(error);

        alert(
          "Failed to delete project"
        );
      }
    };

  const filteredProjects =
  projects.filter((project) =>
    project.projectName
      ?.toLowerCase()
      .includes(
        searchTerm
          .trim()
          .toLowerCase()
      )
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}

     <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 shadow-xl">

  <div className="px-8 py-4 flex items-center justify-between">

    {/* Logo */}

    <div className="flex items-center gap-4">

      <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg">

        <FaRobot className="text-3xl text-white"/>

      </div>

      <div>

        <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">

          CodeAtlas

        </h1>

        <p className="text-slate-400 text-sm">

          AI Codebase Intelligence Platform

        </p>

      </div>

    </div>

    {/* Navigation */}

    <div className="hidden lg:flex items-center gap-10 text-slate-300">

      <button
        onClick={() =>
          document
            .getElementById("dashboard")
            ?.scrollIntoView({
              behavior: "smooth",
            })
        }
        className="flex items-center gap-2 hover:text-blue-400 transition"
      >

        <FaHome />

        Dashboard

      </button>

      <button
        onClick={() =>
          document
            .getElementById("upload")
            ?.scrollIntoView({
              behavior: "smooth",
            })
        }
        className="flex items-center gap-2 hover:text-blue-400 transition"
      >

        <FaUpload />

        Upload

      </button>

      <button
        onClick={() =>
          document
            .getElementById("repositories")
            ?.scrollIntoView({
              behavior: "smooth",
            })
        }
        className="flex items-center gap-2 hover:text-blue-400 transition"
      >

        <FaFolderOpen />

        Repositories

      </button>

    </div>

    {/* User */}

    <div className="flex items-center gap-5">

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">

          <FaUserCircle className="text-2xl"/>

        </div>

        <div>

          <p className="text-xs text-slate-400">

            Welcome Back

          </p>

          <p className="font-bold">

            {user?.user?.name}

          </p>

        </div>

      </div>

      <button
        onClick={logout}
        className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-700 hover:scale-105 transition px-5 py-3 rounded-xl font-semibold shadow-lg"
      >

        <FaSignOutAlt />

        Logout

      </button>

    </div>

  </div>

</header>
      {/* Main */}

      <main className="p-8">
        {/* Hero */}

      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-12 mb-12">

  {/* Background Glow */}
  <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
  <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>

  <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">

    {/* LEFT SIDE */}

    <div>

      <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium">
        🚀 AI-Powered Repository Intelligence
      </span>

      <h1 className="mt-6 text-5xl lg:text-6xl font-black leading-tight">

        Understand

        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {" "}Any Codebase
        </span>

        <br />

        with AI in Seconds

      </h1>

      <p className="mt-8 text-lg text-slate-400 leading-8 max-w-xl">

        Upload repositories, generate intelligent project summaries,
        explore project architecture, and chat with your codebase using
        AI-powered insights.

      </p>

      {/* Buttons */}

      <div className="flex flex-wrap gap-4 mt-10">

        <button
          onClick={() =>
            document
              .getElementById("upload")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
          className="px-7 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition font-semibold shadow-lg"
        >
          🚀 Upload Repository
        </button>

        <button
          onClick={() =>
            document
              .getElementById("repositories")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
          className="px-7 py-4 rounded-xl border border-slate-700 hover:border-blue-500 hover:text-blue-400 transition"
        >
          📂 View Repositories
        </button>

      </div>

      {/* Stats */}

      <div className="flex gap-10 mt-12">

        <div>

          <h3 className="text-3xl font-bold">
            {projects.length}
          </h3>

          <p className="text-slate-400">
            Repositories
          </p>

        </div>

        <div>

          <h3 className="text-3xl font-bold">
            AI
          </h3>

          <p className="text-slate-400">
            Powered
          </p>

        </div>

        <div>

          <h3 className="text-3xl font-bold">
            24/7
          </h3>

          <p className="text-slate-400">
            Code Insights
          </p>

        </div>

      </div>

    </div>

   {/* RIGHT SIDE */}

<div className="hidden lg:flex justify-center">

  <div className="relative w-full max-w-md">

    {/* Glow */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>

    <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-2xl hover:scale-[1.02] transition-all duration-300">

      {/* Header */}

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold flex items-center gap-2">

          🤖 CodeAtlas

        </h2>

        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">

          AI Ready

        </span>

      </div>

      <p className="text-slate-400 mt-2">

        Everything you need to understand a repository.

      </p>

      {/* Features */}

      <div className="mt-8 space-y-5">

        <div className="flex items-center gap-4 bg-slate-800/50 rounded-xl p-4">

          <span className="text-2xl">📂</span>

          <div>

            <h3 className="font-semibold">
              Repository Upload
            </h3>

            <p className="text-sm text-slate-400">
              Upload GitHub ZIP repositories
            </p>

          </div>

        </div>

        <div className="flex items-center gap-4 bg-slate-800/50 rounded-xl p-4">

          <span className="text-2xl">📝</span>

          <div>

            <h3 className="font-semibold">
              AI Project Overview
            </h3>

            <p className="text-sm text-slate-400">
              Automatic repository documentation
            </p>

          </div>

        </div>

        <div className="flex items-center gap-4 bg-slate-800/50 rounded-xl p-4">

          <span className="text-2xl">💬</span>

          <div>

            <h3 className="font-semibold">
              Repository Chat
            </h3>

            <p className="text-sm text-slate-400">
              Ask questions about your codebase
            </p>

          </div>

        </div>

        <div className="flex items-center gap-4 bg-slate-800/50 rounded-xl p-4">

          <span className="text-2xl">🗂</span>

          <div>

            <h3 className="font-semibold">
              Interactive File Explorer
            </h3>

            <p className="text-sm text-slate-400">
              Browse project structure instantly
            </p>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>

  </div>

</section>

        {/* Upload */}

        <div
  id="upload"
  className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-10"
>

  <div className="flex items-center gap-3 mb-3">

    <FaUpload className="text-blue-400 text-3xl" />

    <h2 className="text-3xl font-bold">
      Upload Repository
    </h2>

  </div>

  <p className="text-slate-400 mb-6">
    Upload a GitHub repository ZIP file and let AI
    analyze its architecture, files, and code.
  </p>

  <input
    type="file"
    accept=".zip"
    onChange={(e) =>
      setSelectedFile(e.target.files[0])
    }
    className="block w-full mb-6 text-sm
      text-slate-300
      file:mr-4
      file:py-3
      file:px-5
      file:rounded-xl
      file:border-0
      file:bg-blue-600
      file:text-white
      hover:file:bg-blue-700"
  />

  <button
    onClick={handleUpload}
    disabled={uploading}
    className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold transition"
  >
    {uploading
      ? "Analyzing Repository..."
      : "Analyze Repository"}
  </button>

</div>

        {/* Search */}

     {/* Search */}

<div className="relative mb-10">
  <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />

  <input
    type="text"
    placeholder="Search repositories..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    className="w-full bg-slate-900 border border-slate-800 rounded-full pl-14 pr-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition"
  />
</div>

        {/* Projects */}

<div id="repositories">
  {/* Section Header */}

  <div className="flex justify-between items-center mb-8">

    <div>
      <h2 className="text-3xl font-bold">
        Your Repositories
      </h2>

      <p className="text-slate-400 mt-1">
        AI analyzed repositories
      </p>
    </div>

    <div className="bg-slate-900 border border-slate-800 px-5 py-2 rounded-full">
      <span className="text-blue-400 font-semibold">
        {filteredProjects.length}
      </span>

      <span className="text-slate-400 ml-2">
        Projects
      </span>
    </div>

  </div>

  {filteredProjects.length === 0 ? (

    <div className="bg-slate-900 border border-slate-800 rounded-3xl py-20 text-center">

      <FaRobot className="text-blue-500 text-6xl mx-auto mb-6" />

      <h2 className="text-3xl font-bold mb-3">
        No repositories yet
      </h2>

      <p className="text-slate-400 mb-8">
        Upload your first repository and let
        CodeAtlas analyze your code with AI.
      </p>

      <button
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl transition"
      >
        Upload Repository
      </button>

    </div>

  ) : (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

      {filteredProjects.map((project) => (

        <Link
          key={project._id}
          to={`/projects/${project._id}`}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-blue-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 block"
        >

          {/* Card Header */}

          <div className="flex justify-between items-start mb-5">

            <FaFolder className="text-blue-400 text-4xl" />

            <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
              AI Ready
            </span>

          </div>

          {/* Project Name */}

          <h3 className="text-2xl font-bold mb-3 break-words">
            {project.projectName}
          </h3>

          {/* Description */}

          <p className="text-slate-400 text-sm mb-5">
            AI generated repository analysis,
            code summaries and intelligent chat.
          </p>

          {/* Upload Date */}

          <div className="flex items-center justify-between mb-6">

            <div>

              <p className="text-xs text-slate-500">
                Uploaded
              </p>

              <p className="text-sm">
                {new Date(project.createdAt).toLocaleDateString()}
              </p>

            </div>

            <div className="text-right">

              <p className="text-xs text-slate-500">
                Status
              </p>

              <p className="text-green-400 text-sm">
                Completed
              </p>

            </div>

          </div>

          {/* Footer */}

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-2 text-blue-400 font-semibold">

              View Analysis

              <FaArrowRight />

            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleDelete(project._id);
              }}
              className="bg-red-500/20 hover:bg-red-600 hover:text-white text-red-400 p-3 rounded-xl transition"
            >
              <FaTrash />
            </button>

          </div>

        </Link>

      ))}

    </div>

  )}

  {/* Footer */}

 <footer className="border-t border-slate-800 mt-20 py-6 text-center text-slate-500 text-sm">
  © 2026 CodeAtlas • Built with{" "}
  <span className="text-red-500">♥</span> by{" "}
  <span className="text-white font-medium">Varshh</span>
</footer>
</div>

</main>
    </div>
  );
};

export default Dashboard;