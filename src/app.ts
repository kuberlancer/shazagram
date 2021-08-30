import 'reflect-metadata';
import { json, urlencoded } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './container';

import './modules/music-recognition/music-recognition.controller';

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(json());
  app.use(urlencoded({ extended: true }));
});

const app = server.build();
app.listen(5000, () => {
  console.log('App is running');
});
