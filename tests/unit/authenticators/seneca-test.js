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
  'authenticator:seneca',
  'SenecaAuthenticator',
  {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  },
  function () {

    let authenticator = null;

    beforeEach(function () {
      authenticator = this.subject();
    });

    describe('restore', function () {
      it('returns a rejecting promise', function (done) {
        authenticator.restore()
          .catch(done);
      });
    });

    describe('authenticate', function () {
      it('returns a rejecting promise', function (done) {
        authenticator.authenticate()
          .catch(done);
      });
    });

    describe('invalidate', function () {
      it('returns a resolving promise', function (done) {
        authenticator.invalidate()
          .then(done);
      });
    });
  }
);
