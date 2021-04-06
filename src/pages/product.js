// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// specific
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, get, formatPrice } from '../utils.js';

// selections;
const loading = get('.page-loading');
const centerDOM = get('.single-product-center');
const pageTitleDOM = get('.page-hero-title');
const imgDOM = get('.single-product-img');
const titleDOM = get('.single-product-title');
const companyDOM = get('.single-product-company');
const priceDOM = get('.single-product-price');
const colorsDOM = get('.single-product-colors');
const descDOM = get('.single-product-desc');
const cartBtn = get('.addToCartBtn');

// cart product
let productID;

//error html
const presentError = () => {
  centerDOM.innerHTML = `<div>
      <h3 class="error">sorry, something went wrong</h3>
      <a href="index.html" class="btn">back home</a>
      </div>`;
};

// show product when page loads
window.addEventListener('DOMContentLoaded', async () => {
  //fetch product data
  // const urlQuery = `?id=hello`;
  const urlQuery = window.location.search;
  try {
    const response = await fetch(`${singleProductUrl}${urlQuery}`);
    if (response.status >= 200 && response.status <= 299) {
      const product = await response.json();
      //grab product data
      const { id, fields } = product;
      const { colors, company, name, description: desc, price } = fields;
      const imgSrc = fields.image[0].thumbnails.large.url;
      //set product data
      pageTitleDOM.innerText = `Home / ${name}`;
      imgDOM.src = imgSrc;
      titleDOM.innerText = name;
      companyDOM.innerText = `By ${company}`;
      priceDOM.innerText = `$${formatPrice(price)}`;
      descDOM.innerText = desc;
      //set product colors
      colors.forEach((color) => {
        const span = document.createElement('span');
        span.classList.add('product-color');
        span.style.background = color;
        colorsDOM.appendChild(span);
      });
      //set button id and pass it to global var
      cartBtn.dataset.id = id;
      productID = id;
    } else {
      presentError();
    }
  } catch (error) {
    console.log(error);
    console.log(
      'Please check your prodcut request, there was an issue with proccessing it'
    );
    presentError();
  }
  loading.style.display = 'none';
});

//setup add to cart button using item button id
cartBtn.addEventListener('click', () => {
  addToCart(productID);
});
