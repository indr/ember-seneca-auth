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
    let service = null,
      jQueryMock = null,
      o = null, // jQuery.ajax options
      d = null; // parsed options data

    beforeEach(function () {
      jQueryMock = {
        ajax: function ajax() {
          this.ajax.lastArgs = Ember.A(arguments);
          o = arguments[0];
          d = JSON.parse(o.data);
          return {
            then: function (resolve) {
              resolve();
            }
          };
        }
      };

      service = this.subject();
      service.jQuery = jQueryMock;
    });

    describe('login()', function () {
      it('returns a promise', function (done) {
        assert.isPromise(service.login());
        done();
      });

      it('makes a request to the authLoginEndpoint', function (done) {
        service.login('user', 'pass', {a: 'b'}).then(function () {
          assert.equal(o.type, 'POST');
          assert.equal(o.url, '/auth/login');
          assert.equal(d.username, 'user');
          assert.equal(d.password, 'pass');
          assert.equal(d.a, 'b');
          done();
        });
      });
    });

    describe('logout()', function () {
      it('return a promise', function (done) {
        assert.isPromise(service.logout());
        done();
      });

      it('makes a request to the authLogoutEndpoint', function (done) {
        service.logout({a: 'b'}).then(function () {
          assert.equal(o.type, 'POST');
          assert.equal(o.url, '/auth/logout');
          assert.equal(d.a, 'b');
          done();
        });
      });
    });

    describe('user()', function () {
      it('returns a promise', function (done) {
        assert.isPromise(service.user());
        done();
      });

      it('makes a request to the authUserEndpoint', function (done) {
        service.user().then(function () {
          assert.equal(o.type, 'GET');
          assert.equal(o.url, '/auth/user');
          done();
        });
      });
    });

    describe('register()', function () {
      it('returns a promise', function (done) {
        assert.isPromise(service.register());
        done();
      });

      it('makes a request to the authRegisterEndpoint', function (done) {
        service.register('email', 'pass', 'repeat', 'nick', 'name').then(function () {
          assert.equal(o.type, 'POST');
          assert.equal(o.url, '/auth/register');
          assert.equal(o.headers, null);
          assert.equal(d.email, 'email');
          assert.equal(d.password, 'pass');
          assert.equal(d.repeat, 'repeat');
          assert.equal(d.nick, 'nick');
          assert.equal(d.name, 'name');
          done();
        });
      });

      it('puts custom attributes in request data', function (done) {
        const customData = {
          nick: 'nick2',
          c1: 'v1',
          c2: {
            c21: 'v21',
            c22: 'v22'
          }
        };
        service.register('email', 'pass', 'repeat', 'nick', 'name', customData).then(function () {
          assert.equal(d.email, 'email');
          assert.equal(d.nick, 'nick2');
          assert.equal(d.c1, 'v1');
          assert.equal(d.c2.c21, 'v21');
          assert.equal(d.c2.c22, 'v22');
          done();
        });
      });
    });

    describe('createReset()', function () {
      it('returns a promise', function (done) {
        assert.isPromise(service.createReset());
        done();
      });

      it('makes a request to the authCreateResetEndpoint', function (done) {
        service.createReset('email', 'nick', {a: 'b'}).then(function () {
          assert.equal(o.type, 'POST');
          assert.equal(o.url, '/auth/create_reset');
          assert.equal(o.headers, null);
          assert.equal(d.email, 'email');
          assert.equal(d.nick, 'nick');
          assert.equal(d.a, 'b');
          done();
        });
      });
    });

    describe('loadReset()', function () {
      it('returns a promise', function (done) {
        assert.isPromise(service.loadReset());
        done();
      });

      it('makes a request to the authLoadResetEndpoint', function (done) {
        service.loadReset('token', {a: 'b'}).then(function () {
          assert.equal(o.type, 'POST');
          assert.equal(o.url, '/auth/load_reset');
          assert.equal(o.headers, null);
          assert.equal(d.token, 'token');
          assert.equal(d.a, 'b');
          done();
        });
      });
    });

    describe('executeReset()', function () {
      it('returns a promise', function (done) {
        assert.isPromise(service.executeReset());
        done();
      });

      it('makes a request to the authExecuteResetEndpoint', function (done) {
        service.executeReset('token', 'password', 'repeat', {a: 'b'}).then(function () {
          assert.equal(o.type, 'POST');
          assert.equal(o.url, '/auth/execute_reset');
          assert.equal(o.headers, null);
          assert.equal(d.token, 'token');
          assert.equal(d.password, 'password');
          assert.equal(d.repeat, 'repeat');
          assert.equal(d.a, 'b');
          done();
        });
      });
    });

    describe('updateUser()', function () {
      it('returns a promise', function (done) {
        assert.isPromise(service.updateUser());
        done();
      });

      it('makes a request to the authUpdateUserEndpoint', function (done) {
        service.updateUser('newNick', 'oldNick', 'newEmail', 'oldEmail', {a: 'b'}).then(function () {
          assert.equal(o.type, 'POST');
          assert.equal(o.url, '/auth/update_user');
          assert.equal(o.headers, null);
          assert.equal(d.nick, 'newNick');
          assert.equal(d.orig_nick, 'oldNick');
          assert.equal(d.email, 'newEmail');
          assert.equal(d.orig_email, 'oldEmail');
          assert.equal(d.a, 'b');
          done();
        });
      });
    });

    describe('changePassword()', function () {
      it('returns a promise', function (done) {
        assert.isPromise(service.changePassword());
        done();
      });

      it('makes a request to the authChangePasswordEndpoint', function (done) {
        service.changePassword('password', 'repeat', {a: 'b'}).then(function () {
          assert.equal(o.type, 'POST');
          assert.equal(o.url, '/auth/change_password');
          assert.equal(o.headers, null);
          assert.equal(d.password, 'password');
          assert.equal(d.repeat, 'repeat');
          assert.equal(d.a, 'b');
          done();
        });
      });
    });
  }
);
