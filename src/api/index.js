import axios from "axios";
import Swal from "sweetalert2";

let token = localStorage.getItem("token");

export const getAll = async (table, params) => {
  console.log("masuk", table);
  try {
    const response = await axios.get(`/${table}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Return the response if needed
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: error.response.statusText || "Error!",
      text: error.message || "Please request again",
      icon: "error",
    });
    console.log("An error occurred:", error.response);

    throw error; // Re-throw the error if needed
  }
};

export const getOne = async (table, id, params) => {
  console.log("masuk");
  try {
    const response = await axios.get(`/${table}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Return the response if needed
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
