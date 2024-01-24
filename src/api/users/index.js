import axios from "axios";
import Swal from "sweetalert2";

let token = localStorage.getItem("token");

export const getAll = async (params) => {
  console.log("masuk");
  try {
    const response = await axios
      .get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response", response);
        return response; // Return the response if needed
      });
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: error.response.statusText,
      text: error.message,
      icon: "error",
    });
    console.log("An error occurred:", error.response);

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
      .then((response) => {
        console.log("response", response);
      });
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Your credentials are wrong. Please fill in the correct email and password.",
      icon: "error",
    });
    console.log("An error occurred:", error.response);

    throw error; // Re-throw the error if needed
  }
};
