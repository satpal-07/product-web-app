import axios from 'axios';
import config from 'config';

/**
 * Calls Graph QL API using the query and returns the data returned by the API
 * @param {String} query
 * @returns {Object} Graph QL API response
 */
export default async (query) => {
  try {
    let data = [];
    const apiResponse = await axios.post(config.graphQlApi, { query });
    // extract the data when API is successful
    if (apiResponse.status === 200 && apiResponse.data.data) {
      data = apiResponse.data.data;
    }
    return data;
  } catch (error) {
    console.error('Error in GraphQL server: ' + error.message);
    throw new Error('Error in the Graph QL server');
  }
};
