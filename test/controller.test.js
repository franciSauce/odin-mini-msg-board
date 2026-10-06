const test = require('node:test');
const assert = require('node:assert/strict');
const controller = require('../controllers/indexController');
const { users } = require('../db');

function makeResponse() {
  const calls = [];

  return {
    calls,
    redirect: (location) => calls.push({ type: 'redirect', location }),
    render: (view, data) => calls.push({ type: 'render', view, data }),
    json: (body) => calls.push({ type: 'json', body }),
  };
}

test('new users are created and receive exactly one redirect', () => {
  const response = makeResponse();
  const name = `New User ${Date.now()}`;

  controller.newUser({ body: { name, password: 'secret' } }, response);

  assert.equal(response.calls.length, 1);
  assert.equal(response.calls[0].type, 'redirect');
  assert.equal(response.calls[0].location, '/');
  assert.ok(users.some((user) => user.name === name));

  const createdUser = users.find((user) => user.name === name);
  assert.equal(createdUser.pic, '/guest.svg');
});

test('a failed login displays the error and clears it after a later successful login', () => {
  const response = makeResponse();
  const existingUser = users.find((user) => user.name === 'Amanda');

  controller.newUser({ body: { name: existingUser.name, password: 'wrong' } }, response);

  assert.equal(response.calls.length, 1);
  assert.equal(response.calls[0].type, 'render');
  assert.equal(response.calls[0].data.authError, 'Wrong password');

  const successfulResponse = makeResponse();
  controller.newUser({ body: { name: existingUser.name, password: existingUser.password } }, successfulResponse);

  const pageResponse = makeResponse();
  controller.get({}, pageResponse);

  assert.equal(pageResponse.calls[0].data.authError, null);
  assert.equal(pageResponse.calls[0].data.open, false);
});
