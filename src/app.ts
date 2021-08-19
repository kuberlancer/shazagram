import express, { Request, Response } from 'express';

const app = express();

app.get('/', (request: Request, response: Response) => {
  response.send('Hello World!');
});

app.listen(5000, () => {
  console.log('App is running');
});
