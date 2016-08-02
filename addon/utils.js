import Ember from 'ember';

/**
 * This module provides utility functions to overcome compatibility issues with ember@1.13.0
 */
export default {
  assign: Ember.assign || assign
};

/**
 * Copied from https://github.com/emberjs/ember.js/blob/v2.7.0/packages/ember-metal/lib/assign.js
 * @ignore
 *
 * ---
 *
 * @method assign
 * @for Ember
 * @param {Object} original The object to assign into
 * @param {Object} ...args The objects to copy properties from
 * @return {Object}
 * @public
*/
function assign(original, ...args) {
  for (let i = 0; i < args.length; i++) {
    let arg = args[i];
    if (!arg) { continue; }

    let updates = Object.keys(arg);

    for (let i = 0; i < updates.length; i++) {
      let prop = updates[i];
      original[prop] = arg[prop];
    }
  }

  return original;
}
