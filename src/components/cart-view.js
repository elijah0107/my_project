import Backbone from 'backbone';
import template from 'lodash/template';
import $ from 'jquery';

const CartView = Backbone.View.extend({
    initialize: function () {
        this.listenTo(Backbone, 'on-click-more-button', function () {
            $('.cart-item').removeClass('not-display');
            console.log(this.collection);
            this.render();
            this.collection.fetch();
            this.itemTemplate = template($('#cart-template').html());
            this.listenTo()
            this.$('.cart-atributes').html('');
            this.collection.each(model => {
                const template = this.itemTemplate(model.toJSON());
                this.$('.cart-atributes').append(template);
            })
        });
    },
    events: {
    },
});

export default CartView;
