import Backbone from 'backbone';
import template from 'lodash/template';
import $ from 'jquery';

$(function () {
    window.App = {
        Models: {},
        Collections: {},
        Views: {}
    };
    window.template = function (id) {
        return template($('#' + id).html());
    };

    App.Models.Item = Backbone.Model.extend({});

    App.Collections.Item = Backbone.Collection.extend({
        model: App.Models.Item
    });


//Вью для коллекции
    App.Views.Item = Backbone.View.extend({
        initialize: function () {
            this.model.on('change', this.render, this);
        },
        tagName: 'li',
        template: template('itemTemplate'),
        render: function () {
            var template = this.template(this.model.toJSON());
            this.$el.html(this.model.get('name'));
            return this;
        },
        events: {
            'click .edit': 'editItem'
        },
        editItem: function () {
            var nameItem = prompt('Новое название товара?', this.model.get('name'));
            this.model.set('name', nameItem);
        }
    });

    App.Views.Items = Backbone.View.extend({
        tagName: 'ul',
        render: function () {
            this.collection.each(this.addOne, this);
            return this;
        },
        addOne: function (items) {
            var itemView = new App.Views.Item({model: items});
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
    $('.search').html(itemsView.render().el);


});
import './styles.scss';
