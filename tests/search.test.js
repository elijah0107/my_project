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
    afterEach(function () {
        $('body').html('');
    });
    let form,
        createSearchForm = () => {
            return new SearchForm({
                el: '.searchNew',
                collection: new Items()
            });
        };
    let testModel = new Backbone.Model({
        name: 'test',
        photos: ['test'] ,
        url_part: 'test',
        photo_sizes: [],
        photoVersions: ['test'],
        number: 1, price: 123,
        description: 'Тестовое описание',
        trademark: 'Тестовая ТМ',
        sid: 1234,
        country: 'Тестовая страна',
        stuff: 'Тест',
        box_capacity: 'Тест',
        size: 123
    });
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
        form.$('.text-value').val(123456);
        form.editSearch();
        expect(form.$('.search-result').hasClass('not-display')).toEqual(false);
        expect(form.$('.search-sid').hasClass('not-display')).toEqual(true);
    });

    fit('check open details', (event) => {
        spyOn('openDetails', )
        form = createSearchForm();
        form.collection.push(testModel);
        form.render();
        console.log(form.$(event.target).data('item-sid'));
        form.openDetails();
        listenTo(Backbone, 'on-click-more-button', function ({ sid }) {
            console.log({sid})
        });
    });

    it('check back to first view', () => {
        form = createSearchForm();
        form.backToFirstView();
        expect(form.$('.search-sid').hasClass('not-display')).toEqual(false);
        expect(form.$('.search-result').hasClass('not-display')).toEqual(true);
        expect($('.cart-item').hasClass('not-display')).toEqual(true);
        expect(form.$('.text-value').val()).toEqual('');
    });

});
