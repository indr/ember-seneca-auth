import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

const {
  isEmpty,
  RSVP
} = Ember;

/**
 * @class seneca
 * @namespace authenticators
 * @module ember-seneca-auth
 * @extends ember-simple-auth/authenticators/base/BaseAuthenticator
 */
export default BaseAuthenticator.extend({
  senecaAuth: Ember.inject.service('seneca-auth'),

  /**
   * Authenticates the session with the specified identification and password.
   *
   * Uses {{#crossLink "services.seneca-auth/login:method"}}{{/crossLink}} to
   * perform the authentication against the back end.
   *
   * @method authenticate
   * @param {String} identification The username or email address to authenticate
   * @param {String} password The password
   * @return {Ember.RSVP.Promise}
   * @public
   * @override
   */
  authenticate(identification, password) {
    const self = this;
    const senecaAuth = this.get('senecaAuth');

    return new RSVP.Promise((resolve, reject) => {
      senecaAuth.login(identification, password)
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

  /**
   * Invalidates the current session.
   *
   * Uses {{#crossLink "services.seneca-auth/logout:method"}}{{/crossLink}} to indicate
   * that the session should be invalidate.
   *
   * The returned promise is always resolved.
   *
   * @method invalidate
   * @return {Ember.RSVP.Promise}
   * @public
   * @override
   */
  invalidate(/*data*/) {
    const senecaAuth = this.get('senecaAuth');

    return new RSVP.Promise((resolve) => {
      senecaAuth.logout()
        .then(resolve)
        .catch(resolve);
    });
  },

  /**
   * Tries to restore a previous session.
   *
   * The returned promise is resolved with `login` if a `login.token` is present.
   * Otherwise rejects with `'no-token'`.
   *
   * @method restore
   * @param {Object} login The login data
   * @param {String} login.token The login token
   * @return {Ember.RSVP.Promise}
   * @public
   * @override
   */
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

  /**
   * Tests whether `response` contains a property `'ok': true`.
   *
   * @method _isOk
   * @param {Object} response
   * @return {Boolean}
   * @private
   */
  _isOk(response) {
    return !isEmpty(response['ok']) && response['ok'] === true;
  },

  /**
   * Tests whether the response contains a property `login.token`.
   *
   * @method _hasLoginWithToken
   * @param {Object} response
   * @return {Boolean}
   * @private
   */
  _hasLoginWithToken(response) {
    return !isEmpty(response['login']) && this._hasToken(response['login']);
  },

  /**
   * Tests whether specified `login` contains a token.
   *
   * @method _hasToken
   * @param {Object} login
   * @return {Boolean}
   * @private
   */
  _hasToken(login) {
    return login && !isEmpty(login['token']);
  }
});
