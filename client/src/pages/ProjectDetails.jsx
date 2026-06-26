import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import { getProjectById } from "../services/projectService";
import { askRepository } from "../services/chatService";

import {
  Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useRef } from "react";

import { getFileSummary } from "../services/fileService";
import FileExplorer from "../components/FileExplorer";

import { buildFileTree } from "../utils/buildFileTree";


const ProjectDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [project, setProject] =
    useState(null);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [question, setQuestion] =
    useState("");

  const [loading, setLoading] =
    useState(false);

    const [summaryLoading, setSummaryLoading] =
  useState(false);

    const [chatHistory, setChatHistory] =
  useState([]);

const chatEndRef = useRef(null);
useEffect(() => {
  chatEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [chatHistory]);

  useEffect(() => {
    fetchProject();
  }, []);

const loadSummary = async (file) => {
  setSelectedFile(file);

  if (
    file.summary &&
    file.summary.length > 0
  ) {
    return;
  }

  try {
    setSummaryLoading(true);

    const data =
      await getFileSummary(
        project._id,
        file.fileName
      );

    setSelectedFile({
      ...file,
      summary: data.summary,
    });
  } catch (err) {
    console.log(err);
  } finally {
    setSummaryLoading(false);
  }
};

  const fetchProject = async () => {
    try {
      const data =
        await getProjectById(id);

      setProject(data.project);

      if (
        data.project.files.length > 0
      ) {
        setSelectedFile(
          data.project.files[0]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAsk = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const data =
        await askRepository(
          project._id,
          question
        );

      setChatHistory((prev) => [
  ...prev,
  {
    question,
    answer: data.answer,
  },
]);

setQuestion("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!project) {
    return (
      <div className="flex h-screen bg-slate-950 text-white">
        Loading...
      </div>
    );
  }
const totalFiles =
  project?.files?.length || 0;

const fileTree =
  buildFileTree(
    project.files
  ); 
  console.log(project.files);
console.log(
  JSON.stringify(fileTree, null, 2)
);

const languages =
  [
    ...new Set(
      project?.files?.map(
        (file) =>
          file.language
      )
    ),
  ];

const totalLanguages =
  languages.length;
  
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}

      <div className="w-80 border-r border-slate-800 p-4 overflow-y-auto">
        <button
          onClick={() =>
            navigate(-1)
          }
          className="inline-block mb-6 text-blue-400 hover:text-blue-300"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {project.projectName}
        </h2>


        <div className="mt-4">
          <FileExplorer
            tree={fileTree}
            onFileClick={loadSummary}
            selectedFile={selectedFile}
          />
        </div>
      </div>
      {/* Main Content */}

      <div className="flex-1 p-6 overflow-y-auto">

        <div className="mb-8">
  <h1 className="text-4xl font-bold">
    {project.projectName}
  </h1>

  <p className="text-slate-400 mt-2">
    AI-Powered Repository Intelligence Dashboard
  </p>
</div>
        {/* Project Overview */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

  <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
    <p className="text-slate-400 text-sm">
      Files
    </p>

    <h3 className="text-3xl font-bold">
      {totalFiles}
    </h3>
  </div>

  <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
    <p className="text-slate-400 text-sm">
      Languages
    </p>

    <h3 className="text-3xl font-bold">
      {totalLanguages}
    </h3>
  </div>

  <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
    <p className="text-slate-400 text-sm">
      Summaries
    </p>

    <h3 className="text-3xl font-bold">
      {totalFiles}
    </h3>
  </div>

  <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
    <p className="text-slate-400 text-sm">
      AI Powered
    </p>

    <h3 className="text-3xl font-bold">
      🤖
    </h3>
  </div>

</div>

<div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">

  <h2 className="text-2xl font-bold mb-4">
    📋 Project Overview
  </h2>

  <div className="whitespace-pre-wrap text-slate-300 leading-7 max-h-72 overflow-y-auto">
    {project.overview || "No overview available"}
  </div>

</div>
        {selectedFile && (
          <>
            {/* File Info */}

            <div className="mb-6">
              <h1 className="text-3xl font-bold">
                {
                  selectedFile.fileName
                }
              </h1>

              <p className="text-slate-400 mt-2">
                {
                  selectedFile.language
                }
              </p>
            </div>

            {/* AI Analysis */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">
                AI Analysis
              </h2>

              <div className="whitespace-pre-wrap text-slate-300 leading-7">
                {summaryLoading ? (
  <div className="text-blue-400">
    🤖 Generating AI summary...
  </div>
) : (
  selectedFile.summary ||
  "Click this file to generate an AI summary."
)}
              </div>
            </div>

            {/* Repository Chat */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
              <h2 className="text-2xl font-bold mb-2">
  🤖 Ask CodeAtlas
</h2>

<p className="text-slate-400 mb-4">
  Ask questions about architecture,
  authentication, APIs, business logic,
  components, and project structure.
</p>

<div className="flex flex-wrap gap-2 mb-4">

  {[
    "Explain authentication",
    "Explain database",
    "Explain architecture",
    "Explain API routes",
  ].map((q) => (

    <button
      key={q}
      onClick={() => setQuestion(q)}
      className="bg-slate-800 hover:bg-blue-600 px-3 py-2 rounded-full text-sm"
    >
      {q}
    </button>

  ))}

</div>

              <div className="flex gap-3">

  <input
    value={question}
    onChange={(e) =>
      setQuestion(e.target.value)
    }
    placeholder="Ask CodeAtlas anything..."
    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
  />

  <button
    onClick={handleAsk}
    className="bg-blue-600 hover:bg-blue-700 px-6 rounded-xl"
  >
    Ask
  </button>

</div>

              <div className="mt-6 space-y-4">
  {chatHistory.map(
    (chat, index) => (
      <div
        key={index}
        className="space-y-3"
      >
        <div className="bg-blue-600 p-4 rounded-xl">
          <p className="font-semibold">
            You
          </p>

          <p>
            {chat.question}
          </p>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          <p className="font-semibold text-green-400">
            CodeAtlas
          </p>

          <div className="whitespace-pre-wrap">
            {chat.answer}
          </div>
        </div>
      </div>
    )
  )}
  <div ref={chatEndRef}></div>
</div>
            </div>

            {/* Code Viewer */}

<div className="flex justify-between items-center bg-slate-900 border border-slate-800 px-6 py-4 rounded-t-2xl">

  <div>

    <h3 className="font-bold">
      {selectedFile.fileName}
    </h3>

    <p className="text-slate-400 text-sm">
      {selectedFile.language}
    </p>

  </div>

  <button
    onClick={() =>
      navigator.clipboard.writeText(selectedFile.content)
    }
    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
  >
    Copy Code
  </button>

</div>

            <div className="rounded-2xl overflow-hidden border border-slate-800">
              <SyntaxHighlighter
                language={
                  selectedFile.language?.toLowerCase() ||
                  "javascript"
                }
                style={oneDark}
                customStyle={{
                  margin: 0,
                  padding: "24px",
                }}
              >
                {
                  selectedFile.content
                }
              </SyntaxHighlighter>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;

