import Backbone from 'backbone';
import template from 'lodash/template';
import $ from 'jquery';
import valueInput from './search-form';

const CartForm = Backbone.View.extend({
    initialize: function () {
        this.render();
        this.collection.fetch({
            data: {
                sids: valueInput
            }
        });
        this.itemTemplate = template($('#cart-template').html());
        this.$('.cart-atributes').html('');
        this.listenTo(this.collection, 'sync', function () {
            this.$('.cart-atributes').html('');
            this.collection.each(model => {
                const template = this.itemTemplate(model.toJSON());
                this.$('.cart-atributes').append(template);
            })
        })
    },
    events: {
    },
});

export default CartForm;
