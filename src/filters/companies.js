import { get } from '../utils.js';
import display from '../displayProducts.js';

const setupCompanies = (store) => {
  const companies = [
    'all',
    ...new Set(store.map((product) => product.company)),
  ];
  const companiesDOM = get('.companies');
  companiesDOM.innerHTML = companies
    .map((company) => {
      return `
   <button class="company-btn">${company}</button>
   `;
    })
    .join('');
  companiesDOM.addEventListener('click', (e) => {
    if (e.target.classList.contains('company-btn')) {
      const companyName = e.target.textContent;
      const filteredProducts = store.filter(
        (product) => product.company === companyName
      );
      //if pressed on all button, display all buttons and leave the function
      if (companyName === 'all') {
        display(store, get('.products-container'));
        return;
      }
      display(filteredProducts, get('.products-container'));
    }
  });
};

export default setupCompanies;
