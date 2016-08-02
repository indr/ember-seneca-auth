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
  'authenticator:seneca',
  'Acceptance | SenecaAuthenticator',
  {
    // Specify the other units that are required for this test.
    needs: ['service:seneca-auth']
  },
  function () {
    let authenticator = null;

    beforeEach(function () {
      authenticator = this.subject();
    });

    describe('authenticate()', function () {
      it('success: returns a resolving promise with login', function (done) {
        authenticator.authenticate('u1@example.com', 'pu1')
          .then(function (login) {
            assert.equal(login.email, 'u1@example.com');
            assert.isString(login.token);
            assert.isAbove(login.token.length, 0);
            done();
          });
      });

      it('unknown user: returns a rejecting promise with user-not-found', function (done) {
        authenticator.authenticate('unknown@example.com', 'password')
          .catch(function (reason) {
            assert.equal(reason, 'user-not-found');
            done();
          });
      });

      it('invalid password: returns a rejecting promise with invalid-password', function (done) {
        authenticator.authenticate('u1@example.com', 'wrong password')
          .catch(function (reason) {
            assert.equal(reason, 'invalid-password');
            done();
          });
      });
    });

    describe('invalidate()', function () {
      it('resolves with ok:true', function (done) {
        authenticator.invalidate()
          .then((response) => {
            assert.equal(response.ok, true);
            done();
          });
      });
    });
  }
);
