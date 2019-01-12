import Backbone from 'backbone';
import $ from 'jquery';
var Item = Backbone.Model.extend({

});
// console.log(new Item);
// var ItemView = Backbone.View.extend({
//     initialize: function () {
//         console.log(this.model)
//     },
//     tagName: 'ul',
// });
// console.log(new ItemView({model: Item}));

var PeopleCollection = Backbone.Collection.extend({
    model: Item,
});
//Вью для коллекции
var ItemView = Backbone.View.extend({
    tagName: '.item',

    initialize: function () {

    },

    render: function () {
        this.$el.html(this.template({ collection: this.collection. }))
    }
});
var ItemCollection = new PeopleCollection([
    {
        name: 'Ножницы',
        price: 125,
        description: 'Портновские ножницы',
    },
    {
        name: 'Фоторамка',
        price: 1200,
        description: 'Цифровая рамка',
    },
    {
        name: 'Скотч',
        price: 299,
        description: 'Прозрачный ',
    }
]);
import './styles.scss';
