import { Request, Response } from 'express';

class BaseCtrl {

  // Get all
  getAll = async (req: Request, res: Response) => {
    try {
      return res.status(200);
    } catch (err: any) {
      return res.status(400);
    }
  };
}

export default BaseCtrl;
