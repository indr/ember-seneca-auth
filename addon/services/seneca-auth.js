import Ember from 'ember';

/**
 * The ember-simple-auth authenticator
 *
 * @class seneca-auth
 * @namespace services
 * @module ember-seneca-auth
 */
export default Ember.Service.extend({
  client: Ember.inject.service('seneca-auth-client'),

  /**
   * @method login
   * @param {String} identification
   * @param {String} password
   * @return {Ember.RSVP.Promise}
   * @public
   */
  login(identification, password) {
    const data = {
      identification,
      password
    };

    return this.get('client')
      .makeRequest('POST', '/auth/login', null, data);
  },

  /**
   * @method logout
   * @return {Ember.RSVP.Promise}
   * @public
   */
  logout() {
    return this.get('client')
      .makeRequest('POST', '/auth/logout');
  },

  /**
   * @method user
   * @return {Ember.RSVP.Promise}
   * @public
   */
  user() {
    return this.get('client')
      .makeRequest('GET', '/auth/user');
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

    return this.get('client')
      .makeRequest('POST', '/auth/register', null, data);
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

    return this.get('client')
      .makeRequest('POST', '/auth/create_reset', null, data);
  },

  /**
   * @method loadReset
   * @param {String} token
   * @return {Ember.RSVP.Promise}
   * @public
   */
  loadReset(token) {
    return this.get('client')
      .makeRequest('POST', '/auth/load_reset', null, {token});
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

    return this.get('client')
      .makeRequest('POST', '/auth/execute_reset', null, data);
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

    return this.get('client')
      .makeRequest('POST', '/auth/update_user', null, data);
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

    return this.get('client')
      .makeRequest('POST', '/auth/change_password', null, data);
  }
});
