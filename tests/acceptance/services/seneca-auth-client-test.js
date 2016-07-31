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
  'Acceptance | SenecaAuthClientService',
  {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  },
  function () {
    let service = null;

    beforeEach(function () {
      service = this.subject();
    });

    describe('makeRequest', function () {
      it('404: should return a rejecting promise with xhr object', function (done) {
        service.makeRequest('GET', '/non/existing/endpoint')
          .catch((xhr) => {
            assert(xhr);
            assert.equal(xhr.status, 404);
            done();
          });
      });
    });
  }
);
