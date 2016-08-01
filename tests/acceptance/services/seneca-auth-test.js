/* jshint expr:true */
import { assert } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import { v4 } from 'ember-uuid';
import {
  beforeEach,
  describe
} from 'mocha';

describeModule(
  'service:seneca-auth',
  'Acceptance | SenecaAuthService',
  {
    // Specify the other units that are required for this test.
    needs: ['service:seneca-auth-client']
  },
  function () {
    let service = null;

    function getRandomEmailAddress() {
      const id = v4().substr(0, 8);
      return id + '@example.com';
    }

    function getRandomNick() {
      return v4().substr(0, 8);
    }

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
        service.register(emailAddress, 'secret', nick, 'name')
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
        service.register(emailAddress, 'secret')
          .then((response) => {
            assert.equal(response.ok, true);

            service.register(emailAddress, 'secret')
              .then((response) => {
                assert.equal(response.ok, false);
                assert.equal(response.why, 'nick-exists');
                done();
              });
          });
      });
    });

    describe('createReset()', function () {
      it('success: returns ok true', function (done) {
        const emailAddress = getRandomEmailAddress();
        service.register(emailAddress, 'already forgotten').then(function () {
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
            console.log(response);
            assert.equal(response.ok, false);
            assert.equal(response.why, 'user-not-found');
            done();
          });
      });
    });
  }
);
