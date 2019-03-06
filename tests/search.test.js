import SearchForm from '../src/components/search-form';
import Items from "../src/components/items";
import $ from "jquery";


    describe('check search form', () => {

        it('check url', function () {
            const items = new Items();
            expect(items.url).toEqual('http://www.sima-land.ru/api/v3/search');
        });

        it('parse test', () => {
            const items = new Items(),
                result = items.parse({
                    items: 'Stone underworld'
                });
            expect(result).toEqual('Stone underworld');
        });

        fit('check edit search', () => {
            const items = new Items(),
                search = new SearchForm({
                    el: '.searchNew',
                    collection: items,
                });
            items.fetch({
                data: {
                    sids: 123456
                }
            });
            items.parse(items);
            expect(items.fetch).toEqual();
        });

    });
