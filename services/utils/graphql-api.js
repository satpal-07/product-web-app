import axios from 'axios';
import config from 'config';

const graphQlApi = async (query) => {
  try {
    let data = [];
    const apiResponse = await axios.post(config.graphQlApi, { query });
    if(apiResponse.status === 200) {
      data = apiResponse.data.data
    }
    return data;
  } catch (error) {
    console.error('Error in GraphQL server: ' + error.message);
    throw new Error('Error in the Graph QL server')
  }
};

export default graphQlApi;