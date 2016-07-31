import Ember from 'ember';

const { RSVP } = Ember;

export default Ember.Service.extend({
  login() {
    return RSVP.reject();
  },

  logout() {
    return RSVP.reject();
  },

  user() {
    return RSVP.reject();
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
