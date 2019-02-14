import Backbone from 'backbone';
// import ItemModel from "./item-model";

const Items  = Backbone.Collection.extend({
    // model: ItemModel,
    url: 'http://www.sima-land.ru/api/v3/search',
    parse (response) {
        return response.items;
    },
});

export default Items;