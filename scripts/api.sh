VERSION=$(cat package.json | grep -oE '"version": "[0-9\.]+"' | grep -oE '[0-9\.]+')

echo -e "# ember-seneca-auth API $VERSION

The \`ember-seneca-auth\` addon provides these two modules:

 * authenticator [seneca](#module_seneca)
 * service [seneca-auth](#module_seneca-auth)

" > API.md
jsdoc2md addon/authenticators/seneca.js >> API.md
jsdoc2md addon/services/seneca-auth.js >> API.md

