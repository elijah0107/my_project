import Backbone from 'backbone';
import _ from 'lodash';
import $ from 'jquery';

$(function () {
   window.App = {
       Models: {},
       Collections: {},
       Views: {}
   };
window.template = function (id) {
  return _.template( $('#' + id).html() );
};

App.Models.Item = Backbone.Model.extend({});

App.Collections.Item = Backbone.Collection.extend({
    model: App.Models.Item
});

// var ItemView = Backbone.View.extend({
//     tagName: '.item',
//     template: _.template('<%= name %>')
// });

//Вью для коллекции
App.Views.Item = Backbone.View.extend({
    tagName: '.item',

    render: function () {
        // this.$el.html(this.template({ collection: this.collection}))
        this.$el.html( this.model.get('name') );
        return this;
    }
});

var item = new App.Collections.Item([
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

// var item = new App.Models.Item({
//     name: 'Название товара',
//     price: 100,
//     description: 'Описание товара'
// });

var itemView = new App.Views.Item({ model: item});

console.log(itemView.render().el);
});
import './styles.scss';
