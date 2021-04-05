import { get } from './utils.js';

const sidebar = get('.sidebar-overlay');
const toggleBtn = get('.toggle-nav');
const closeBtn = get('.close-nav');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.add('show');
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('show');
});
