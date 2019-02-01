import './styles.scss'
import Backbone from 'backbone';
import template from 'lodash/template';
import $ from 'jquery';
import lodash from 'lodash';

window._ = lodash;

$(function () {
    window.App = {
        Models: {},
        Collections: {},
        Views: {}
    };

    App.Models.Item = Backbone.Model.extend();

    App.Collections.Items = Backbone.Collection.extend({
        model: App.Models.Item,
        url: 'http://www.sima-land.ru/api/v3/search',
        parse(response) {
            return response.items;
        }
    });


    //Вью для коллекции
    App.Views.ItemsList = Backbone.View.extend({
        initialize: function () {
            this.itemTemplate = template($('#item-template').html());
            this.listenTo(this.collection, 'sync', function () {
                this.collection.each(model => {
                    const template = this.itemTemplate(model.toJSON());
                    this.$el.append(template);
                })
            })
        },
        render: function () {
            // this.collection.each(model => {
                // const template = this.itemTemplate(model.toJSON());
                // this.$el.append(template);
                // console.log(model.toJSON());
            // });
        },
        addOne: function (items) {
            let itemView = new App.Views.Item({model: items});
            this.$el.append(itemView.render());
        },
        events: {
            'click #search-button': 'editSearch'
        },
        editSearch: function () {
            let valueInput = $('.text-value').val();
            console.log(valueInput);
        }
    });


    let items = new App.Collections.Items();
    items.fetch();

// var item = new App.Models.Item({
//     name: 'Название товара',
//     price: 100,
//     description: 'Описание товара'
// });
    let itemsView = new App.Views.ItemsList({
        el: '.search',
        collection: items
    });
    itemsView.render();
});
