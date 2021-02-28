import Constants from '../contants/index';
import Link from 'next/link';
export default function ProductList({ product }) {
  return (
    <div>
      <img
        src={Constants.IMAGE_URL + product.image_key}
        alt={product.name}
      ></img>
      <div>{product.name}</div>
      <div>Current price: {product.price.current_price}</div>
      <div>Original price: {product.price.original_price}</div>
      <div>
        <Link href={`/product?id=${product.id}`}>
          <a>Show product</a>
        </Link>
      </div>
    </div>
  );
}
