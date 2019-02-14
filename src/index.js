import './styles.scss'
import Items from './components/items'
import SearchForm from './components/search-form';
import $ from 'jquery'
import CartsItem from "./components/carts-item";
import CartForm from "./components/cart-form";


let items = new Items();

let cartsItem = new CartsItem;

let search = new SearchForm({
    el: $('.searchNew'),
    collection: items,
});

let cart = new CartForm({
    el: $('.cart-item'),
    collection: cartsItem,
});
