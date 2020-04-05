import express from 'express';
import redux from 'redux';
import * as Actions from './constants/saveRAMActions';

/**
 * Handle the data from the emulator POST request. Should validate the data and return the data
 * for further processing later.
 *
 * @param saveRam The save ram data sent from the emulator.
 * @param res The express response object. Only used to send a confirmation of the data being
 * submitted.
 * @returns The validated saveRAM object.
 */
function handleEmulatorEndpoint({ body: saveRam }: express.Request, res: express.Response): any {
  // If we are being passed an empty object, it means the request body was malformed.
  if (Object.keys(saveRam).length !== 0) {
    res.sendStatus(202);
    return saveRam;
  }

  res.sendStatus(400);
  return null;
}

/**
 * Create an express application that will listen for post requests to the __/emu__ endpoint. To be
 * used for save RAM changes from a custom emitter script written for BizHawk.
 *
 * @param store The redux store holding our Game State information.
 * @returns A specialized express application for listening to emulator save ram changes.
 */
export default function createApp(store: redux.Store): express.Express {
  const app = express();

  app.use(express.json());
  app.post('/emu', (req, res) => {
    const data = handleEmulatorEndpoint(req, res);

    // Dispatch our changes if we received valid data.
    if (data) {
      store.dispatch({ type: Actions.UpdateState, payload: data });
    }
  });

  return app;
}
