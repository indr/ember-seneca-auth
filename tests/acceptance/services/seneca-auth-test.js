/* jshint expr:true */
import { assert } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
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

      it('unknown user: returns a resolving promise with ok false', function (done) {
        service.login('unknown@example.com', 'password')
          .then(function (response) {
            assert.equal(response.ok, false);
            assert.equal(response.why, 'user-not-found');

            done();
          });
      });

      it('invalid password: returns a resolving promise ok false', function (done) {
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
  }
);
