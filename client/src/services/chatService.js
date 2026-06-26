import axios from "axios";

const API =
  "http://localhost:5000/api/chat";

export const askRepository =
  async (
    projectId,
    question
  ) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(
        `${API}/ask`,
        {
          projectId,
          question,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };