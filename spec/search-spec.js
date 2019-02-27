describe('Проверяем создание коллекции', () => {
    import SearchForm from '../src/components/search-form';
    import Items from "../src/components/items";
    import $ from "jquery";
        let items = new Items();


        let search = new SearchForm({
            el: $('.searchNew'),
            collection: items,
        });

   expect(items.collection).toBeDefined();
});
