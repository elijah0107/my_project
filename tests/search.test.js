import SearchForm from '../src/components/search-form';
import Items from "../src/components/items";
import $ from "jquery";

let items = new Items();


let search = new SearchForm({
    collection: items,
    el: '.cart-item',
});

describe('Проверяем создание коллекции', () => {
    it('', function () {
        expect(items).toBeDefined();
    });
});