import { appFactory } from './appFactory';

const bootstrap = async () => {
  const app = await appFactory();
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};

bootstrap();
