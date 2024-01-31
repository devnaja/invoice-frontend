import axios from "axios";

import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const auth = async (params) => {
  try {
    const response = await axios.post("/auth/local", params);
    localStorage.setItem("token", response.data.jwt);
    localStorage.setItem("loggedInID", response.data.user.id);

    toast.success("Success Login", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    return response.data; // Return the response if needed
  } catch (error) {
    toast.error(
      "Your credentials are wrong. Please fill in the correct email and password.",
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      }
    );

    throw error; // Re-throw the error if needed
  }
};
