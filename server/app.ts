import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';

import setRoutes from './routes';

const app = express();
app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

setRoutes(app);

const main = async (): Promise<void> => {
  try {
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    app.listen(app.get('port'), () => console.log(`Server sent events listening on port ${app.get('port')}`));
  } catch (err) {
    console.error(err);
  }
};

if (process.env.NODE_ENV !== 'test') {
  main();
}

export { app };
