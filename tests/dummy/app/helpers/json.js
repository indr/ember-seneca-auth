import Ember from 'ember';

export function json(params/*, hash*/) {
  return JSON.stringify(params)
    .replace(/\{/g, '{\r\n')
    .replace(/\}/g, '\r\n}')
    .replace(/","/g, '",\r\n"');
}

export default Ember.Helper.helper(json);
