import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  restore(/*data*/) {
    return this._super(...arguments);
  },

  authenticate(/*args*/) {
    return this._super(...arguments);
  },

  invalidate(/*data*/) {
    return this._super(...arguments);
  }
});
