import { get } from '../utils.js';
import display from '../displayProducts.js';

const setupPrice = (store) => {
  const priceInput = get('.price-filter');
  const priceValue = get('.price-value');

  //getting all values from products
  let maxValue = store.map((product) => {
    return product.price;
  });
  //getting the largest one
  maxValue = Math.max(...maxValue);
  //converting to dollar
  maxValue = Math.ceil(maxValue / 100);
  priceInput.value = maxValue;
  priceInput.max = maxValue;
  priceInput.min = 0;
  priceValue.textContent = `Max price : $${maxValue}`;

  priceInput.addEventListener('input', function () {
    const valueInt = parseInt(priceInput.value);
    priceValue.textContent = `Max price : $${valueInt}`;
    const filteredProducts = store.filter(
      (product) => product.price / 100 <= valueInt
    );
    display(filteredProducts, get('.products-container'));
    if (filteredProducts.length < 1) {
      get(
        '.products-container'
      ).innerHTML = `<h3 class="filter-error">Sorry, no items matched your search.</h3>`;
    }
  });
};

export default setupPrice;
