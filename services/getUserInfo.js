import graphQlApi from './utils/graphql-api';

const getUserInfoQuery = userId => {
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

export default async (userId) => {
  try {
    const response = await graphQlApi(getUserInfoQuery(userId));
    return response.user;
  } catch (error) {
    console.error('Error in the get user info api: ' + error.message);
    throw new Error('Error in the get user info api');
  }
};
