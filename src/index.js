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

    App.Models.ItemModel = Backbone.Model.extend();

    App.Collections.Items = Backbone.Collection.extend({
        model: App.Models.ItemModel,
        url: 'http://www.sima-land.ru/api/v3/search',
        parse(response) {
            return response.items;
        },
        initialize: function () {
            var self = this;
            if (this.get('sid') !== '') {
                self.set();
            }
        }
    });


    //Вью для коллекции
    App.Views.ItemsList = Backbone.View.extend({
        initialize: function () {
            this.itemTemplate = template($('#item-template').html());
            this.render();
            this.collection.fetch();
            this.listenTo(this.collection, 'sync reset', function () {
                this.$('.search-list').html('');
                this.collection.each(model => {
                    const template = this.itemTemplate(model.toJSON());
                    this.$('.search-list').append(template);
                })
            });
            this.on('change:editSearch', this.filterBySearch, this);

            this.collection.on('reset', this.render, this)
        },
        render: function () {
            // this.collection.each(model => {
                // const template = this.itemTemplate(model.toJSON());
                // this.$el.append(template);
                // console.log(model.toJSON());
            // });
        },
        // addOne: function (items) {
        //     let itemView = new App.Views.Item({model: items});
        //     this.$el.append(itemView.render());
        // },
        events: {
            'keyup #searchValue': 'editSearch'
        },
        editSearch: function (e) {
            this.editSearch = e.target.value;
            this.trigger('change:editSearch');
            // let valueInput = $('.text-value').val();
            // return valueInput;
        },

        filterBySearch: function() {
            this.collection.reset(this.collection.models, {silent: true});
            var filterString = this.editSearch,
                filtered = _.filter(this.collection.models, function (item) {
                    return String(item.get('sid')).toLowerCase().indexOf(filterString.toLowerCase()) !== -1;
                });
            this.collection.reset(filtered);
        }
    });

    // let item = new App.Models.ItemModel();
    let items = new App.Collections.Items();
    // items.fetch();

    let itemsView = new App.Views.ItemsList({
        el: '.search',
        collection: items
    });
    // itemsView.render();
});
