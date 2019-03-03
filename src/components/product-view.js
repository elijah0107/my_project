import Backbone from 'backbone';
import template from 'lodash/template';
import $ from 'jquery';

const ProductView = Backbone.View.extend({
    initialize: function () {
        this.listenTo(Backbone, 'on-click-more-button', function ({ sid }) {
            this.render();
            this.collection.fetch({
                data: {
                    sid: sid,
                    expand: 'description, photo_sizes',
                }
            });
            this.itemTemplate = template($('#cart-template').html());
            this.listenTo(this.collection, 'sync', function () {
                this.$('.cart-atributes').html('');
                this.collection.each(model => {
                    const template = this.itemTemplate(model.toJSON());
                    this.$('.cart-atributes').append(template);
                })
            });
            this.$el.removeClass('not-display');
        });
    },
    events: {
        'click .characteristic': 'openCharacteristic',
        'click .description': 'openDescription'
    },
    openCharacteristic: function () {
        this.$('.description-value').addClass('not-display');
        this.$('.characteristic-value').removeClass('not-display');
        $('.characteristic').addClass('selected');
        $('.description').removeClass('selected');
    },
    openDescription: function () {
        this.$('.characteristic-value').addClass('not-display');
        this.$('.description-value').removeClass('not-display');
        $('.description').addClass('selected');
        $('.characteristic').removeClass('selected');
    }
});

export default ProductView;
