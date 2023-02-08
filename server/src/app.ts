import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  return res.send('zchjsdvhjkdfvhjk');
});

app.listen(5000, () => {
  console.log('Application running on port 5000!');
});
