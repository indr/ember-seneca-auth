/* jshint expr:true */
import { assert } from 'chai';
import Ember  from 'ember';
import {
  describeModule,
  it
} from 'ember-mocha';
import { v4 } from 'ember-uuid';
import {
  beforeEach,
  describe
} from 'mocha';

const {
  RSVP,
  $: jQuery
} = Ember;

describeModule(
  'service:seneca-auth',
  'Acceptance | SenecaAuthService',
  {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  },
  function () {
    let service = null;

    beforeEach(function () {
      service = this.subject();
    });

    describe('login()', function () {
      it('success: returns a resolving promise with ok true and login data', function (done) {
        service.login('u1@example.com', 'pu1')
          .then(function (response) {
            assert.equal(response.ok, true);

            const login = response.login;
            assert.equal(login.email, 'u1@example.com');
            assert.isString(login.token);
            assert.isAbove(login.token.length, 0);

            done();
          });
      });

      it('unknown user: returns a resolving promise with ok false and why', function (done) {
        service.login('unknown@example.com', 'password')
          .then(function (response) {
            assert.equal(response.ok, false);
            assert.equal(response.why, 'user-not-found');

            done();
          });
      });

      it('invalid password: returns a resolving promise ok false and why', function (done) {
        service.login('u1@example.com', 'wrong password')
          .then(function (response) {
            assert.equal(response.ok, false);
            assert.equal(response.why, 'invalid-password');

            done();
          });
      });
    });

    describe('logout()', function () {
      it('returns a resolving promise with ok true', function (done) {
        service.logout()
          .then(function (response) {
            assert.equal(response.ok, true);
            done();
          });
      });
    });

    describe('user()', function () {
      it('returns a resolving promise with ok true', function (done) {
        service.user()
          .then(function (response) {
            assert.equal(response.ok, true);
            done();
          });
      });
    });

    describe('register()', function () {
      it('success: it returns a resolving promise with ok true, user and login data', function (done) {
        const emailAddress = getRandomEmailAddress();
        const nick = getRandomNick();
        service.register(emailAddress, 'secret', 'secret', nick, 'name')
          .then(function (response) {
            assert(response);
            assert.equal(response.ok, true);
            assert.isObject(response.user);
            assert.isObject(response.login);

            const user = response.user;
            assert.equal(user.email, emailAddress);
            assert.equal(user.nick, nick);
            assert.equal(user.name, 'name');
            done();
          });
      });

      it('nick exists: returns a resolving promise with ok false and why', function (done) {
        const emailAddress = getRandomEmailAddress();
        service.register(emailAddress, 'secret', 'secret')
          .then((response) => {
            assert.equal(response.ok, true);

            service.register(emailAddress, 'secret', 'secret')
              .then((response) => {
                assert.equal(response.ok, false);
                assert.equal(response.why, 'nick-exists');
                done();
              });
          });
      });
    });

    describe('register() with custom attribtes', function () {
      it('should return user with attributes specified', function (done) {
        const {emailAddress, nick} = getRandomEmailAddressAndNick();
        const a = {
          attrs: {
            a1: 'v1',
            a2: 'v2'
          }
        };
        service.register(emailAddress, 'secret', 'secret', nick, 'name', a)
          .then((response) => {
            assert.equal(response.ok, true);
            assert.equal(response.user.attrs.a1, 'v1');
            assert.equal(response.user.attrs.a2, 'v2');
            done();
          });
      });
    });

    describe('createReset()', function () {
      it('success: returns ok true', function (done) {
        const emailAddress = getRandomEmailAddress();
        service.register(emailAddress, 'secret', 'secret').then(function () {
          service.logout().then(function () {
            service.createReset(emailAddress)
              .then((response) => {
                assert.equal(response.ok, true);
                done();
              });
          });
        });
      });

      it('unknown user: returns ok false and why', function (done) {
        const emailAddress = getRandomEmailAddress();
        service.createReset(emailAddress)
          .then((response) => {
            assert.equal(response.ok, false);
            assert.equal(response.why, 'user-not-found');
            assert.equal(response.email, emailAddress);
            done();
          });
      });
    });

    describe('loadReset()', function () {
      it('success: returns ok true and user data', function (done) {
        const emailAddress = getRandomEmailAddress();
        createAndFindResetToken(emailAddress, function (err, token) {
          service.loadReset(token)
            .then((response) => {
              assert.equal(response.ok, true);
              assert.equal(response.active, true);
              assert.equal(response.nick, emailAddress);
              done();
            });
        });
      });

      it('used token: returns ok true and active false', function (done) {
        const emailAddress = getRandomEmailAddress();
        createAndFindResetToken(emailAddress, function (err, token) {
          service.executeReset(token, 'pass').then(() => {
            service.loadReset(token)
              .then((response) => {
                assert.equal(response.ok, true);
                assert.equal(response.active, false);
                assert.equal(response.nick, emailAddress);
                done();
              });
          });
        });
      });

      it('unknown token: returns ok false and why', function (done) {
        const token = v4();
        service.loadReset(token)
          .then((response) => {
            assert.equal(response.ok, false);
            assert.equal(response.why, 'reset-not-found');
            done();
          });
      });
    });

    describe('executeReset()', function () {
      it('success: resturns ok true and ...', function (done) {
        var emailAddress = getRandomEmailAddress();
        createAndFindResetToken(emailAddress, function (err, token) {
          service.executeReset(token, 'pass', 'pass')
            .then((response) => {
              assert.equal(response.ok, true);
              assert.isObject(response.user);
              assert.isObject(response.reset);
              assert.equal(response.reset.token, token);
              done();
            });
        });
      });

      it('used token: returns ok true and ', function (done) {
        var emailAddress = getRandomEmailAddress();
        createAndFindResetToken(emailAddress, function (err, token) {
          service.executeReset(token, 'pass', 'pass').then(() => {
            service.executeReset(token, 'pass2', 'pass2')
              .then((response) => {
                assert.equal(response.ok, false);
                assert.equal(response.token, token);
                assert.equal(response.why, 'reset-not-active');
                done();
              });
          });
        });
      });

      it('unknown token: returns false and reset-not-found', function (done) {
        service.executeReset('unknown token', 'pass')
          .then((response) => {
            assert.equal(response.ok, false);
            assert.equal(response.token, 'unknown token');
            assert.equal(response.why, 'reset-not-found');
            done();
          });
      });
    });

    describe('updateUser()', function () {
      it('is many things except production ready');
    });

    describe('changePassword()', function () {
      it('returns "nick_or_email_missing" when called without session token');
    });

    function getRandomEmailAddress() {
      const id = v4().substr(0, 8);
      return id + '@example.com';
    }

    function getRandomNick() {
      return v4().substr(0, 8);
    }

    function getRandomEmailAddressAndNick() {
      return {
        emailAddress: getRandomEmailAddress(),
        nick: getRandomNick()
      };
    }

    function createAndFindResetToken(emailAddress, done) {
      service.register(emailAddress, 'secret', 'secret').then((response) => {
        // console.log('register', response);
        assert.equal(response.ok, true, 'register: ' + response.why);
        service.createReset(emailAddress).then((response) => {
          assert.equal(response.ok, true, 'createReset: ' + response.why);
          findResetToken(emailAddress).then((response) => {
            assert.equal(response.ok, true, 'findResetToken:' + response);
            const token = response.resetToken;
            assert.isString(token);
            assert.isAbove(token.length, 0);

            done(null, token);
          });
        });
      });
    }

    function findResetToken() {
      return new RSVP.Promise((resolve, reject) => {
        const options = {
          url: '/ping',
          data: null,
          type: 'GET',
          dataType: 'json',
          contentType: 'application/json',
          headers: {}
        };

        jQuery.ajax(options).then((response) => {
          resolve(response);
        }, (xhr) => {
          reject(xhr);
        });
      });
    }
  }
);
