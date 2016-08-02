import Ember from 'ember';
import layout from '../templates/components/feature-base';

export default Ember.Component.extend({
  layout,
  senecaAuth: Ember.inject.service(),

  customData: '{}',
  response: null,
  xhr: null,

  getCustomData() {
    const data = this.get('customData');
    return Ember.isBlank(data) ? null : JSON.parse(data);
  },

  handleResult(promise) {
    const self = this;
    self.set('response', false);
    self.set('xhr', false);

    promise
      .then((response) =>
        self.set('response', response))
      .catch((xhr) =>
        self.set('xhr', {
          status: xhr.status,
          responseText: xhr.responseText
        }));
  }
});
