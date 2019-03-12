import ProductView from '../src/components/product-view';
import CartsItem from "../src/components/carts-item";
import $ from "jquery";
import Backbone from "backbone";
import Load from "../fixture-loader";

describe('check search form', () => {
    let fixtures = Load('index', 'html'),
        view,
        createProductView = () => {
            return new ProductView({
                el: '.cart-item',
                collection: new CartsItem(),
            });
        };
    beforeEach(function () {
        $('body').append(fixtures);
    });
    afterEach(function () {
        $('body').html('');
    });

    fit('check open characteristic', () => {
        view = createProductView();
        view.collection.push(new Backbone.Model({ name: 'test', photos: [] }));
        view.render();
        console.log(view.$('.description-value').length);
        view.openCharacteristic();
        expect(view.$('.description-value').hasClass('not-display')).toEqual(true);
        expect(view.$('.characteristic-value').hasClass('not-display')).toEqual(false);
        expect(view.$('.characteristic').hasClass('selected')).toEqual(true);
        expect(view.$('.description').hasClass('selected')).toEqual(false);
    });

    it('check open description', () => {
        view = createProductView();
        view.openDescription();
        expect(view.$('.description-value').hasClass('not-display')).toEqual(false);
        expect(view.$('.characteristic-value').hasClass('not-display')).toEqual(false);
        expect(view.$('.characteristic').hasClass('selected')).toEqual(false);
        expect(view.$('.description').hasClass('selected')).toEqual(true);
    });
});
