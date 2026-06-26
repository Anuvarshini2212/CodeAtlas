import axios from "axios";

const API =
  "http://localhost:5000/api/projects/upload";

export const uploadRepository =
  async (file) => {

    const formData =
      new FormData();

    formData.append(
      "zip",
      file
    );

    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(
        API,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };