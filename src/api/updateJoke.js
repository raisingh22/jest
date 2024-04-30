// updateJokeApi.js
import axios from "axios";

const updateJoke = async (token, jokeId, description) => {
  try {
    const response = await axios.put(
      "http://devjokesapi.codezlab.com/admin/update-joke",
      {
        id: jokeId,
        description: description, // Update only the description
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default updateJoke;
