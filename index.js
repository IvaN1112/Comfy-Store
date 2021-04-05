// global imports
import './src/toggleSidebar.js';
import './src/cart/toggleCart.js';
import './src/cart/setupCart.js';
// specific imports
import fetchProducts from './src/fetchProducts.js';
import { setupStore, store } from './src/store.js';
import display from './src/displayProducts.js';
import { get } from './src/utils.js';

const init = async () => {
  const products = await fetchProducts();
  if (products) {
    //add products to the local storage
    setupStore(products);
    //get featured products
    const featured = store.filter((product) => product.featured === true);
    display(featured, get('.section-center'));
  }
};

window.addEventListener('DOMContentLoaded', init);
