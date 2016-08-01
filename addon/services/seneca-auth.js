import Ember from 'ember';

const {
  RSVP
} = Ember;

export default Ember.Service.extend({
  client: Ember.inject.service('seneca-auth-client'),

  login(username, password) {
    const data = {
      username,
      password
    };

    return this.get('client')
      .makeRequest('POST', '/auth/login', null, data);
  },

  logout() {
    return this.get('client')
      .makeRequest('POST', '/auth/logout');
  },

  user() {
    return this.get('client')
      .makeRequest('GET', '/auth/user');
  },

  register(emailAddress, password, nick, name) {
    const data = {
      email: emailAddress,
      password: password,
      nick: nick,
      name: name
    };

    return this.get('client')
      .makeRequest('POST', '/auth/register', null, data);
  },

  createReset(emailAddress, nick) {
    const data = {
      email: emailAddress,
      nick: nick
    };

    return this.get('client')
      .makeRequest('POST', '/auth/create_reset', null, data);
  },

  loadReset(token) {
    return this.get('client')
      .makeRequest('POST', '/auth/load_reset', null, {token});
  },

  executeReset(token, password, repeat) {
    const data = {
      token,
      password,
      repeat
    };

    return this.get('client')
      .makeRequest('POST', '/auth/execute_reset', null, data);
  },

  updateUser() {
    return RSVP.reject();
  },

  changePassword() {
    return RSVP.reject();
  }
});
