import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

const {
  isEmpty,
  RSVP
} = Ember;

export default Base.extend({
  senecaAuth: Ember.inject.service('seneca-auth'),

  restore(/*data*/) {
    return this._super(...arguments);
  },

  authenticate(username, password) {
    const self = this;
    const senecaAuth = this.get('senecaAuth');

    return new RSVP.Promise((resolve, reject) => {
      senecaAuth.login(username, password)
        .then((response) => {
          if (self._isOk(response)) {
            if (self._hasToken(response)) {
              return resolve(response['login']);
            }
            else {
              return reject('no-token');
            }
          }
          return reject(response['why'] || 'no-reason');
        });
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
