import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

const {
  isEmpty,
  RSVP
} = Ember;

export default Base.extend({
  senecaAuth: Ember.inject.service('seneca-auth'),

  restore(data) {
    const self = this;

    return new RSVP.Promise((resolve, reject) => {
      if (!self._hasToken(data)) {
        reject('no-token');
      }
      else {
        resolve(data);
      }
    });
  },

  authenticate(username, password) {
    const self = this;
    const senecaAuth = this.get('senecaAuth');

    return new RSVP.Promise((resolve, reject) => {
      senecaAuth.login(username, password)
        .then((response) => {
          if (self._isOk(response)) {
            if (self._hasLoginWithToken(response)) {
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
    const senecaAuth = this.get('senecaAuth');

    return new RSVP.Promise((resolve) => {
      senecaAuth.logout()
        .then(resolve)
        .catch(resolve);
    });
  },

  _isOk(response) {
    return !isEmpty(response['ok']) && response['ok'] === true;
  },

  _hasLoginWithToken(response) {
    return !isEmpty(response['login']) && this._hasToken(response['login']);
  },

  _hasToken(login) {
    return login && !isEmpty(login['token']);
  }
});
