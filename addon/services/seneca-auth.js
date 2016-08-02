import Ember from 'ember';

const {
  isEmpty,
  RSVP,
  $
} = Ember;

/**
 * The ember-simple-auth authenticator
 *
 * @class seneca-auth
 * @namespace services
 * @module ember-seneca-auth
 */
export default Ember.Service.extend({
  jQuery: $,

  /**
   * @method login
   * @param {String} identification
   * @param {String} password
   * @return {Ember.RSVP.Promise}
   * @public
   */
  login(identification, password) {
    const data = {
      username: identification,
      password: password
    };

    return this._makeRequest('POST', '/auth/login', null, data);
  },

  /**
   * @method logout
   * @return {Ember.RSVP.Promise}
   * @public
   */
  logout() {
    return this._makeRequest('POST', '/auth/logout');
  },

  /**
   * @method user
   * @return {Ember.RSVP.Promise}
   * @public
   */
  user() {
    return this._makeRequest('GET', '/auth/user');
  },

  /**
   * @method register
   * @param {String} emailAddress
   * @param {String} password
   * @param {String} repeat
   * @param {String} nick
   * @param {String} name
   * @return {Ember.RSVP.Promise}
   * @public
   */
  register(emailAddress, password, repeat, nick, name) {
    const data = {
      email: emailAddress,
      password: password,
      repeat: repeat,
      nick: nick,
      name: name
    };

    return this._makeRequest('POST', '/auth/register', null, data);
  },

  /**
   * @method createReset
   * @param {String} emailAddress
   * @param {String} nick
   * @return {Ember.RSVP.Promise}
   * @public
   */
  createReset(emailAddress, nick) {
    const data = {
      email: emailAddress,
      nick: nick
    };

    return this._makeRequest('POST', '/auth/create_reset', null, data);
  },

  /**
   * @method loadReset
   * @param {String} token
   * @return {Ember.RSVP.Promise}
   * @public
   */
  loadReset(token) {
    return this._makeRequest('POST', '/auth/load_reset', null, {token});
  },

  /**
   * @method executeReset
   * @param {String} token
   * @param {String} password
   * @param {String} repeat
   * @return {Ember.RSVP.Promise}
   * @public
   */
  executeReset(token, password, repeat) {
    const data = {
      token,
      password,
      repeat
    };

    return this._makeRequest('POST', '/auth/execute_reset', null, data);
  },

  /**
   * @method updateUser
   * @param {String} newNick
   * @param {String} oldNick
   * @param {String} newEmailAddress
   * @param {String} oldEmailAddress
   * @return {Ember.RSVP.Promise}
   * @public
   */
  updateUser(newNick, oldNick, newEmailAddress, oldEmailAddress) {
    const data = {
      nick: newNick,
      orig_nick: oldNick,
      email: newEmailAddress,
      orig_email: oldEmailAddress
    };

    return this._makeRequest('POST', '/auth/update_user', null, data);
  },

  /**
   * @method changePassword
   * @param {String} password
   * @param {String} repeat
   * @return {Ember.RSVP.Promise}
   * @public
   */
  changePassword(password, repeat) {
    const data = {
      password,
      repeat
    };

    return this._makeRequest('POST', '/auth/change_password', null, data);
  },

  /**
   * @method makeRequest
   * @param {String} type
   * @param {String} url
   * @param {Object} [headers={}]
   * @param {Object} [data=null]
   * @return {Ember.RSVP.Promise}
   * @private
   */
  _makeRequest(type, url, headers = {}, data = null) {
    if (!type) {
      throw new Error('type must be provided');
    }
    if (!url) {
      throw new Error('url must be provided');
    }
    if (url === '/') {
      throw new Error('url must not be root index. This causes ember-cli or mocha to throw some weird beforeEach/afterEach hook exceptions');
    }

    const options = {
      url,
      data: data != null ? JSON.stringify(data) : null,
      type: type,
      dataType: 'json',
      contentType: 'application/json',
      headers: headers || {}
    };

    if (isEmpty(Object.keys(options.headers))) {
      delete options.headers;
    }

    return new RSVP.Promise((resolve, reject) => {
      this.jQuery.ajax(options).then((response) => {
        resolve(response);
      }, (xhr) => {
        reject(xhr);
      });
    });
  }
});
