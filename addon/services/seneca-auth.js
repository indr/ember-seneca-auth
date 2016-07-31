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

  register() {
    return RSVP.reject();
  },

  createReset() {
    return RSVP.reject();
  },

  loadReset() {
    return RSVP.reject();
  },

  executeReset() {
    return RSVP.reject();
  },

  updateUser() {
    return RSVP.reject();
  },

  changePassword() {
    return RSVP.reject();
  }
});
