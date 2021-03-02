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

module.exports = {
  getCurrencySign,
  getBadge,
};
