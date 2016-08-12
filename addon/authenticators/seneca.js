import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
import getOwner from 'ember-getowner-polyfill';

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
   * @return {Ember.RSVP.Promise}
   * @public
   * @override
   */
  authenticate(identification, password) {
    const self = this;
    
    return new RSVP.Promise((resolve, reject) => {
      const senecaAuth = this.get('senecaAuth');
      senecaAuth.login(identification, password).then((response) => {
        if (!self._isOk(response)) {
          return reject(response['why'] || 'no-reason');
        }
        if (!self._hasLoginWithToken(response)) {
          return reject('no-token');
        }
        
        self._assignFromUser(response, self._getOptions());
        
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
   * Uses [senece-auth.user()](#module_seneca-auth..user) to get the login and user data from the server. The
   * server responds with ok:true and no login object if the session is not valid or was invalidated.
   *
   * @method restore
   * @return {Ember.RSVP.Promise}
   * @public
   * @override
   */
  restore(/*data*/) {
    const self = this;
    
    return new RSVP.Promise((resolve, reject) => {
      const senecaAuth = this.get('senecaAuth');
      senecaAuth.user().then((response) => {
        if (!self._isOk(response)) {
          return reject(response['why'] || 'no-reason');
        }
        if (!response['login']) {
          return reject('invalid-session');
        }
        if (!self._hasLoginWithToken(response)) {
          return reject('no-token');
        }
        
        self._assignFromUser(response, self._getOptions());
        
        return resolve(response['login']);
      });
    });
  },
  
  /**
   * @method _getOptions
   * @returns {Object}
   * @private
   */
  _getOptions() {
    return getOwner(this).resolveRegistration('config:environment')['seneca-auth'] || {};
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
  },
  
  /**
   * Assigns properties from the user object to the login object based on `options.assignFromUser`.
   *
   * @method _assignFromUser
   * @param {Object} response
   * @param {Object} options
   * @private
   */
  _assignFromUser(response, options) {
    if (options && options.assignFromUser) {
      var keys = Ember.isArray(options.assignFromUser) ? options.assignFromUser :
        (typeof options.assignFromUser === 'string' ? [options.assignFromUser] : Object.keys(response['user']));
      for (var i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key !== 'id' && response['user'].hasOwnProperty(key)) {
          response['login'][key] = response['user'][key];
        }
      }
    }
  }
});
