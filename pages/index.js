import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import getProductList from '../services/getProductList';
import getUserInfo from '../services/getUserInfo';
import ProductList from '../components/ProductList';
import SelectUser from '../components/SelectUser';
import { useRouter } from 'next/router';
import Constants from '../contants';

/**
 * Adds badges to the product list provided
 * @param {Array} productList
 * @param {Array} availableBadges
 * @returns {Array} product list
 */
const addBadgesToProductList = (productList, availableBadges) => {
  try {
    for (const product of productList) {
      product.associatedBadge = getAssociatedBadge(product, availableBadges);
    }
  } catch (error) {
    console.error(
      'Error while adding badges to the product list: ' + error.message
    );
  }
  return productList;
};

/**
 * Returns badges associated to the product
 * @param {Object} product
 * @param {Array} availableBadges
 * @returns {Object} associated badges
 */
const getAssociatedBadge = (product, availableBadges) => {
  let associatedBadge = null;
  for (const badge of availableBadges) {
    if (associatedBadge) break;
    // only check the badge id if its offer is offered to user and badge is available to user
    if (badge.isBadgeApplicable)
      for (const type of badge.types) {
        if (product.offer_ids.indexOf(type.id) !== -1) {
          associatedBadge = badge;
          break;
        }
      }
  }

  return associatedBadge ? associatedBadge : null;
};

/**
 *  Returns the badges available to the user
 * @param {String} badges
 * @param {Array} userOffers offers related to the user
 * @returns {Array} available badges
 */
const getAvailableBadges = (badges, userOffers) => {
  try {
    const splitBadges = badges.split('||');
    const availableBadges = [];
    // decode the badges
    for (const badge of splitBadges) {
      const splitBadge = badge.split(':');
      const suitableOffers = identifySuitableOffers(
        splitBadge[1].split(','),
        userOffers
      );
      const decodedBadge = {
        name: splitBadge[0],
        ...suitableOffers,
      };
      availableBadges.push(decodedBadge);
    }
    return availableBadges;
  } catch (error) {
    console.error('Error while getting available badges: ' + error.message);
    return [];
  }
};

/**
 * Identifies suitable offers to the user using the badges available and offer to the user
 * @param {Array} badgeTypes
 * @param {Array} userOffers
 * @returns {Object} suitable offers
 */
const identifySuitableOffers = (badgeTypes, userOffers) => {
  const applicableOffers = {
    isBadgeApplicable: false,
    types: [],
  };
  try {
    for (const badgeType of badgeTypes) {
      let type = { name: badgeType };
      let matchedOffer = userOffers.find(
        (userOffer) => userOffer.type === badgeType
      );
      // offer is matched when offer is offered to user and badge associated with the available offer
      if (matchedOffer) {
        type.id = matchedOffer.id;
        type.title = matchedOffer.title;
        applicableOffers.isBadgeApplicable = true;
      }
      applicableOffers.types.push(type);
    }
    return applicableOffers;
  } catch (error) {
    console.error('Error while identifying suitable offers: ' + error.message);
    return applicableOffers;
  }
};

/**
 * Loads the product list and badges associated to them on server side when page is requested from the next server
 * @param {req} - URL query
 * @returns product props using the Graph QL server
 */
export async function getServerSideProps({ query }) {
  try {
    console.log('Loading the products list...');
    const productList = await getProductList();
    console.log('Finished loading product list.');
    // get the user related offers and the applicable badges when user id is valid
    if (
      query.userId &&
      !isNaN(query.userId) &&
      Constants.USER_IDS.indexOf(Number(query.userId)) !== -1
    ) {
      console.log('Loading the User info...');
      const userInfo = await getUserInfo(query.userId);
      console.log('Finished loadingUser info.');
      if (userInfo) {
        console.log('Getting available badges...');
        const availableBadges = getAvailableBadges(
          userInfo.available_badges,
          userInfo.offers
        );
        console.log('Finished getting available badges.');
        console.log('Attaching badges to product list...');
        const productListWithBadge = addBadgesToProductList(
          productList,
          availableBadges
        );
        console.log('Finished attaching badges to product list.');
        return {
          props: {
            productList: productListWithBadge,
          },
        };
      }
    }
    // return normal product list if no user id is selected by the user or user info is available
    return {
      props: {
        productList,
      },
    };
  } catch (error) {
    console.error('Error in get getServerSideProps: ' + error.message);
    return {
      props: {
        productList: [],
      },
    };
  }
}

export default function Home({ productList }) {
  const router = useRouter();
  const { userId, page } = router.query;
  return (
    <div>
      <Head>
        <title>Product</title>
      </Head>
      <Header title={Constants.HEADER}></Header>
      <main>
        <SelectUser userId={userId} />
        {productList && productList.length > 0 ? (
          <ProductList productList={productList} userId={userId} page={page} />
        ) : (
          <div className={styles['empty-product']}>
            <h3>No products available</h3>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
