# ember-seneca-auth

*Senecajs' seneca-auth api client and authenticator for ember-simple-auth*

[![npm version](https://badge.fury.io/js/ember-seneca-auth.svg)](https://badge.fury.io/js/ember-seneca-auth)
[![Build Status](https://travis-ci.org/indr/ember-seneca-auth.svg?branch=master)](https://travis-ci.org/indr/ember-seneca-auth)
[![dependencies Status](https://david-dm.org/indr/ember-seneca-auth/status.svg)](https://david-dm.org/indr/ember-seneca-auth)
[![Code Climate](https://codeclimate.com/github/indr/ember-seneca-auth/badges/gpa.svg)](https://codeclimate.com/github/indr/ember-seneca-auth)

This ember addon provides two features:

* An [ember-simple-auth](http://ember-simple-auth.com/) authenticator
* A service for the [seneca-auth](https://github.com/senecajs/seneca-auth) API

`ember-simple-auth` is not part of this addon. It won't be installed to your Ember app.

## Installation

You can install either with `ember install`:

For Ember CLI >= `0.2.3`:

```shell
ember install ember-seneca-auth
```

For Ember CLI < `0.2.3`:

```shell
ember install:addon ember-seneca-auth
```

## Compatibility

This addon ist tested against the `release`, `beta`, `canary` channels and version `1.13`.

## Usage

Usage is simple. Use the ember-simple-auth authenticator or inject the `senecaAuth` service and use the methods which resembles the seneca-auth API.

### ember-simple-auth authenticator

```javascript
export default Ember.Component.extend({
  session: Ember.inject.service(),
  
  actions: {
    login() {
      this.get('session').authenticate('authenticator:seneca', 'user@example.com', 'secret')
        .then(() => console.log('Login successful'))
        .catch((reason) => console.log('Login failed', reason));
    }
  }
})
```

### seneca-auth service

```javascript
export default Ember.Component.extend({
  senecaAuth: Ember.inject.service(),
    
  actions: {
    login() {
      this.get('senecaAuth').login('user@example.com', 'secret')
        .then((result) => console.log('Login successful', result))
        .catch((reason) => console.log('Login failed', reason));
    }https://github.com/indr/ember-seneca-auth/blob/master/tests/acceptance/services/seneca-auth-test.js
  }
})
```

### Examples

 * Look at the [acceptance tests](https://github.com/indr/ember-seneca-auth/blob/master/tests/acceptance/services/seneca-auth-test.js)
   They use a real seneca backend. Have a look at the seneca server in the [scripts folder](https://github.com/indr/ember-seneca-auth/tree/master/scripts).
 * [indr/addressbook-ember](https://github.com/indr/addressbook/ember)

## API methods

The [seneca-auth service](https://github.com/indr/ember-seneca-auth/blob/master/addon/services/seneca-auth.js) provides methods according to the [seneca-auth API](https://github.com/senecajs/seneca-auth#api)

 * `senecaAuth.login(username, password)`
 * `senecaAuth.logout()`
 * `senecaAuth.user()`
 * `senecaAuth.register(emailAddress, password)`
 * `senecaAuth.createReset()` (tbd)
 * `senecaAuth.loadReset()` (tbd)
 * `senecaAuth.executeReset()` (tbd)
 * `senecaAuth.updateUser()` (tbd)
 * `senecaAuth.changePassword()` (tbd)

## License

[MIT](LICENSE.md)

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions). Automatically starts and stops the seneca server.
* `./scripts/start-server.sh`
  `ember test`
  `./scripts/stop-server.sh`
* `./scripts/start-server.sh`
  `ember test --server`
  `./scripts/stop-server.sh`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
