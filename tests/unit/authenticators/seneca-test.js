/* jshint expr:true */
import assert from '../../helpers/assert';
import Ember from 'ember';
import {
  describeModule,
  it
} from 'ember-mocha';
import {
  beforeEach,
  describe
} from 'mocha';

const {
  RSVP
} = Ember;

describeModule(
  'authenticator:seneca',
  'Unit | SenecaAuthenticator',
  {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  },
  function () {
    let authenticator = null;
    let senecaAuth = null;
    
    beforeEach(function () {
      authenticator = this.subject();
      authenticator._getOptions = function () {
        return {};
      };
      authenticator.senecaAuth = senecaAuth = {
        login: function () {
          this.lastArgs = Ember.A(arguments);
          return Ember.RSVP.reject();
        },
        logout: function () {
          this.lastArgs = Ember.A(arguments);
          return Ember.RSVP.reject();
        }
      };
    });
    
    describe('restore()', function () {
      it('rejects with no-token if login data has no token', function (done) {
        authenticator.restore(null)
          .catch((reason) => {
            assert.equal(reason, 'no-token');
            done();
          });
      });
      
      it('resolves with login data', function (done) {
        const login = {
          "nick": "nu1",
          "user": "dhmwcf",
          "when": "2016-07-31T09:06:05.692Z",
          "active": true,
          "why": "password",
          "email": "u1@example.com",
          "token": "0ead1216-20de-49a6-bacf-f432a8cb7de6",
          "id": "0ead1216-20de-49a6-bacf-f432a8cb7de6"
        };
        authenticator.restore(login)
          .then((result) => {
            assert.strictEqual(result, login);
            done();
          });
      });
    });
    
    describe('authenticate()', function () {
      it('logins with username and password', function (done) {
        senecaAuth.login = function (username, password) {
          assert.equal(username, 'user');
          assert.equal(password, 'pass');
          done();
          return RSVP.reject();
        };
        authenticator.authenticate('user', 'pass');
      });
      
      it('invalid login: rejects with why/reason', function (done) {
        senecaAuth.login = function () {
          return RSVP.resolve({"ok": false, "why": 'just cause'});
        };
        authenticator.authenticate('user', 'pass')
          .catch((reason) => {
            assert.equal(reason, 'just cause');
            done();
          });
      });
      
      it('invalid login/no why: rejects with no-reason', function (done) {
        senecaAuth.login = function () {
          return RSVP.resolve({"ok": false});
        };
        authenticator.authenticate('user', 'pass')
          .catch((reason) => {
            assert.equal(reason, 'no-reason');
            done();
          });
      });
      
      it('successful login: resolves with login data', function (done) {
        senecaAuth.login = function () {
          return RSVP.resolve({
            "ok": true,
            "login": {
              "nick": "nu1",
              "user": "dhmwcf",
              "when": "2016-07-31T09:06:05.692Z",
              "active": true,
              "why": "password",
              "email": "u1@example.com",
              "token": "0ead1216-20de-49a6-bacf-f432a8cb7de6",
              "id": "0ead1216-20de-49a6-bacf-f432a8cb7de6"
            }
          });
        };
        authenticator.authenticate('user', 'pass')
          .then((login) => {
            assert.equal(login.user, 'dhmwcf');
            assert.equal(login.why, 'password');
            done();
          });
      });
      
      it('successful login without token: rejects with no-token', function (done) {
        senecaAuth.login = function () {
          return RSVP.resolve({
            "ok": true,
            "login": {
              "nick": "nu1",
              "user": "dhmwcf",
              "when": "2016-07-31T09:06:05.692Z",
              "active": true,
              "why": "password",
              "email": "u1@example.com",
              //"token": "0ead1216-20de-49a6-bacf-f432a8cb7de6",
              "id": "0ead1216-20de-49a6-bacf-f432a8cb7de6"
            }
          });
        };
        authenticator.authenticate('user', 'pass')
          .catch((reason) => {
            assert.equal(reason, 'no-token');
            done();
          });
      });
      
      describe('assignFromUser', function () {
        const response = {
          "user": {
            "nick": "nu1",
            "email": "u1@example.com",
            "name": "u1",
            "when": "2016-08-12T01:23:30.443Z",
            "id": "wdm801",
            "custom1": "value1",
            "custom2": "value2"
          },
          "login": {
            "nick": "nu1",
            "user": "wdm801",
            "when": "2016-08-12T02:17:06.914Z",
            "active": true,
            "why": "password",
            "email": "u1@example.com",
            "token": "fcccca07-dae8-4f33-b0ad-26774850e91c",
            "id": "gcccca07-dae8-4f33-b0ad-26774850e91c"
          },
          "ok": true
        };
        
        beforeEach(function () {
          senecaAuth.login = function () {
            return RSVP.resolve(response);
          };
        });
        
        it("assignFromUser: false", function (done) {
          authenticator._getOptions = function () {
            return {assignFromUser: false};
          };
          authenticator.authenticate('user', 'pass').then((login) => {
            assert.equal(login.id, 'gcccca07-dae8-4f33-b0ad-26774850e91c');
            assert.equal(login.user, 'wdm801');
            assert.equal(login.why, 'password');
            assert.equal(login.token, 'fcccca07-dae8-4f33-b0ad-26774850e91c');
            assert.notProperty(login, 'custom1');
            assert.notProperty(login, 'custom2');
            assert.notProperty(login, 'name');
            done();
          });
        });
        
        it("assignFromUser: 'custom1'", function (done) {
          authenticator._getOptions = function () {
            return {assignFromUser: 'custom1'};
          };
          authenticator.authenticate('user', 'pass').then((login) => {
            assert.equal(login.id, 'gcccca07-dae8-4f33-b0ad-26774850e91c');
            assert.equal(login.user, 'wdm801');
            assert.equal(login.why, 'password');
            assert.equal(login.token, 'fcccca07-dae8-4f33-b0ad-26774850e91c');
            assert.equal(login.custom1, 'value1');
            assert.notProperty(login, 'custom2');
            assert.notProperty(login, 'name');
            done();
          });
        });
        
        it("assignFromUser: ['custom1','name']", function (done) {
          authenticator._getOptions = function () {
            return {assignFromUser: ['custom1', 'name']};
          };
          authenticator.authenticate('user', 'pass').then((login) => {
            assert.equal(login.id, 'gcccca07-dae8-4f33-b0ad-26774850e91c');
            assert.equal(login.user, 'wdm801');
            assert.equal(login.why, 'password');
            assert.equal(login.token, 'fcccca07-dae8-4f33-b0ad-26774850e91c');
            assert.equal(login.custom1, 'value1');
            assert.notProperty(login, 'custom2');
            assert.equal(login.name, 'u1');
            done();
          });
        });
        
        it("assignFromUser: true", function (done) {
          authenticator._getOptions = function () {
            return {assignFromUser: true};
          };
          authenticator.authenticate('user', 'pass').then((login) => {
            assert.equal(login.id, 'gcccca07-dae8-4f33-b0ad-26774850e91c');
            assert.equal(login.user, 'wdm801');
            assert.equal(login.why, 'password');
            assert.equal(login.token, 'fcccca07-dae8-4f33-b0ad-26774850e91c');
            assert.equal(login.custom1, 'value1');
            assert.equal(login.custom2, 'value2');
            assert.equal(login.name, 'u1');
            done();
          });
        });
      });
    });
    
    describe('invalidate()', function () {
      it('it resolves after logout ', function (done) {
        senecaAuth.logout = function () {
          return RSVP.resolve('ok');
        };
        authenticator.invalidate()
          .then((result) => {
            assert.equal(result, 'ok');
            done();
          });
      });
      
      it('resolves even if logout rejects', function (done) {
        senecaAuth.logout = function () {
          return RSVP.reject('thats why');
        };
        authenticator.invalidate()
          .then((result) => {
            assert.equal(result, 'thats why');
            done();
          });
      });
    });
  }
);
