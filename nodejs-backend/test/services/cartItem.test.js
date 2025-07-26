const assert = require('assert');
const app = require('../../src/app');

describe('\'cartItem\' service', () => {
  it('registered the service', () => {
    const service = app.service('cartItem');

    assert.ok(service, 'Registered the service (cartItem)');
  });
});
