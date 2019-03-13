import Backbone from 'backbone';
import template from 'lodash/template';
import $ from 'jquery';
import SearchForm from './search-form';

const ProductView = Backbone.View.extend({
  events: {
    'click .js-characteristic': 'openCharacteristic',
    'click .js-description': 'openDescription',
  },
  initialize() {
    this.itemTemplate = template($('#cart-template').html());
    this.listenTo(Backbone, 'on-click-more-button', function ({ sid }) {
      this.collection.fetch({
        data: {
          sid,
          expand: 'description, photo_sizes',
        },
      });
    });
    this.listenTo(this.collection, 'sync', this.render);
    Backbone.on('back-to-step-one', () => {
      this.$el.addClass('not-display');
    });
  },
  render() {
    this.$('.cart-atributes').html('');
    this.collection.each((model) => {
      const template = this.itemTemplate(model.toJSON());
      this.$('.cart-atributes').append(template);
    });
    this.$el.removeClass('not-display');
  },
  openCharacteristic() {
    this.$('.description-value').addClass('not-display');
    this.$('.characteristic-value').removeClass('not-display');
    this.$('.js-characteristic').addClass('selected');
    this.$('.js-description').removeClass('selected');
  },
  openDescription() {
    this.$('.characteristic-value').addClass('not-display');
    this.$('.description-value').removeClass('not-display');
    this.$('.js-description').addClass('selected');
    this.$('.js-characteristic').removeClass('selected');
  },
});

export default ProductView;
