import $ from 'jquery';
import Backbone from 'backbone';
import ProductView from '../src/components/product-view';
import CartsItem from '../src/components/carts-item';
import Load from '../fixture-loader';

describe('check search form', () => {
  let view;
  const fixtures = Load('index', 'html');
  const createProductView = () => new ProductView({
    el: '.cart-item',
    collection: new CartsItem(),
  });
  const testModel = new Backbone.Model({
    name: 'test',
    photos: ['test'],
    url_part: 'test',
    photo_sizes: [],
    photoVersions: ['test'],
    number: 1,
    price: 123,
    description: 'Тестовое описание',
    trademark: 'Тестовая ТМ',
    sid: 1234,
    country: 'Тестовая страна',
    stuff: 'Тест',
    box_capacity: 'Тест',
    size: 123,
  });
  beforeEach(() => {
    $('body').append(fixtures);
  });
  afterEach(() => {
    $('body').html('');
  });

  it('check open characteristic', () => {
    view = createProductView();
    view.collection.push(testModel);
    view.render();
    view.openCharacteristic();
    expect(view.$('.description-value').hasClass('not-display')).toEqual(true);
    expect(view.$('.characteristic-value').hasClass('not-display')).toEqual(false);
    expect(view.$('.characteristic').hasClass('selected')).toEqual(true);
    expect(view.$('.description').hasClass('selected')).toEqual(false);
  });

  it('check open description', () => {
    view = createProductView();
    view.collection.push(testModel);
    view.render();
    view.openDescription();
    expect(view.$('.description-value').hasClass('not-display')).toEqual(false);
    expect(view.$('.characteristic-value').hasClass('not-display')).toEqual(true);
    expect(view.$('.characteristic').hasClass('selected')).toEqual(false);
    expect(view.$('.description').hasClass('selected')).toEqual(true);
  });
});
