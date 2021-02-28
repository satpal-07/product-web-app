import graphQlApi from './utils/graphql-api';

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

export default async () => {
  try {
    const response = await graphQlApi(getProductQuery());
    return response.productList;
  } catch (error) {
    console.error('Error in the get product list api: ' + error.message);
    throw new Error('Error in the get product list api');
  }
};
