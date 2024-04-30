// adminApi.js

import axios from 'axios';

const fetchAdminList = async (token) => {
  try {
    const response = await axios.get(`http://devjokesapi.codezlab.com/admin/list/admin?, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data; // Return response data
  } catch (error) {
    throw error; // Throw error for handling in the component
  }
};

export default fetchAdminList;
