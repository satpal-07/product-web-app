import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../styles/Product.module.css';
import getProductInfo from '../services/getProductInfo';
import ProductInfo from '../components/ProductInfo';

export async function getServerSideProps({ query }) {
  try {
    console.log('Loading the product info...');
    const product = await getProductInfo(query.id);
    console.log('Loaded the product info.');
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error('Error in get Product List API: ' + error.message);
    return {
      props: {
        product: {},
      },
    };
  }
}

export default function Product({product}) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header title='Product Info'></Header>
      <main>
        <ProductInfo product={product} />
      </main>

      <Footer />
    </div>
  );
}
