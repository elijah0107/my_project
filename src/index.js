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


//Вью для коллекции
App.Views.Item = Backbone.View.extend({
    tagName: 'li',
    template: template('itemTemplate'),
    render: function () {
        var template = this.template(this.model.toJSON());
        this.$el.html( this.model.get('name'));
        return this;
    },
    events: {

    }
});

App.Views.Items = Backbone.View.extend({
   tagName: 'ul',
    render: function () {
        this.collection.each(this.addOne, this);
        return this;
    },
    addOne: function (items) {
        var itemView = new App.Views.Item({ model: items });
        this.$el.append(itemView.render().el);
    }
});
var items = new App.Collections.Item([
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
var itemsView = new App.Views.Items({
    collection: items
});
itemsView.render();
$('body').html(itemsView.el);


});
import './styles.scss';
