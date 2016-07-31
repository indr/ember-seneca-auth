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
    });

    describe('createReset()', function () {
      it('returns a promise', function (done) {
        assert.isPromise(service.createReset());
        done();
      });
    });

    describe('loadReset()', function () {
      it('returns a promise', function (done) {
        assert.isPromise(service.loadReset());
        done();
      });
    });

    describe('executeReset()', function () {
      it('returns a promise', function (done) {
        assert.isPromise(service.executeReset());
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
