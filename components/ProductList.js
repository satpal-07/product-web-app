import styles from '../styles/ProductList.module.css'
import Constants from '../contants/index';
import Link from 'next/link';

export default function ProductList({ product }) {
  let badge;
  switch (product?.associatedBadge?.name) {
    case 'loyalty':
      badge = '/loyalty_icon.jpg';
      break;
    case 'gonesoon':
      badge = '/gonesoon_icon.jpg';
      break;
    case 'sale':
      badge = '/sale_icon.jpg';
      break;
    default:
      '';
  }
  return (
    <div>
      <img
        src={Constants.IMAGE_URL + product.image_key}
        alt={product.name}
      ></img>
      <div>{product.name}</div>
      <div>Current price: {product.price.current_price}</div>
      <div>Original price: {product.price.original_price}</div>
      <div>Badge: {product.associatedBadge?.name}</div>
      <img src={badge} />
      <div>
        <Link href={`/product?id=${product.id}`}>
          <a>Show product</a>
        </Link>
      </div>
    </div>
  );
}
