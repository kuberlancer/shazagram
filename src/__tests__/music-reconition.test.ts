import 'reflect-metadata';
import fs from 'fs';
import path from 'path';
import { Server } from 'http';
import multer from 'multer';
import request from 'supertest';
import { cleanUpMetadata, InversifyExpressServer } from 'inversify-express-utils';
import { Application, json, urlencoded } from 'express';
import { container } from '../container';
import { MusicDetail } from '../modules/music-recognition/music-recognition.interface';

import '../modules/music-recognition/music-recognition.controller';

describe('Music recognition from uploaded audio file', () => {
  let server: InversifyExpressServer;
  let app: Application;
  let httpServer: Server;

  beforeAll(() => {
    server = new InversifyExpressServer(container);

    server.setConfig((_app) => {
      _app.use(json());
      _app.use(urlencoded({ extended: true }));
      _app.use(multer({
        dest: `${__dirname}/uploads`,
      }).single('music'));
    });

    app = server.build();

    httpServer = app.listen(1337);
  });

  afterAll(() => {
    httpServer.close();
  });

  beforeEach(() => {
    cleanUpMetadata();
  });

  it('should recognize audio file correctly', async () => {
    await request(app)
      .post('/recognition')
      .set('Content-Type', 'multipart/form-data')
      .attach('music', path.join(__dirname, 'sound_file.mp3'))
      .expect(200)
      .then((res) => {
        const expectedDetail: MusicDetail = {
          subtitle: 'Rick Astley',
          title: 'Never Gonna Give You Up',
          url: 'https://www.shazam.com/track/357027/never-gonna-give-you-up',
        };
        expect(res.body).toEqual(expectedDetail);
      });
  });

  it('should cleanup the upload folder', async () => {
    await request(app)
      .post('/recognition')
      .set('Content-Type', 'multipart/form-data')
      .attach('music', path.join(__dirname, 'sound_file.mp3'))
      .expect(200)
      .then(() => {
        const uploadFolder = path.join(__dirname, 'uploads');
        fs.readdir(uploadFolder, (err, files) => {
          expect(files).toHaveLength(0);
        });
      });
  });
});
