import path from 'path';
import 'reflect-metadata';
import { Application } from 'express';
import { createExpressServer } from 'routing-controllers';

const app: Application = createExpressServer({
  routePrefix: 'api',
  controllers: [
    path.join(__dirname, '/modules/**/*.controller.*'),
  ],
});

app.listen(5000);
