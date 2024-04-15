import BaseCtrl from './controllers/base';
import { Router, Application } from 'express';

const setRoutes = (app: Application): void => {
  const router = Router();
  const baseCtrl = new BaseCtrl();

  // Get All
  router.route('/getAll').get(baseCtrl.getAll);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

};

export default setRoutes;
