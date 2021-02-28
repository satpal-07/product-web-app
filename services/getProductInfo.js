import graphQlApi from './utils/graphql-api';

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

export default async (productId) => {
  try {
    const response = await graphQlApi(getProductInfoQuery(productId));
    return response.product;
  } catch (error) {
    console.error('Error in the get product info api: ' + error.message);
    throw new Error('Error in the get product info api');
  }
};
