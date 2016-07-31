import { assert } from 'chai';

export default assert;

assert.isPromise = function (value) {
  assert(value);
  assert.isFunction(value.then);
  assert.isFunction(value.catch);
};
