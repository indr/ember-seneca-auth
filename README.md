# ember-seneca-auth

*Senecajs' seneca-auth api client and authenticator for ember-simple-auth*

![Build Status](https://travis-ci.org/indr/ember-seneca-auth.svg)

This ember addon provides two features:

* An [ember-simple-auth](http://ember-simple-auth.com/) authenticator
* A service for the [seneca-auth](https://github.com/senecajs/seneca-auth) API

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
    }
  }
})
```

## API methods

The [seneca-auth service](https://github.com/indr/ember-seneca-auth/blob/master/addon/services/seneca-auth.js) provides methods according to the [seneca-auth API](https://github.com/senecajs/seneca-auth#api)


---

---

## Running

* `ember serve`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
