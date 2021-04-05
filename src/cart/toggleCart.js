import { get } from '../utils.js';

const cartOverlay = get('.cart-overlay');
const cartToggleBtn = get('.toggle-cart');
const cartCloseBtn = get('.cart-close');

cartToggleBtn.addEventListener('click', () => {
  cartOverlay.classList.add('show');
});

cartCloseBtn.addEventListener('click', () => {
  cartOverlay.classList.remove('show');
});

export const openCart = () => {
  cartOverlay.classList.add('show');
};
