import './styles.scss'
import Items from './components/items'
import SearchForm from './components/search-form';
// import omit from 'lodash';
import $ from 'jquery'


let items = new Items();

let search = new SearchForm({
    el: $('.searchNew'),
    collection: items,
});
