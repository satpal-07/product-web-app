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

const addBadgesToProductList = (productList, availableBadges) => {
  for (const product of productList) {
    product.associatedBadge = getAssociatedBadge(product, availableBadges);
  }
  return productList;
};

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

export async function getServerSideProps({ query }) {
  try {
    console.log('Loading the products list...');
    const productList = await getProductList();
    console.log('Finished loading product list.');
    if (query.userId) {
      console.log('Loading the User info...');
      const userInfo = await getUserInfo(query.userId);
      console.log('Finished loadingUser info.');

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
  const { userId } = router.query;
  return (
    <div>
      <Head>
        <title>Product</title>
      </Head>
      <Header title={Constants.HEADER}></Header>
      <main>
        <SelectUser userId={userId} />
        <div className={styles['product-list']}>
          {productList.map((product) => {
            return <ProductList product={product} key={product.id} />;
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
