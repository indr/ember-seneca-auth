import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

const {
  isEmpty
} = Ember;

export default Base.extend({
  senecaAuth: Ember.inject.service('seneca-auth'),

  restore(/*data*/) {
    return this._super(...arguments);
  },

  authenticate(username, password) {
    const senecaAuth = this.get('senecaAuth');

    return senecaAuth.login(username, password)
      .then((response) => {
        if (this._isOk(response)) {
          if (this._hasToken(response)) {
            return response['login'];
          }
          return 'no-token';
        }
        return response['why'] || 'no-reason';
      });
  },

  invalidate(/*data*/) {
    return this._super(...arguments);
  },

  _isOk(response) {
    return !isEmpty(response['ok']) && response['ok'] === true;
  },

  _hasToken(response) {
    return !isEmpty(response['login']) && !isEmpty(response['login']['token']);
  }
});
