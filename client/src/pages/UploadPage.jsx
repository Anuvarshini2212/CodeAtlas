import { useState } from "react";
import API from "../api/axios";

const UploadPage = () => {
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      return alert("Please select ZIP file");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("repository", file);

      const { data } = await API.post(
        "/projects/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(data.message);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-4">
          Upload Repository
        </h1>

        <p className="text-slate-400 mb-6">
          Upload a GitHub repository ZIP file
        </p>

        <div className="border-2 border-dashed border-slate-700 rounded-2xl p-10 text-center">
          <input
            type="file"
            accept=".zip"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
            className="mb-4"
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
          >
            {loading
              ? "Uploading..."
              : "Upload ZIP"}
          </button>
        </div>

        {file && (
          <div className="mt-6 bg-slate-800 p-4 rounded-xl">
            <p className="font-medium">
              Selected File:
            </p>

            <p className="text-slate-400">
              {file.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;