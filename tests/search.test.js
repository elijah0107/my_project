import $ from 'jquery';
import Backbone from 'backbone';
import SearchForm from '../src/components/search-form';
import Items from '../src/components/items';
import Load from '../fixture-loader';


describe('check search form', () => {
  let form;
  const fixtures = Load('index', 'html');
  const createSearchForm = () => new SearchForm({
    el: '.searchNew',
    collection: new Items(),
  });
  const testModel = new Backbone.Model({
    sid: 'test',
  });
  beforeEach(() => {
    $('body').append(fixtures);
  });
  afterEach(() => {
    $('body').html('');
  });
  it('check url', () => {
    const items = new Items();
    expect(items.url).toEqual('http://www.sima-land.ru/api/v3/search');
  });

  it('parse test', () => {
    const items = new Items();
    const result = items.parse({
      items: 'Stone',
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

  it('check open details', () => {
    form = createSearchForm();
    form.collection.push(testModel);
    form.render();
    jest.spyOn(Backbone, 'trigger');
    form.$('.js-item-more-button').data('test');
    form.openDetails({
      target: document.querySelector('.js-item-more-button'),
    });
    expect(Backbone.trigger).toHaveBeenCalledTimes(1);
    expect(Backbone.trigger).toHaveBeenCalledWith('on-click-more-button', { sid: 'test' });
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
