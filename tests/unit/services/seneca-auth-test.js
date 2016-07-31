/* jshint expr:true */
//import { assert } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import {
  beforeEach, describe
} from 'mocha';

describeModule(
  'service:seneca-auth',
  'SenecaAuthService',
  {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  },
  function () {

    let service = null;

    beforeEach(function () {
      service = this.subject();
    });

    describe('login', function () {
      it('returns rejecting promise', function (done) {
        service.login()
          .catch(done);
      });
    });

    describe('logout', function () {
      it('returns rejecting promise', function (done) {
        service.logout()
          .catch(done);
      });
    });

    describe('user', function () {
      it('returns rejecting promise', function (done) {
        service.user()
          .catch(done);
      });
    });

    describe('register', function () {
      it('returns rejecting promise', function (done) {
        service.register()
          .catch(done);
      });
    });

    describe('createReset', function () {
      it('returns rejecting promise', function (done) {
        service.createReset()
          .catch(done);
      });
    });

    describe('loadReset', function () {
      it('returns rejecting promise', function (done) {
        service.loadReset()
          .catch(done);
      });
    });

    describe('executeReset', function () {
      it('returns rejecting promise', function (done) {
        service.executeReset()
          .catch(done);
      });
    });

    describe('updateUser', function () {
      it('returns rejecting promise', function (done) {
        service.updateUser()
          .catch(done);
      });
    });

    describe('changePassword', function () {
      it('returns rejecting promise', function (done) {
        service.changePassword()
          .catch(done);
      });
    });

  }
);
