import './styles.scss';
import Items from './components/items';
import SearchForm from './components/search-form';
import CartsItem from './components/carts-item';
import ProductView from './components/product-view';

window.app = {
  searchFormView: new SearchForm({
    el: '.search-new',
    collection: new Items(),
  }),
  productView: new ProductView({
    el: '.cart-item',
    collection: new CartsItem(),
  }),
};
