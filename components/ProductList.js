import styles from '../styles/ProductList.module.css';
import ProductListCard from './ProductListCard';

export default function ProductList({ productList, userId }) {
  return (
    <div className={styles.list}>
      {productList.map((product) => (
        <ProductListCard product={product} key={product.id} userId={userId} />
      ))}
    </div>
  );
}
