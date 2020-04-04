import request from 'supertest';
import createApp from '../../server/app';

const app = createApp();
const testData = {
  rupees: 99,
};

describe('Receive POST requests from BizHawk emitter script', () => {
  test('should respond with a 202 response on POST request to /emu endpoint', () => (
    request(app)
      .post('/emu')
      .send(testData)
      .expect(202, {})
  ));
});
