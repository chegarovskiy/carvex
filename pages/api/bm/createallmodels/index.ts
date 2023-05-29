import { NextApiRequest, NextApiResponse } from 'next';
import { once } from 'events';
import { AResponseHandlerError, execute, NotFoundError, _with } from '../../../../helpers/api_helper';
import { getModels, processModels } from '../createmodels/index';
import { _AD_MARKED_MARKS } from '../../../../variables/brandsMarked';
import { stringify } from 'querystring';


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  
  const abort = new AbortController;
  once(req.socket, 'close').then(() => {
   abort.abort(new Error('Socket closed'));
  });

  

  for(let markId of _AD_MARKED_MARKS) {

    let isLastPage: boolean = false;
    for (let page = 1; !isLastPage; page ++) {
        try {
          await execute(() => getModels(page, markId), processModels, undefined, abort.signal, markId);
        } catch (error) {
          console.log('err', error); 
          if (error instanceof NotFoundError) {
            isLastPage = true;
          } else if (error instanceof AResponseHandlerError ) {
            res.status(error.response.status);
            error.response.headers.forEach((value, key) => {
              res.setHeader(key, value);
            })
            res.end(await error.response.text());
            return;
          } else {
            console.log('model created error', error);
            res.status(503);
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({
              message: error instanceof Error ? error.message : String(error),
              name: error instanceof Error ? error.name : undefined,
            }));
            return;
          }
        }
      }
  }

    

    res.status(201);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({message: `Models of marked brands created`}));
}