import { Request, Response } from 'express';

class BaseCtrl {
  // Get all
  getAll = async (req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // flush the headers to establish SSE with client

    let counter = 0;
    let interValID = setInterval(() => {
      counter++;
      if (counter >= 10) {
        clearInterval(interValID);
        const closeMessage = { type: 'close' };
        res.write(`data: ${JSON.stringify(closeMessage)}\n\n`); // res.write() instead of res.send()
        return;
      }
      const message = { type: 'message', message: { num: counter } };
      res.write(`data: ${JSON.stringify(message)}\n\n`); // res.write() instead of res.send()
    }, 2000);

    // If client closes connection, stop sending events
    res.on('close', () => {
      console.log('client dropped me');
      clearInterval(interValID);
      res.end();
    });
  };
}

export default BaseCtrl;
