import graphQlApi from './utils/graphql-api';

/**
 * Returns user info query
 * @param {String} userId
 * @returns {String} Graph QL query
 */
const getUserInfoQuery = (userId) => {
  return `{
    user(id: "${userId}") {
      id
      available_badges
      offers {
        type
        title
        id
      }
    }
  }`;
};

/**
 * Returns user info after getting it from the Graph QL API
 * @param {String} userId
 * @returns {Object} user info
 */
export default async (userId) => {
  try {
    const response = await graphQlApi(getUserInfoQuery(userId));
    return response.user;
  } catch (error) {
    console.error('Error in the get user info api: ' + error.message);
    throw new Error('Error in the get user info api');
  }
};
