// updateJokeApi.js
import axios from 'axios';

const updateJoke = async (token, jokeId, language) => {
  try {
    const response = await axios.put(
      'http://devjokesapi.codezlab.com/admin/update-joke',
      {
        id: jokeId,
        lang: language
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default updateJoke;
