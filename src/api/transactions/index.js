import axios from "axios";
import Swal from "sweetalert2";

let token = localStorage.getItem("token");

export const getAll = async (params) => {
  try {
    const res = await axios
      .get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("response", response);
        return response.data.data.map((data, i) => ({
          id: data.id,
          attributes: data.attributes,
        }));
      });

    console.log("responsedsa", res);
    return res;
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
      .get(`/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response", response);
        return response; // Return the response if needed
      });
  } catch (error) {
    Swal.fire({
      title: error.response.statusText,
      text: error.message,
      icon: "error",
    });
    console.log("An error occurred:", error.response);

    throw error; // Re-throw the error if needed
  }
};
