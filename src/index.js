import './styles.scss';
import Items from './components/items';
import SearchForm from './components/search-form';
import CartsItem from './components/carts-item';
import ProductView from './components/product-view';


const items = new Items();

const cartsItem = new CartsItem();

const search = new SearchForm({
  el: '.searchNew',
  collection: items,
});

const cart = new ProductView({
  el: '.cart-item',
  collection: cartsItem,
});
