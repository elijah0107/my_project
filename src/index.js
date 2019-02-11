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
            console.log(this.collection);
            this.on('change:searchSid', this.filterBySid, this);
            this.collection.on('reset', this.render, this)
        },
        render: function () {
        },
        events: {
            'click #search-button': 'searchSid'
        },

        searchSid: function (e) {
            this.searchSid = e.target.value;
            this.trigger('change:searchSid');
        },

        filterBySid: function () {
            this.collection.reset(this.collection.models, {silent: true});
            let valueInput = $('.text-value').val();
            var searchBySid = this.searchSid,
                filtered = _.filter(this.collection.models, function (item) {
                    if (valueInput == item.get('sid')) {
                        return String(item.get('sid')).toLowerCase().indexOf(searchBySid.toLowerCase()) !== -1
                    }
                });
            this.collection.reset(filtered);
            this.$('.search-list').html('');
            this.collection.each(model => {
                const template = this.itemTemplate(model.toJSON());
                this.$('.search-list').append(template);
            })
        }
    });

    App.Views.SearchForm = Backbone.View.extend({
        initialize: function () {

        },
        events: {
            'click #first-search': 'firstSearch'
        },
        firstSearch: function () {

        }
    });

    let items = new App.Collections.Items();

    let itemsView = new App.Views.ItemsList({
        el: '.search',
        collection: items
    });

    let search = new App.Views.SearchForm({
       el: '.search-sid'
    });
});
