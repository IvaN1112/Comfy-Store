import { getStorageItem, setStorageItem } from './utils.js';
let store = getStorageItem('store');
const setupStore = (products) => {
  store = products.map((product) => {
    const { id, fields } = product;
    const {
      fields: { company, colors, featured, price, name, image: img },
    } = product;
    const image = img[0].thumbnails.large.url;
    return { id, name, image, company, price, featured, colors };
  });
  setStorageItem('store', store);
};
const findProduct = () => {};
export { store, setupStore, findProduct };
