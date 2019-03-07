import SearchForm from '../src/components/search-form';
import Items from "../src/components/items";
import $ from "jquery";


    describe('check search form', () => {
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
            spyOn(SearchForm.prototype, 'editSearch');
            form = createSearchForm();
            expect(form.editSearch).toHaveBeenCalledTimes(0);
            expect(form.$('.search-sid').hasClass('not-display')).toEqual(false);
            form.editSearch();
            expect(form.editSearch).toHaveBeenCalledTimes(1);
            expect(form.$('.search-result').hasClass('not-display')).toEqual(true);
            expect(form.$('.search-sid').hasClass('not-display')).toEqual(true);

        });

    });
