import styles from '../styles/ProductList.module.css';
import { useMemo, useState } from 'react';
import ProductListCard from './ProductListCard';
import { isPageValid } from './utils/helper';
const productsPerPage = 12;

export default function ProductList({ productList, userId, page }) {
  const totalPages = Math.ceil(productList.length / productsPerPage);
  const [currentProductList, setCurrentProductList] = useState([]);
  const [pages, setPages] = useState({
    currentPage: isPageValid(page, totalPages) ? Number(page) : 1,
    nextPage: isPageValid(page, totalPages)
      ? Number(page) + 1
      : totalPages > 2
      ? 2
      : 1,
    prevPage: isPageValid(page, totalPages) ? Number(page) - 1 : 0,
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

  const onClickPageHandler = (
    prevPage,
    currentPage,
    nextPage,
    isActive = true
  ) => {
    if (!isActive) return;
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
          <ProductListCard
            product={product}
            key={product.id}
            userId={userId}
            currentPage={pages.currentPage}
          />
        ))}
      </div>{' '}
      <div className={styles['pagination-wrap']}>
        <div
          className={
            pages.prevPage > 0
              ? `${styles['prev-page']} ${styles.pagination}`
              : `${styles['disable-page']} ${styles.pagination}`
          }
          onClick={() =>
            onClickPageHandler(
              pages.prevPage - 1,
              pages.prevPage,
              pages.nextPage - 1,
              pages.prevPage > 0
            )
          }
        >
          <img
            className={
              pages.prevPage > 0
                ? `${styles.icon}`
                : `${styles.icon} ${styles['disable-icon']}`
            }
            src='/prev_icon.svg'
          ></img>
        </div>
        <div className={styles.pagination}>
          <p>Page {pages.currentPage}</p>
        </div>
        <div
          className={
            pages.nextPage <= totalPages
              ? `${styles['next-page']} ${styles.pagination}`
              : `${styles['disable-page']} ${styles.pagination}`
          }
          onClick={() =>
            onClickPageHandler(
              pages.prevPage + 1,
              pages.nextPage,
              pages.nextPage + 1,
              pages.nextPage <= totalPages
            )
          }
        >
          <img
            className={
              pages.nextPage <= totalPages
                ? `${styles.icon}`
                : `${styles.icon} ${styles['disable-icon']}`
            }
            src='/next_icon.svg'
          ></img>
        </div>
      </div>
    </div>
  );
}
