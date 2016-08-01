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

describeModule(
  'service:seneca-auth',
  'Unit | SenecaAuthService',
  {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  },
  function () {
    let service = null;
    let authClient = null;

    beforeEach(function () {
      service = this.subject();
      service.client = authClient = {
        makeRequest: function () {
          this.lastArgs = Ember.A(arguments);
          return Ember.RSVP.reject();
        }
      };
    });

    describe('login()', function () {
      it('returns a promise', function (done) {
        assert.isPromise(service.login());
        done();
      });

      it('makes a request to the authLoginEndpoint', function (done) {
        service.login('user', 'pass');
        const a = authClient.lastArgs;
        assert(a, 'makeRequest was not called');
        assert.equal(a[0], 'POST');
        assert.equal(a[1], '/auth/login');
        assert.equal(a[2], null);
        assert.equal(a[3].username, 'user');
        assert.equal(a[3].password, 'pass');
        done();
      });
    });

    describe('logout()', function () {
      it('return a promise', function (done) {
        assert.isPromise(service.logout());
        done();
      });

      it('makes a request to the authLogoutEndpoint', function (done) {
        service.logout();
        const a = authClient.lastArgs;
        assert(a, 'makeRequest was not called');
        assert.equal(a[0], 'POST');
        assert.equal(a[1], '/auth/logout');
        done();
      });
    });

    describe('user()', function () {
      it('returns a promise', function (done) {
        assert.isPromise(service.user());
        done();
      });

      it('makes a request to the authUserEndpoint', function (done) {
        service.user();
        const a = authClient.lastArgs;
        assert(a, 'makeRequest was not called');
        assert.equal(a[0], 'GET');
        assert.equal(a[1], '/auth/user');
        done();
      });
    });

    describe('register()', function () {
      it('returns a promise', function (done) {
        assert.isPromise(service.register());
        done();
      });

      it('makes a request to the authRegisterEndpoint', function (done) {
        service.register('email', 'pass', 'nick', 'name');
        const a = authClient.lastArgs;
        assert(a, 'makeRequest was not called');
        assert.equal(a[0], 'POST');
        assert.equal(a[1], '/auth/register');
        assert.equal(a[2], null);
        assert.equal(a[3].email, 'email');
        assert.equal(a[3].password, 'pass');
        assert.equal(a[3].nick, 'nick');
        assert.equal(a[3].name, 'name');
        done();
      });
    });

    describe('createReset()', function () {
      it('returns a promise', function (done) {
        assert.isPromise(service.createReset());
        done();
      });

      it('makes a request to the authCreateResetEndpoint', function (done) {
        service.createReset('email', 'nick');
        const a = authClient.lastArgs;
        assert(a, 'makeRequest was not called');
        assert.equal(a[0], 'POST');
        assert.equal(a[1], '/auth/create_reset');
        assert.equal(a[2], null);
        assert.equal(a[3].email, 'email');
        assert.equal(a[3].nick, 'nick');
        done();
      });
    });

    describe('loadReset()', function () {
      it('returns a promise', function (done) {
        assert.isPromise(service.loadReset());
        done();
      });

      it('makes a request to the authLoadResetEndpoint', function (done) {
        service.loadReset('token');
        const a = authClient.lastArgs;
        assert(a, 'makeRequest was not called');
        assert.equal(a[0], 'POST');
        assert.equal(a[1], '/auth/load_reset');
        assert.equal(a[2], null);
        assert.equal(a[3].token, 'token');
        done();
      });
    });

    describe('executeReset()', function () {
      it('returns a promise', function (done) {
        assert.isPromise(service.executeReset());
        done();
      });

      it('makes a request to the authExecuteResetEndpoint', function (done) {
        service.executeReset('token', 'password', 'repeat');
        const a= authClient.lastArgs;
        assert(a, 'makeRequest was not called');
        assert.equal(a[0], 'POST');
        assert.equal(a[1], '/auth/execute_reset');
        assert.equal(a[2], null);
        assert.equal(a[3].token, 'token');
        assert.equal(a[3].password, 'password');
        assert.equal(a[3].repeat, 'repeat');
        done();
      });
    });

    describe('updateUser()', function () {
      it('returns a promise', function (done) {
        assert.isPromise(service.updateUser());
        done();
      });
    });

    describe('changePassword()', function () {
      it('returns a promise', function (done) {
        assert.isPromise(service.changePassword());
        done();
      });
    });

  }
);
