import Backbone from 'backbone';
import template from 'lodash/template';
import $ from 'jquery';

const SearchForm = Backbone.View.extend({
  initialize() {
    this.itemTemplate = template($('#item-template').html());
    this.listenTo(this.collection, 'sync', this.render);
  },
  events: {
    'click .js-first-search': 'editSearch',
    'click .js-search-button': 'backToFirstView',
    'click .js-item-more-button': 'openDetails',
  },
  render() {
    this.$('.search-list').html('');
    this.collection.each((model) => {
      const template = this.itemTemplate(model.toJSON());
      this.$('.search-list').append(template);
    });
  },

  editSearch() {
    let valueInput = this.$('.text-value').val();
    valueInput = valueInput.replace(/\s+/g, ',');

    if (valueInput !== '') {
      this.collection.reset();
      this.render();
      this.collection.fetch({
        data: {
          sids: valueInput,
        },
      });
      this.$('.search-sid').addClass('not-display');
      this.$('.search-result').removeClass('not-display');
      this.$('.search-list').html('');
    }
  },

  openDetails(event) {
    const sid = this.$(event.target).data('item-sid');
    Backbone.trigger('on-click-more-button', { sid });
  },

  backToFirstView() {
    this.$('.text-value').val('');
    this.$('.search-sid').removeClass('not-display');
    this.$('.search-result').addClass('not-display');
    Backbone.trigger('back-to-step-one');
  },
});
export default SearchForm;
