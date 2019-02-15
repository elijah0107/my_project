import Backbone from 'backbone';
import template from 'lodash/template';
import $ from 'jquery';

const SearchForm = Backbone.View.extend({
    initialize: function () {
        this.render();
        this.listenTo(this.collection, 'sync', function () {
            this.$('.search-list').html('');
            this.collection.each(model => {
                const template = this.itemTemplate(model.toJSON());
                this.$('.search-list').append(template);
            })
        });
    },
    events: {
        'click #first-search': 'editSearch',
        'click #search-button': 'backToFirstView',
        'click .js-item-more-button': 'openDetails',
    },

    editSearch () {
        let valueInput = this.$('.text-value').val();
        valueInput = valueInput.replace(/\s+/g, ',');

        if (valueInput !== '') {
            this.collection.reset();
            this.render();
            this.collection.fetch({
                data: {
                    sids: valueInput
                }
            });
            this.$('.search-sid').addClass('not-display');
            this.$('.search-result').removeClass('not-display');

            this.itemTemplate = template($('#item-template').html());
            this.$('.search-list').html('');
        }
    },

    openDetails () {
        let sid = this.$(event.target).data('item-sid');
        console.log(sid);
        Backbone.trigger('on-click-more-button');
    },

    backToFirstView () {
        this.$('.text-value').val('');
        this.$('.search-sid').removeClass('not-display');
        this.$('.search-result').addClass('not-display');
        $('.cart-item').addClass('not-display');
    },
});
export default SearchForm;
