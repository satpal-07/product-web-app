import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import getProductList from '../services/getProductList';
import ProductList from '../components/ProductList';

export async function getServerSideProps() {
  try {
    console.log('Loading the products list...');
    const productList = await getProductList();
    console.log('Loaded product list.');
    return {
      props: {
        productList,
      },
    };
  } catch (error) {
    console.error('Error in get Product List API: ' + error.message);
    return {
      props: {
        productList: [],
      },
    };
  }
}

export default function Home({ productList }) {
  return (
    <div>
      <Head>
        <title>Product</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header title='Product List'></Header>
      <main>
        {productList.map((product) => {
          return <ProductList product={product} key={product.id} />;
        })}
      </main>
      <Footer />
    </div>
  );
}
