// import
import { getStorageItem, setStorageItem, formatPrice, get } from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';

let cart = getStorageItem('cart');
const cartItemCountDOM = get('.cart-item-count');
const cartTotalDOM = get('.cart-total');
const cartItemsDOM = get('.cart-items');

export const addToCart = (id) => {
  //checking if item is in the cart
  const item = cart.find((item) => item.id === id);
  //if there is no such item added it to cart and display on DOM
  if (!item) {
    let product = findProduct(id);
    product = { ...product, amount: 1 }; // add initial amount of 1
    cart = [...cart, product]; // add to cart
    //add to DOM
    addToCartDOM(product);
  } //Otherwise, update amount of item in DOM by 1
  else {
    const newAmount = increaseAmount(id);
    const allAmounts = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];
    const oldAmount = allAmounts.find((item) => item.dataset.id === id);
    oldAmount.innerText = newAmount;
  }
  //update cart items count
  displayCartItemsCount();
  //update cart total
  displayCartTotal();
  //save cart to local storage
  setStorageItem('cart', cart);
  openCart();
};

const setupCartItemsDOM = () => {
  cart.forEach((item) => {
    addToCartDOM(item);
  });
};

const setupCartFunctionality = () => {
  cartItemsDOM.addEventListener('click', (e) => {
    const element = e.target;
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;
    //removing item from DOM
    if (element.classList.contains('cart-item-remove-btn')) {
      parent.parentElement.remove();
      //removing item from cart array
      removeItem(id);
    }
    // increase
    if (parent.classList.contains('cart-item-increase-btn')) {
      const newAmount = increaseAmount(parentID);
      parent.nextElementSibling.textContent = newAmount;
    }
    // decrease
    if (parent.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmount(parentID);
      if (newAmount === 0) {
        removeItem(parentID);
        parent.parentElement.parentElement.remove();
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }
    //setting new cart item count and total
    displayCartItemsCount();
    displayCartTotal();
    setStorageItem('cart', cart);
  });
};

function removeItem(id) {
  cart = cart.filter(function (item) {
    return item.id !== id;
  });
}

const init = () => {
  displayCartItemsCount();
  displayCartTotal();
  setupCartItemsDOM();
  setupCartFunctionality();
  console.log(cart);
};

function increaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}
function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

const displayCartItemsCount = () => {
  const amount = cart.reduce((total, item) => {
    return (total += item.amount);
  }, 0);
  cartItemCountDOM.innerText = amount;
};

const displayCartTotal = () => {
  const total = cart.reduce((total, item) => {
    return (total += item.amount * item.price);
  }, 0);
  cartTotalDOM.innerText = `$${formatPrice(total)}`;
};

init();
