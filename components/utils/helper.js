/**
 * Returns badge icon name based on the name provided
 * @param {String} name of the badge
 * @returns {String} Badge Icon
 */
const getBadge = (name) => {
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

/**
 * Returns currency sign using the currency code provided
 * @param {String} currencyCode of the price
 * @returns {String} currency sign
 */
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

/**
 * Returns true if provided page is valid number and less than totalPages provided
 * @param {String} page page number in string
 * @param {number} totalPages total page number
 * @returns {Boolean} true is page is number and less than total pages else false
 */
const isPageValid = (page, totalPages) => {
  return !isNaN(page) && Number(page) > 0 && totalPages >= Number(page);
};

module.exports = {
  getCurrencySign,
  getBadge,
  isPageValid,
};
