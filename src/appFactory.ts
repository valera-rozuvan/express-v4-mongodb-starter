import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { readFile } from './file_access';

interface IResponseBody {
  status: number;
  data: string;
}

export const appFactory = async (): Promise<Application> => {
  const app: Application = express();
  app.use(bodyParser.json());

  app.get('/', (req: Request, res: Response) => {
    res.status(200).send('OK');
  });

  app.get('/file-content', async (req: Request, res: Response) => {
    const payload: IResponseBody = {
      status: 200,
      data: '',
    };

    let fileData = '';

    try {
      fileData = await readFile('./files/file.txt');
    } catch (err) {
      console.log('we got an error while reading the file');
      console.log(err);

      res.status(500).send('fail');
      return;
    }

    payload.data = fileData;
    res.status(200).json(payload);
  });

  return app;
};
