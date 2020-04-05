import request from 'supertest';
import express from 'express';
import redux, { createStore } from 'redux';
import createApp from '../../server/app';
import { UpdateState } from '../../server/constants/saveRAMActions';

function testReducer(state = {}, action: any) {
  if (action.type === UpdateState) {
    return action.payload;
  }

  return state;
}

let app: express.Express;
let store: redux.Store;
const testData = {
  rupees: 99,
};

beforeEach(() => {
  store = createStore(testReducer);
  app = createApp(store);
});

describe('Receive POST requests from BizHawk emitter script', () => {
  test('should respond with a 202 response on POST request to /emu endpoint', () => (
    request(app)
      .post('/emu')
      .send(testData)
      .expect(202)
  ));

  test('should respond with a 400 response on POST request if no data sent', () => (
    request(app)
      .post('/emu')
      .expect(400)
  ));

  test('should set the state of the store on valid POST request', async () => {
    await request(app)
      .post('/emu')
      .send(testData);

    expect(store.getState()).toStrictEqual(testData);
  });

  test('should not change the state of the store if POST request invalid', async () => {
    await request(app)
      .post('/emu');

    expect(store.getState()).toStrictEqual({});
  });

  test('should have initial state values on app creation', () => {
    expect(store.getState()).toStrictEqual({});
  });
});
