import axios from "axios";
import Swal from "sweetalert2";
import React, { useState } from "react";

export const auth = async (params) => {
  try {
    const response = await axios.post("/auth/local", params);
    localStorage.setItem("token", response.data.jwt);
    localStorage.setItem("loggedInID", response.data.user.id);

    return response.data; // Return the response if needed
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
