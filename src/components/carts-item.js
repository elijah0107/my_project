import Backbone from 'backbone';

const CartsItem = Backbone.Collection.extend({
  url: 'http://www.sima-land.ru/api/v3/item',
  parse(response) {
    return response.items;
  },
});

export default CartsItem;
