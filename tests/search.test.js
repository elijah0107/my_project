import SearchForm from '../src/components/search-form';
import Items from "../src/components/items";
import $ from "jquery";

let items = new Items();


let search = new SearchForm({
    el: $('.searchNew'),
    collection: items,
});

describe('Проверяем создание коллекции', () => {
    it('Что-то делает', function () {
        expect(items.collection).toBeDefined();
        this.$el.toBe('.searchNew')
    });
});