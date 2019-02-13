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
            // var self = this;
            // if (this.get('sid') !== '') {
            //     self.set();
            // }
        }
    });

    // Вью для формы поиска
    App.Views.SearchForm = Backbone.View.extend({
        initialize: function () {
            this.render();
        },
        events: {
            'click #first-search': 'editSearch',
            'click #search-button': 'backToFirstView'
        },

        editSearch: function () {
            let valueInput = $('.text-value').val();
            valueInput = valueInput.replace(/ /g, ',');

            if (valueInput !== '') {
                this.collection.reset();
                this.render();
                this.collection.fetch({
                    data: {
                        sids: valueInput
                    }
                });
                $('.search-sid').addClass('not-display');
                $('.search-result').removeClass('not-display');

                this.itemTemplate = template($('#item-template').html());
                this.$('.search-list').html('');
                this.listenTo(this.collection, 'sync', function () {
                    this.$('.search-list').html('');
                    this.collection.each(model => {
                        const template = this.itemTemplate(model.toJSON());
                        this.$('.search-list').append(template);
                    })
                });
            }
        },

        backToFirstView: function () {
            $('.text-value').val('');
            $('.search-sid').removeClass('not-display');
            $('.search-result').addClass('not-display');
        }
    });

    //Вью для карточки товара
    App.Views.CartItem = Backbone.View.extend({
        initialize: function () {
        },
        render: function () {
        },
        events: {
            'click #search-button': 'searchSid'
        },
    });

    let items = new App.Collections.Items();

    let cartView = new App.Views.CartItem({
        el: '.search',
        collection: items
    });

    let search = new App.Views.SearchForm({
        el: '.searchNew',
        collection: items
    });
});
