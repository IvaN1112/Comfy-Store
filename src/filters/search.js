import { get } from '../utils.js';
import display from '../displayProducts.js';
const setupSearch = (store) => {
  const input = get('.search-input');
  input.addEventListener('keyup', () => {
    const value = input.value.toLowerCase();
    console.log(value);
    const filteredProducts = store.filter((product) =>
      product.name.toLowerCase().startsWith(value)
    );
    if (filteredProducts) {
      display(filteredProducts, get('.products-container'));
    }
    if (filteredProducts.length < 1) {
      get(
        '.products-container'
      ).innerHTML = `<h3 class="filter-error">Sorry, no items matched your search.</h3>`;
    } // something
  });
};

export default setupSearch;
