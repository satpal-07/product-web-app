import graphQlApi from './utils/graphql-api';

/**
 * Returns product info query
 * @param {String} productId
 * @returns {String} Graph QL query
 */
const getProductInfoQuery = (productId) => {
  return `{
    product(id: "${productId}") {
      id
      name
      image_key
      offer_ids
      information {
        section_title
        section_text
      }
      price{
        currency_code
        current_price
        original_price
      }
    }
  }`;
};

/**
 * Returns product info after getting it from the Graph QL API
 * @param {String} productId
 * @returns {Object} Product info
 */
export default async (productId) => {
  try {
    const response = await graphQlApi(getProductInfoQuery(productId));
    return response.product;
  } catch (error) {
    console.error('Error in the get product info api: ' + error.message);
    throw new Error('Error in the get product info api');
  }
};
