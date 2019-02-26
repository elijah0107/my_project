import './styles.scss';
import Items from './components/items';
import SearchForm from './components/search-form';
import $ from 'jquery';
import CartsItem from './components/carts-item';
import CartView from './components/cart-view';


let items = new Items();

let cartsItem = new CartsItem;

let search = new SearchForm({
    el: $('.searchNew'),
    collection: items,
});

let cart = new CartView({
    el: $('.cart-item'),
    collection: cartsItem,
});
