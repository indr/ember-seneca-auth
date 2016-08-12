# ember-seneca-auth Todo

 - [ ] Option for http-header instead of session-cookie?
 - [ ] Adapter mixin for http-header key?
 - [x] authenticator.restore()

## Report issues
 
 - [x] seneca.wrap() returns undefined (senecajs/seneca#460)
 - [x] POST /auth/register returns {"user":null,"login":null,"ok":true} (senecajs/seneca-auth#98)
 - [x] unauthenticated POST /auth/change_password returns {"ok":false,"why":"nick_or_email_missing"} (senecajs/seneca-auth#97)
 - [x] POST /auth/execute_reset with empty password crashes seneca (senecajs/seneca-auth#99)
 - [x] POST /auth/execute_reset with different password repeat is accepted (senecajs/seneca-auth#100)
 - [x] POST /auth/change_password with different password repeat is accepted (senecajs/seneca-auth#101)
 - [x] Various security issues with POST /auth/update_user (senecajs/seneca-auth#102)
   POST /auth/update_user doesn't care about authentication
   POST /auth/update_user lets you update different users
   POST /auth/update_user updates password if repeat is provided and matches 
 - [ ] POST /auth/load_reset inactive token reveals nick name (default email address)
