import styles from '../styles/ProductInfo.module.css'
import Constants from '../contants/index';
import Link from 'next/link';
export default function ProductInfo({ product }) {
  return (
    <div>
        <div>
          <img
            src={Constants.IMAGE_URL + product?.image_key}
            alt={product?.name}
          ></img>
          <div>{product?.name}</div>
          <div>Current price: {product?.price?.current_price}</div>
          <div>Original price: {product?.price?.original_price}</div>
          <div>Info {product?.information[0]?.section_title}</div>
          <div>Info {product?.information[0]?.section_text}</div>
          <Link href='/'><a>Back</a></Link>
        </div>
      </div>
  );
}
