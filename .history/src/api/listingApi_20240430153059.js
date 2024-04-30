// adminApi.js

import axios from 'axios';

const fetchAdminList = async (token,start ,itemsPerPage) => {
  try {
    const response = await axios.get(`http://devjokesapi.codezlab.com/admin/list/admin?start=${start}&perPage=${it}`, {
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
