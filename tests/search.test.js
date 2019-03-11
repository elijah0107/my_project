import SearchForm from '../src/components/search-form';
import Items from "../src/components/items";
import Load from '../fixture-loader';
import $ from "jquery";
import Backbone from "backbone";




    describe('check search form', () => {
        let fixtures = Load('index', 'html');

        beforeEach(function () {
            $('body').append(fixtures);
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
            const items = new Items();
            const result = items.parse({
                    items: 'Stone'
            });
            expect(result).toEqual('Stone');
        });

        it('check edit search', () => {
            form = createSearchForm();
            expect(form.$('.search-sid').hasClass('not-display')).toEqual(false);
            console.log(form.$('.text-value').length);
            form.$('.text-value').val(123456);
            form.$('.button-blue').click();
            form.editSearch();
            expect(form.editSearch).toHaveBeenCalledTimes(1);
            expect(form.$('.search-result').hasClass('not-display')).toEqual(true);
            expect(form.$('.search-sid').hasClass('not-display')).toEqual(true);
        });

        it('check open details', () => {
            form = createSearchForm();
            form.openDetails();
            listenTo(Backbone, 'on-click-more-button', function ({ sid }) {
                console.log(sid);
            });
        });

        it('check back to first view', () => {
            form = createSearchForm();
            form.backToFirstView();
            expect(form.$('.search-sid').hasClass('not-display')).toEqual(false);
            expect(form.$('.search-result').hasClass('not-display')).toEqual(true);
            expect(form.$('.cart-item').hasClass('not-display')).toEqual(true);
            expect(form.$('.text-value').val()).toEqual('');
        });

    });