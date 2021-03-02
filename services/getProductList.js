import graphQlApi from './utils/graphql-api';

/**
 * Returns product list query
 * @returns {String} Graph QL query
 */
const getProductQuery = () => {
  return `{
    productList {
      name
      id
      image_key
      price {
        current_price
        original_price
        currency_code
      }
      offer_ids
    }
  }`;
};

/**
 * Returns product list after getting it from the Graph QL API
 * @returns {Array} Product list
 */
export default async () => {
  try {
    const response = await graphQlApi(getProductQuery());
    return response.productList;
  } catch (error) {
    console.error('Error in the get product list api: ' + error.message);
    throw new Error('Error in the get product list api');
  }
};
