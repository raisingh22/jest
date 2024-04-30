// adminApi.js

import axios from 'axios';

const fetchAdminList = async () => {
  try {
    const response = await axios.get('http://devjokesapi.codezlab.com/admin/list/admin', {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcmppbmRlckBnbWFpbC5jb20iLCJpZCI6IjY2MmY2MDM1Nzg2NjQzMjViYWYyOTM5MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNDM4NDI0NSwiZXhwIjoxNzE0NDcwNjQ1fQ.sXjjFY7Lsn3_MJzjnDs0aNRcmFd92m5LaAJiZWMGqjA'
      }
    });
    
    return response.data; // Return response data
  } catch (error) {
    throw error; // Throw error for handling in the component
  }
};

export default fetchAdminList;
