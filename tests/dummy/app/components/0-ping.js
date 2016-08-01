import Ember from 'ember';
import layout from '../templates/components/0-ping';
import FeatureBase from './feature-base';

const {
  $: jQuery
} = Ember;

export default FeatureBase.extend({
  layout,

  actions: {
    submit() {
      this.set('response', null);
      this.set('xhr', null);

      const options = {
        url: '/ping',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json'
      };

      jQuery.ajax(options).then(
        (response) => this.set('response', response),
        (xhr) => this.set('xhr', xhr));
    }
  }
});
