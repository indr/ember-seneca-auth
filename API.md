# ember-seneca-auth API 0.1.1

The `ember-seneca-auth` addon provides these two modules:

 * authenticator [seneca](#module_seneca)
 * service [seneca-auth](#module_seneca-auth)


<a name="module_seneca"></a>

## seneca ⇐ <code>BaseAuthenticator</code>
**Extends:** <code>BaseAuthenticator</code>  

* [seneca](#module_seneca) ⇐ <code>BaseAuthenticator</code>
    * [~authenticate(identification, password)](#module_seneca..authenticate) ⇒ <code>Ember.RSVP.Promise</code>
    * [~invalidate()](#module_seneca..invalidate) ⇒ <code>Ember.RSVP.Promise</code>
    * [~restore(login)](#module_seneca..restore) ⇒ <code>Ember.RSVP.Promise</code>

<a name="module_seneca..authenticate"></a>

### seneca~authenticate(identification, password) ⇒ <code>Ember.RSVP.Promise</code>
Authenticates the session with the specified identification and password.

Uses [seneca-auth.login()](#module_seneca-auth..login) to perform the authentication against the back end.

**Kind**: inner method of <code>[seneca](#module_seneca)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| identification | <code>String</code> | The username or email address to authenticate |
| password | <code>String</code> | The password |

<a name="module_seneca..invalidate"></a>

### seneca~invalidate() ⇒ <code>Ember.RSVP.Promise</code>
Invalidates the current session.

Uses [seneca-auth.logout()](#module_seneca-auth..login) to inform the back-end to invalidate the session.

The returned promise is always resolved.

**Kind**: inner method of <code>[seneca](#module_seneca)</code>  
**Access:** public  
<a name="module_seneca..restore"></a>

### seneca~restore(login) ⇒ <code>Ember.RSVP.Promise</code>
Tries to restore a previous session.

The returned promise is resolved with `login` if a `login.token` is present.
Otherwise rejects with `'no-token'`.

**Kind**: inner method of <code>[seneca](#module_seneca)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| login | <code>Object</code> | The login data |
| login.token | <code>String</code> | The login token |

<a name="module_seneca-auth"></a>

## seneca-auth ⇐ <code>Ember.Service</code>
**Extends:** <code>Ember.Service</code>  

* [seneca-auth](#module_seneca-auth) ⇐ <code>Ember.Service</code>
    * [~login(identification, password, [data])](#module_seneca-auth..login) ⇒ <code>Ember.RSVP.Promise</code>
    * [~logout([data])](#module_seneca-auth..logout) ⇒ <code>Ember.RSVP.Promise</code>
    * [~user()](#module_seneca-auth..user) ⇒ <code>Ember.RSVP.Promise</code>
    * [~register(emailAddress, password, repeat, nick, name, [data])](#module_seneca-auth..register) ⇒ <code>Ember.RSVP.Promise</code>
    * [~createReset(emailAddress, nick, [data])](#module_seneca-auth..createReset) ⇒ <code>Ember.RSVP.Promise</code>
    * [~loadReset(token, [data])](#module_seneca-auth..loadReset) ⇒ <code>Ember.RSVP.Promise</code>
    * [~executeReset(token, password, repeat, [data])](#module_seneca-auth..executeReset) ⇒ <code>Ember.RSVP.Promise</code>
    * [~updateUser(newNick, oldNick, newEmailAddress, oldEmailAddress, [data])](#module_seneca-auth..updateUser) ⇒ <code>Ember.RSVP.Promise</code>
    * [~changePassword(password, repeat, [data])](#module_seneca-auth..changePassword) ⇒ <code>Ember.RSVP.Promise</code>

<a name="module_seneca-auth..login"></a>

### seneca-auth~login(identification, password, [data]) ⇒ <code>Ember.RSVP.Promise</code>
**Kind**: inner method of <code>[seneca-auth](#module_seneca-auth)</code>  
**Access:** public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| identification | <code>String</code> |  |  |
| password | <code>String</code> |  |  |
| [data] | <code>Object</code> | <code>{}</code> | Object that gets assign to the payload |

<a name="module_seneca-auth..logout"></a>

### seneca-auth~logout([data]) ⇒ <code>Ember.RSVP.Promise</code>
**Kind**: inner method of <code>[seneca-auth](#module_seneca-auth)</code>  
**Access:** public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [data] | <code>Object</code> | <code>{}</code> | Object that gets assign to the payload |

<a name="module_seneca-auth..user"></a>

### seneca-auth~user() ⇒ <code>Ember.RSVP.Promise</code>
**Kind**: inner method of <code>[seneca-auth](#module_seneca-auth)</code>  
**Access:** public  
<a name="module_seneca-auth..register"></a>

### seneca-auth~register(emailAddress, password, repeat, nick, name, [data]) ⇒ <code>Ember.RSVP.Promise</code>
**Kind**: inner method of <code>[seneca-auth](#module_seneca-auth)</code>  
**Access:** public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| emailAddress | <code>String</code> |  |  |
| password | <code>String</code> |  |  |
| repeat | <code>String</code> |  |  |
| nick | <code>String</code> |  |  |
| name | <code>String</code> |  |  |
| [data] | <code>Object</code> | <code>{}</code> | Object that gets assign to the payload |

<a name="module_seneca-auth..createReset"></a>

### seneca-auth~createReset(emailAddress, nick, [data]) ⇒ <code>Ember.RSVP.Promise</code>
**Kind**: inner method of <code>[seneca-auth](#module_seneca-auth)</code>  
**Access:** public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| emailAddress | <code>String</code> |  |  |
| nick | <code>String</code> |  |  |
| [data] | <code>Object</code> | <code>{}</code> | Object that gets assign to the payload |

<a name="module_seneca-auth..loadReset"></a>

### seneca-auth~loadReset(token, [data]) ⇒ <code>Ember.RSVP.Promise</code>
**Kind**: inner method of <code>[seneca-auth](#module_seneca-auth)</code>  
**Access:** public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| token | <code>String</code> |  |  |
| [data] | <code>Object</code> | <code>{}</code> | Object that gets assign to the payload |

<a name="module_seneca-auth..executeReset"></a>

### seneca-auth~executeReset(token, password, repeat, [data]) ⇒ <code>Ember.RSVP.Promise</code>
**Kind**: inner method of <code>[seneca-auth](#module_seneca-auth)</code>  
**Access:** public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| token | <code>String</code> |  |  |
| password | <code>String</code> |  |  |
| repeat | <code>String</code> |  |  |
| [data] | <code>Object</code> | <code>{}</code> | Object that gets assign to the payload |

<a name="module_seneca-auth..updateUser"></a>

### seneca-auth~updateUser(newNick, oldNick, newEmailAddress, oldEmailAddress, [data]) ⇒ <code>Ember.RSVP.Promise</code>
**Kind**: inner method of <code>[seneca-auth](#module_seneca-auth)</code>  
**Access:** public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| newNick | <code>String</code> |  |  |
| oldNick | <code>String</code> |  |  |
| newEmailAddress | <code>String</code> |  |  |
| oldEmailAddress | <code>String</code> |  |  |
| [data] | <code>Object</code> | <code>{}</code> | Object that gets assign to the payload |

<a name="module_seneca-auth..changePassword"></a>

### seneca-auth~changePassword(password, repeat, [data]) ⇒ <code>Ember.RSVP.Promise</code>
**Kind**: inner method of <code>[seneca-auth](#module_seneca-auth)</code>  
**Access:** public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| password | <code>String</code> |  |  |
| repeat | <code>String</code> |  |  |
| [data] | <code>Object</code> | <code>{}</code> | Object that gets assign to the payload |

