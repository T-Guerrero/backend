import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.listen(3000, () => {
  console.log('Server Running on 3000!');
});
app.use('/', (req: Request, res: Response) => {
  res.status(200).send({ data: 'Hello, world!' });
});
