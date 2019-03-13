import Backbone from 'backbone';

const Items = Backbone.Collection.extend({
  url: 'http://www.sima-land.ru/api/v3/search',
  parse(response) {
    return response.items;
  },
});

export default Items;
