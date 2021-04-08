import { get } from './utils.js';

const sidebar = get('.sidebar-overlay');
const toggleBtn = get('.toggle-nav');
const closeBtn = get('.close-nav');
const page = get('.cart-overlay');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.add('show');
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('show');
});

page.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-overlay')) {
    e.target.classList.remove('show');
  }
});
