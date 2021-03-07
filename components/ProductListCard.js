import styles from '../styles/ProductListCard.module.css';
import Constants from '../contants/index';
import Link from 'next/link';
import { getBadge, getCurrencySign } from './utils/helper';

export default function ProductListCard ({ product, userId, currentPage })  {
  let badge = getBadge(product?.associatedBadge?.name);
  let priceSign = getCurrencySign(product?.price?.currency_code);

  return (
    <Link
      href={
        userId
          ? `/product?id=${product.id}&page=${currentPage}&userId=${userId}`
          : `/product?id=${product.id}&page=${currentPage}`
      }
    >
      <div className={styles.card}>
        <div className={styles['image-wrapper']}>
          <img
            src={Constants.IMAGE_URL + product.image_key}
            alt={product.name}
          ></img>
          {badge && (
            <img
              className={styles.badge}
              src={badge}
              alt={product.associatedBadge?.name}
            />
          )}
        </div>

        <div className={styles.info}>
          <div>
            <p className='bold'>{product.name}</p>
          </div>
          <div>
            <p>
              Price Now:{' '}
              <span className='bold'>{`${priceSign}${product.price.current_price}`}</span>
            </p>
          </div>
          <div>
            {product.price.original_price && (
              <p>
                Original Price:{' '}
                <span className='bold'>{`${priceSign}${product.price.original_price}`}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
