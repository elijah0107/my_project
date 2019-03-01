import SearchForm from '../src/components/search-form';
import Items from "../src/components/items";
import $ from "jquery";

describe('Проверяем создание коллекции', () => {
        let items = new Items();


        let search = new SearchForm({
            el: $('.searchNew'),
            collection: items,
        });

   expect(items.collection).toBeDefined();
});