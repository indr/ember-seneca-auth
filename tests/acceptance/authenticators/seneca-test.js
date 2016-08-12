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
    needs: [
      'config:environment',
      'service:seneca-auth'
    ]
  },
  function () {
    let authenticator = null,
      options = null;
    
    beforeEach(function () {
      options = {APP: {}};
      this.register('config:environment', options);
      authenticator = this.subject();
    });
    
    describe('authenticate()', function () {
      it('success: returns a resolving promise with login object', function (done) {
        authenticator.authenticate('u1@example.com', 'pu1').then(function (login) {
          assert.equal(login.email, 'u1@example.com');
          assert.isString(login.token);
          assert.isAbove(login.token.length, 0);
          assert.isString(login.user);
          assert.notProperty(login, 'name');
          done();
        });
      });
      
      it('success (options.assignFromUser: true): stores user object in session.data', function (done) {
        options['seneca-auth'] = {assignFromUser: true};
        authenticator.authenticate('u1@example.com', 'pu1').then((login) => {
          assert.equal(login.email, 'u1@example.com');
          assert.isString(login.token);
          assert.isAbove(login.token.length, 0);
          assert.isString(login.user);
          assert.equal(login.name, 'u1');
          done();
        });
      });
      
      it('unknown user: returns a rejecting promise with user-not-found', function (done) {
        authenticator.authenticate('unknown@example.com', 'password').catch(function (reason) {
          assert.equal(reason, 'user-not-found');
          done();
        });
      });
      
      it('invalid password: returns a rejecting promise with invalid-password', function (done) {
        authenticator.authenticate('u1@example.com', 'wrong password').catch(function (reason) {
          assert.equal(reason, 'invalid-password');
          done();
        });
      });
    });
    
    describe('invalidate()', function () {
      it('resolves with ok:true', function (done) {
        authenticator.invalidate().then((response) => {
          assert.equal(response.ok, true);
          done();
        });
      });
    });
  }
);
