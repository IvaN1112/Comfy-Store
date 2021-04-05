// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';

//  filter imports
import setupSearch from '../filters/search.js';
import setupCompanies from '../filters/companies.js';
import setupPrice from '../filters/price.js';

// specific imports
import { store } from '../store.js';
import display from '../displayProducts.js';
import { get } from '../utils.js';

const init = () => {
  display(store, get('.products-container'));
  get('.page-loading').style.display = 'none';
  setupSearch(store);
};

window.addEventListener('DOMContentLoaded', init);
