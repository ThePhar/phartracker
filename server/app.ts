import express from 'express';

/**
 * Handle the data from the emulator POST request. Should validate the data and update the the
 * character's status in the application state accordingly.
 *
 * @param saveRam The save ram data sent from the emulator.
 * @param res The express response object. Only used to send a confirmation of the data being
 * submitted.
 */
function handleEmulatorEndpoint({ body: saveRam }: express.Request, res: express.Response): void {
  // eslint-disable-next-line no-console
  console.log(saveRam);

  res.sendStatus(202);
}

/**
 * Create an express application that will listen for post requests to the __/emu__ endpoint. To be
 * used for save RAM changes from a custom emitter script written for BizHawk.
 *
 * @returns A specialized express application for listening to emulator save ram changes.
 */
export default function createApp(): express.Express {
  const app = express();

  app.use(express.json());
  app.post('/emu', handleEmulatorEndpoint);

  return app;
}
