import express from 'express';

/**
 * Create an express application that will listen for post requests to the __/emu__ endpoint. To be
 * used for save RAM changes from a custom emitter script written for BizHawk.
 *
 * @returns A specialized express application for listening to emulator save ram changes.
 */
export default function createApp(): express.Express {
  const app = express();
  app.use(express.json());
  app.post('/emu', (_, res) => {
    res.sendStatus(202);
  });

  return app;
}
