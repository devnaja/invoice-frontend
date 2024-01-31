import axios from "axios";
import Swal from "sweetalert2";

let token = localStorage.getItem("token");

export const getAll = async (params) => {
  try {
    const response = await axios
      .get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response; // Return the response if needed
      });
  } catch (error) {
    Swal.fire({
      title: error.response.statusText,
      text: error.message,
      icon: "error",
    });

    throw error; // Re-throw the error if needed
  }
};

export const getOne = async (id, params) => {
  try {
    const response = await axios
      .get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {});
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Your credentials are wrong. Please fill in the correct email and password.",
      icon: "error",
    });

    throw error; // Re-throw the error if needed
  }
};
