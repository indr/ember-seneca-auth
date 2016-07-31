const assert = require('assert');
const seneca = require('seneca');
const bodyParser = require('body-parser');
const createApplication = require('express');

module.export = function () {
  return {
    app: null,
    seneca: null,

    start: start,
    stop: stop
  }
};

function getHello() {
  console.log(...arguments);
}

function start(done) {
  const self = this;
  done = done || noop;

  const si = self.seneca = seneca()
    .use('entity')
    .use('user')
    .use('auth')
    .use('web')
    .add('role:api,route:ping', function (args, done) {
      done(null, {
        'date': new Date(),
        'seneca': this.version,
        'status': 'ok'
      });
    })
    .ready(function (err) {
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
      done();
    });
}

function stop(done) {
  const self = this;
  done = done || noop;

  self.app.close(function () {
    self.seneca.close(done);
    inst
  });
}

function noop() {
}

const server = module.export();
server.start(function () {
  server.seneca.act('role: user, cmd: register', {
    nick: 'nu1',
    name: 'u1',
    email: 'u1@example.com',
    password: 'pu1',
    active: true
  });
});
