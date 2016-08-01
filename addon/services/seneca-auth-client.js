import Ember from 'ember';

const {
  isEmpty,
  RSVP,
  $
} = Ember;

export default Ember.Service.extend({
  jQuery: $,

  makeRequest(type, url, headers = {}, data = null) {
    if (!type) {
      throw new Error('type must be provided');
    }
    if (!url) {
      throw new Error('url must be provided');
    }
    if (url === '/') {
      throw new Error('url must not be root index. This causes ember-cli or mocha to throw some weird beforeEach/afterEach hook exceptions');
    }

    const options = {
      url,
      data: data != null ? JSON.stringify(data) : null,
      type: type,
      dataType: 'json',
      contentType: 'application/json',
      headers: headers || {}
    };

    if (isEmpty(Object.keys(options.headers))) {
      delete options.headers;
    }

    console.log('request', options);

    return new RSVP.Promise((resolve, reject) => {
      this.jQuery.ajax(options).then((response) => {
        resolve(response);
        console.log('response', response);
      }, (xhr) => {
        reject(xhr);
      });
    });
  }
});
