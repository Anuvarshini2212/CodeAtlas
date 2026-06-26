import { useState } from "react";
import {
  FaFolder,
  FaFolderOpen,
  FaFileCode,
  FaChevronRight,
  FaChevronDown,
} from "react-icons/fa";

const TreeNode = ({
  name,
  node,
  level = 0,
  onFileClick,
  selectedFile,
}) => {
  const isFile =
    node &&
    typeof node === "object" &&
    node.fileName;

  const [open, setOpen] =
    useState(true);

  // ---------- FILE ----------

  if (isFile) {
    return (
      <button
        onClick={() =>
          onFileClick(node)
        }
        className={`w-full flex items-center gap-3 py-2 px-3 rounded-lg transition text-sm

        ${
          selectedFile?.fileName ===
          node.fileName
            ? "bg-blue-600 text-white"
            : "hover:bg-slate-800 text-slate-300"
        }`}
        style={{
          paddingLeft:
            12 + level * 18,
        }}
      >
        <FaFileCode
          className="text-green-400 shrink-0"
        />

        <span className="truncate">
          {node.fileName}
        </span>
      </button>
    );
  }

  // ---------- FOLDER ----------

  return (
    <div>

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="w-full flex items-center gap-2 py-2 rounded-lg hover:bg-slate-800 transition"
        style={{
          paddingLeft:
            8 + level * 18,
        }}
      >

        {open ? (
          <FaChevronDown
            className="text-xs"
          />
        ) : (
          <FaChevronRight
            className="text-xs"
          />
        )}

        {open ? (
          <FaFolderOpen className="text-yellow-400" />
        ) : (
          <FaFolder className="text-yellow-400" />
        )}

        <span className="font-medium">
          {name}
        </span>

      </button>

      {open && (
        <div className="ml-5">
          {Object.entries(node).map(
            ([childName, childNode]) => (
              <TreeNode
                key={childName}
                name={childName}
                node={childNode}
                level={level + 1}
                onFileClick={onFileClick}
                selectedFile={selectedFile}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

const FileExplorer = ({
  tree,
  onFileClick,
  selectedFile,
}) => {
  return (
    <div className="space-y-1">

      {Object.entries(tree).map(
        ([name, node]) => (
          <TreeNode
            key={name}
            name={name}
            node={node}
            level={0}
            onFileClick={onFileClick}
            selectedFile={selectedFile}
          />
        )
      )}

    </div>
  );
};

export default FileExplorer;