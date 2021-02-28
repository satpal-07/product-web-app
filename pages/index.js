import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import getProductList from '../services/getProductList';
import getUserInfo from '../services/getUserInfo';
import ProductList from '../components/ProductList';
import SelectUser from '../components/SelectUser';
import { useRouter } from 'next/router';

const addBadgesToProductList = (productList, userInfo) => {
  const userOffers = userInfo.offers;
  const availableBadges = getAvailableBadges(userInfo.available_badges);

  for (const product of productList) {
    product.associatedBadge = getAssociatedBadge(
      product,
      userOffers,
      availableBadges
    );
  }
  return productList;
};

const getAssociatedBadge = (product, userOffers, availableBadges) => {
  let associatedBadge = null;
  for (const offer of userOffers) {
    if (associatedBadge) break;
    // TODO: simplify below logic
    if (product.offer_ids.indexOf(offer.id) !== -1) {
      associatedBadge = availableBadges.find((badge) => {
        if (badge.types.indexOf(offer.type) !== -1) {
          return badge;
        }
      });
    }
  }
  return associatedBadge ? associatedBadge : null;
};

const getAvailableBadges = (badges) => {
  const splitBadges = badges.split('||');
  const availableBadges = [];
  // decode the badges
  for (const badge of splitBadges) {
    const splitBadge = badge.split(':');
    const decodedBadge = {
      name: splitBadge[0],
      types: splitBadge[1].split(','),
    };
    availableBadges.push(decodedBadge);
  }
  return availableBadges;
};

export async function getServerSideProps({ query }) {
  try {
    if (!query.userId) {
      throw new Error('User ID is not passed.');
    }
    console.log('Loading the User info...');
    const userInfo = await getUserInfo(query.userId);
    console.log('Finished loadingUser info.');
    console.log('Loading the products list...');
    const productList = await getProductList();
    const productListWithBadge = addBadgesToProductList(productList, userInfo);
    console.log('Finished loadingproduct list.');
    return {
      props: {
        productList: productListWithBadge,
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
      <Header title='Product List'></Header>
      <main>
        <SelectUser userId={userId} />
        {productList.map((product) => {
          return <ProductList product={product} key={product.id} />;
        })}
        {/* {productListTags} */}
      </main>
      <Footer />
    </div>
  );
}
