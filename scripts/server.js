const assert = require('assert');
const fs = require('fs');
const seneca = require('seneca');
const bodyParser = require('body-parser');
const createApplication = require('express');

const tmpDir = __dirname + '/../tmp';
const resetTokenUuid = tmpDir + '/resetToken.uuid';

module.export = function () {
  return {
    app: null,
    seneca: null,

    start: start,
    stop: stop
  }
};

function start(done) {
  const self = this;
  done = done || noop;

  const si = self.seneca = seneca()
    .use('entity')
    .use('user')
    .use('auth')
    .use('web')
    .add('role:api,route:ping', function (args, done) {
      var si = this;
      fs.readFile(resetTokenUuid, {encoding: 'utf8'}, function (err, resetToken) {
        if (err) resetToken = err;
        done(null, {
          'date': new Date(),
          'seneca': si.version,
          'tmpDir': tmpDir,
          'resetToken': resetToken,
          'ok': true
        });
      });
    });


    si.ready(function (err) {
      assert(!err);

      si.act('role:web', {
        use: {
          prefix: '/',
          pin: 'role:api,route:*',
          map: {ping: true}
        }
      });

      const app = createApplication()
        .use(bodyParser.json())
        .use(si.export('web'));

      self.app = app.listen(3000);

      si.wrap('role:user,cmd:create_reset', function (args, done) {
        this.prior(args, function (err, data) {
          if (err) return done(err, data);
          if (!data.ok) {
            return done(null, data);
          }

          const token = data.reset.token;
          console.log('Captured reset token: ' + token);
          fs.writeFile(resetTokenUuid, token, function (err) {
            if (err) return done(err, data);
            return done(null, data);
          });
        });
      });
      done();
    });
}

function stop(done) {
  const self = this;
  done = done || noop;

  self.app.close(function () {
    self.seneca.close(done);
  });
}

function noop() {
}

const server = module.export();
server.start(function () {
  console.log('tmp dir is ' + tmpDir);
  server.seneca.act('role: user, cmd: register', {
    nick: 'nu1',
    name: 'u1',
    email: 'u1@example.com',
    password: 'pu1',
    active: true
  });
});
