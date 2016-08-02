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

    return this._makeRequest('/auth/login', 'POST', null, data);
  },

  /**
   * @method logout
   * @return {Ember.RSVP.Promise}
   * @public
   */
  logout() {
    return this._makeRequest('/auth/logout', 'POST');
  },

  /**
   * @method user
   * @return {Ember.RSVP.Promise}
   * @public
   */
  user() {
    return this._makeRequest('/auth/user', 'GET');
  },

  /**
   * @method register
   * @param {String} emailAddress
   * @param {String} password
   * @param {String} repeat
   * @param {String} nick
   * @param {String} name
   * @param {Object} [data={}]
   * @return {Ember.RSVP.Promise}
   * @public
   */
  register(emailAddress, password, repeat, nick, name, data = {}) {
    data = Ember.assign({
      email: emailAddress,
      password: password,
      repeat: repeat,
      nick: nick,
      name: name
    }, data);

    return this._makeRequest('/auth/register', 'POST', null, data);
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

    return this._makeRequest('/auth/create_reset', 'POST', null, data);
  },

  /**
   * @method loadReset
   * @param {String} token
   * @return {Ember.RSVP.Promise}
   * @public
   */
  loadReset(token) {
    return this._makeRequest('/auth/load_reset', 'POST', null, {token});
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

    return this._makeRequest('/auth/execute_reset', 'POST', null, data);
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

    return this._makeRequest('/auth/update_user', 'POST', null, data);
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

    return this._makeRequest('/auth/change_password', 'POST', null, data);
  },

  /**
   * @method _makeRequest
   * @param {String} url
   * @param {String} [type='GET']
   * @param {Object} [headers={}]
   * @param {Object} [data=null]
   * @return {Ember.RSVP.Promise}
   * @private
   */
  _makeRequest(url, type = 'GET', headers = {}, data = null) {
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
      this.jQuery.ajax(options).then(resolve, reject);
    });
  }
});
