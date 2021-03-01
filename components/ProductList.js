import styles from '../styles/ProductList.module.css';
import Constants from '../contants/index';
import Link from 'next/link';

const assignBadge = (name) => {
  let badge;
  switch (name) {
    case 'loyalty':
      badge = '/loyalty_icon.png';
      break;
    case 'gonesoon':
      badge = '/gonesoon_icon.png';
      break;
    case 'sale':
      badge = '/sale_icon.png';
      break;
    default:
      '';
  }
  return badge;
};

const getCurrencySign = (currencyCode) => {
  let currencySign;
  switch (currencyCode) {
    case 'GBP':
      currencySign = '£';
      break;
    case 'USD':
      currencySign = '$';
      break;
    default:
      '';
  }
  return currencySign;
};

export default function ProductList({ product }) {
  let badge = assignBadge(product?.associatedBadge?.name);
  let priceSign = getCurrencySign(product?.price?.currency_code);

  return (
    <Link href={`/product?id=${product.id}`}>
      <div className={styles.card}>
        <div className={styles['image-wrapper']}>
          <img
            className={styles.image}
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
          <div className={styles.name}>
            <p>{product.name}</p>
          </div>
          <div className={styles['current-price']}>
            <p>Price Now: {`${priceSign} ${product.price.current_price}`}</p>
          </div>
          <div className={styles['original-price']}>
            {product.price.original_price && (
              <p>
                Original Price: {`${priceSign} ${product.price.original_price}`}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
