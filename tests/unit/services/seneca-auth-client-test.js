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
  'service:seneca-auth-client',
  'Unit | SenecaAuthClientService',
  {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  },
  function () {
    let service = null;

    beforeEach(function () {
      service = this.subject();
      service.jQuery = {
        ajax: function () {
          return {
            then: function (resolve, reject) {
              reject(null);
            }
          };
        }
      };
    });

    describe('makeRequest()', function () {
      it('returns a promise', function (done) {
        assert.isPromise(service.makeRequest('GET', '/x'));
        done();
      });

      describe('exceptions', function () {
        it('throws if no type is provided', function (done) {
          try {
            service.makeRequest();
          }
          catch (ex) {
            assert.equal(ex.toString(), 'Error: type must be provided');
            done();
          }
        });

        it('throws if no url is provided', function (done) {
          try {
            service.makeRequest('GET');
          }
          catch (ex) {
            assert.equal(ex.toString() + '', 'Error: url must be provided');
            done();
          }
        });

        it('throws if url is root document', function (done) {
          try {
            service.makeRequest('GET', '/');
          }
          catch (ex) {
            assert.equal(ex.toString() + '', 'Error: url must not be root index. This causes ember-cli or mocha to throw some weird beforeEach/afterEach hook exceptions');
            done();
          }
        });
      });
    });
  }
);
