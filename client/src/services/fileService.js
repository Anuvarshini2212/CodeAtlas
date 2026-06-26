import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getFileSummary = async (
  projectId,
  fileName
) => {
  const response = await API.get(
    `/files/${projectId}/${encodeURIComponent(fileName)}`
  );

  return response.data;
};