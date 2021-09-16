import 'reflect-metadata';
import multer from 'multer';
import { json, urlencoded } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './container';

import './modules/music-recognition/music-recognition.controller';

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(multer({
    dest: `${__dirname}/uploads`,
    limits: {
      fileSize: 4e+7,
    },
  }).single('music'));
});

const app = server.build();
app.listen(5000, () => {
  console.log('App is running');
});
