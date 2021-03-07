import styles from '../styles/ProductList.module.css';
import { useMemo, useState } from 'react';
import ProductListCard from './ProductListCard';
const productsPerPage = 12;
export default function ProductList({ productList, userId }) {
  const totalPages = Math.ceil(productList.length / productsPerPage);
  const [currentProductList, setCurrentProductList] = useState([]);
  const [pages, setPages] = useState({
    currentPage: 1,
    nextPage: totalPages > 2 ? 2 : null,
    prevPage: 0,
  });

  const updateCurrentProductList = () => {
    const newCurrentProductList = [];
    const forLoopLength =
      productList.length > pages.currentPage * productsPerPage
        ? pages.currentPage * productsPerPage
        : productList.length;
    const startingIndex = pages.prevPage * productsPerPage;
    for (let i = startingIndex; i < forLoopLength; i++) {
      newCurrentProductList.push(productList[i]);
    }
    setCurrentProductList(newCurrentProductList);
  };

  const onClickPageHandler = (prevPage, currentPage, nextPage) => {
    const updatedPages = {
      prevPage,
      currentPage,
      nextPage,
    };
    console.log(updatedPages);
    setPages(updatedPages);
  };

  useMemo(updateCurrentProductList, [pages]);

  return (
    <div>
      <div className={styles.list}>
        {currentProductList.map((product) => (
          <ProductListCard product={product} key={product.id} userId={userId} />
        ))}
      </div>{' '}
      <div className={styles['pagination-wrap']}>
        {pages.prevPage > 0 && (
          <div
            className={`${styles.pagination} ${styles['prev-page']}`}
            onClick={() =>
              onClickPageHandler(
                pages.prevPage - 1,
                pages.prevPage,
                pages.nextPage - 1
              )
            }
          >
            <p>{pages.prevPage}</p>
          </div>
        )}
        <div className={`${styles.pagination} ${styles['current-page']}`}>
          <p>{pages.currentPage}</p>
        </div>
        {pages.nextPage <= totalPages && (
          <div
            className={`${styles.pagination} ${styles['next-page']}`}
            onClick={() =>
              onClickPageHandler(
                pages.prevPage + 1,
                pages.nextPage,
                pages.nextPage + 1
              )
            }
          >
            <p>{pages.nextPage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
