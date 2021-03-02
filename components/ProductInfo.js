import styles from '../styles/ProductInfo.module.css';
import Constants from '../contants/index';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCurrencySign } from './utils/helper';

export default function ProductInfo({ product }) {
  const router = useRouter();
  const { userId } = router.query;
  const priceSign = getCurrencySign(product?.price?.currency_code);

  return (
    <div className={styles.wrapper}>
      {product ? (
        <div className={styles.card}>
          <img
            className={styles.image}
            src={Constants.IMAGE_URL + product?.image_key}
            alt={product?.name}
          ></img>
          <div className={styles['card-text']}>
            <div>
              <h2>{product?.name}</h2>
            </div>
            {product?.price?.current_price && (
              <div>
                <p className='bold'>
                  Current price: {`${priceSign}${product.price.current_price}`}
                </p>
              </div>
            )}
            {product?.price?.original_price && (
              <div>
                <p className='bold'>
                  Original price:{' '}
                  {`${priceSign}${product.price.original_price}`}
                </p>
              </div>
            )}
            {product?.information[0]?.section_text && (
              <div className={styles['info']}>
                <p>
                  <span className='bold'>Description: </span>
                  {product?.information[0]?.section_text}
                </p>
              </div>
            )}
            <div className={styles['button-wrap']}>
              <Link href={userId ? `/?userId=${userId}` : '/'}>
                <button className={styles.button}>Back</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles['no-product']}>
          <h2>Product not available</h2>{' '}
          <div className={styles['button-wrap']}>
            <Link href={userId ? `/?userId=${userId}` : '/'}>
              <button className={styles.button}>Home</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
