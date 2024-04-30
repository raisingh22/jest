import axios from "axios";

const login = async (email, password) => {
  try {
    const response = await axios.post(
      ``,
      {
        email: email,
        password: password,
      }
    );

    return response.data; // Return response data
  } catch (error) {
    throw error; // Throw error for handling in the component
  }
};

export default login;
