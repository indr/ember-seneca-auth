import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

const {
  isEmpty,
  RSVP
} = Ember;

/**
 * @namespace authenticators
 * @module seneca
 * @extends BaseAuthenticator
 */
export default BaseAuthenticator.extend({
  senecaAuth: Ember.inject.service('seneca-auth'),
  
  /**
   * Authenticates the session with the specified identification and password.
   *
   * Uses [seneca-auth.login()](#module_seneca-auth..login) to perform the authentication against the back end.
   *
   * @method authenticate
   * @param {String} identification The username or email address to authenticate.
   * @param {String} password The users password.
   * @param {Object} [options=null] An object to configure the response.
   * @param {Boolean} [options.user] Replaces the `login.user` (user id) with the responses
   * `user` object. This gives access to user specific data (i.e. data set with
   * [seneca-auth.updateUser()](#module_seneca-auth..updateUser)). The user id is
   * then accessible via `login.user.id` respectively `session.get('data.authenticated.user.id')`.
   * @return {Ember.RSVP.Promise}
   * @public
   * @override
   */
  authenticate(identification, password, options = null) {
    const self = this;
    const senecaAuth = this.get('senecaAuth');
    
    return new RSVP.Promise((resolve, reject) => {
      senecaAuth.login(identification, password).then((response) => {
        if (!self._isOk(response)) {
          return reject(response['why'] || 'no-reason');
        }
        if (!self._hasLoginWithToken(response)) {
          return reject('no-token');
        }
        if (options && options.user) {
          response['login']['user'] = response['user'];
        }
        return resolve(response['login']);
      });
    });
  },
  
  /**
   * Invalidates the current session.
   *
   * Uses [seneca-auth.logout()](#module_seneca-auth..login) to inform the back-end to invalidate the session.
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
   * @param {Object} data The login data
   * @param {String} data.token The login token
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
