import SearchForm from '../src/components/search-form';
import Items from "../src/components/items";
import Loader from 'fixture-loader';
import $ from "jquery";


    describe('check search form', () => {
        beforeEach(() => {
            getFixturePath('../index.html');
        });
         let form,
            createSearchForm = () => {
                return new SearchForm({
                    collection: new Items()
                });
         };

        it('check url', function () {
            const items = new Items();
            expect(items.url).toEqual('http://www.sima-land.ru/api/v3/search');
        });

        it('parse test', () => {

            const result = items.parse({
                    items: 'Stone underworld'
            });
            expect(result).toEqual('Stone underworld');
        });

        fit('check edit search', () => {
            let fixture = Loader('index', 'html');
            form = createSearchForm();
            expect(form.$('.search-sid').hasClass('not-display')).toEqual(false);
            console.log(form.$('.text-value').length);
            form.$('.text-value').val(123456);

            expect(form.$('.text-value').val()).toEqual(123456);

            form.editSearch();
            expect(form.editSearch).toHaveBeenCalledTimes(1);
            expect(form.$('.search-result').hasClass('not-display')).toEqual(true);
            expect(form.$('.search-sid').hasClass('not-display')).toEqual(true);

        });

    });
