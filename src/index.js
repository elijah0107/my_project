import './styles.scss';
import Items from './components/items';
import SearchForm from './components/search-form';
import CartsItem from './components/carts-item';
import ProductView from './components/product-view';


let items = new Items();

let cartsItem = new CartsItem;

let search = new SearchForm({
    el: '.searchNew',
    collection: items,
});

let cart = new ProductView({
    el: '.cart-item',
    collection: cartsItem,
});
