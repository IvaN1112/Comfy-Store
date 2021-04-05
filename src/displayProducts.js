import { formatPrice } from './utils.js';
import { addToCart } from './cart/setupCart.js';
const display = (products, container) => {
  container.innerHTML = products
    .map((product) => {
      const { id, name, image, price } = product;
      return `
    <article class="product">
          <div class="product-container">
            <img
              src="${image}"
              class="product-img img"
              alt="${name}"
            />
            <div class="product-icons">
              <a href="product.html?id="${id}" class="product-icon">
                <i class="fas fa-search"></i>
              </a>
              <button class="product-cart-btn product-icon" data-id="${id}">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <footer>
            <p class="product-name">${name}</p>
            <h4 class="product-price">$${formatPrice(price)}</h4>
          </footer>
        </article>
    `;
    })
    .join('');
  container.addEventListener('click', (e) => {
    const element = e.target.parentElement;
    const id = element.dataset.id;
    if (element.classList.contains('product-cart-btn')) {
      addToCart(id);
    }
  });
};

export default display;
