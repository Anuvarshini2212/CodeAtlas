import axios from "axios";

const API =
  "http://localhost:5000/api/projects";

const getConfig = () => {
  const token =
    localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProjects =
  async () => {
    const response =
      await axios.get(
        API,
        getConfig()
      );

    return response.data;
  };

export const getProjectById =
  async (id) => {
    const response =
      await axios.get(
        `${API}/${id}`,
        getConfig()
      );

    return response.data;
  };

export const deleteProject =
  async (id) => {
    const response =
      await axios.delete(
        `${API}/${id}`,
        getConfig()
      );

    return response.data;
  };