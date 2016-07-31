/* jshint expr:true */
import assert from '../../helpers/assert';
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
  'Unit | SenecaAuthenticator',
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
      it('returns a promise', function (done) {
        assert.isPromise(authenticator.restore());
        done();
      });
    });

    describe('authenticate', function () {
      it('returns a promise', function (done) {
        assert.isPromise(authenticator.authenticate());
        done();
      });
    });

    describe('invalidate', function () {
      it('returns a promise', function (done) {
        assert.isPromise(authenticator.invalidate());
        done();
      });
    });
  }
);
