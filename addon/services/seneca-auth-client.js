import Ember from 'ember';

const {
  isEmpty,
  RSVP,
  $: jQuery
} = Ember;

export default Ember.Service.extend({

  makeRequest(type, url, headers = {}, data = null) {
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

    return new RSVP.Promise((resolve, reject) => {
      jQuery.ajax(options).then((response) => {
        resolve(response);
      }, (xhr) => {
        reject(xhr);
      });
    });
  }
});
