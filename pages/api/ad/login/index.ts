import { prisma } from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { createBaseRequestHeaders, LoginProvider } from '../../../../variables/headers';

import { once } from 'events';
import { AResponseHandlerError, defaultHandler, execute, NotHandledError, NotFoundError, _with } from '../../../../helpers/api_helper';


export async function getSession(signal?: AbortSignal) {
    const dynamicRes: Response = await fetch(`https://autotechnics.ua/`,
      {
        cache: 'no-store',
        credentials: 'include',
        headers: await createBaseRequestHeaders(),
        signal,
      }).catch ((error) => {
        throw new Error(`Failed fetch request: https://autotechnics.ua/`, error);
      });

    return dynamicRes;
  }

export const processGetSession = _with(async (response, signal, uuid) => {

  if (200 <= response.status && response.status < 300) {
   
    

    // let setCookiesHeader = response.headers.get('Set-Cookie');
    // console.log(setCookiesHeader, setCookiesHeader);
    // let matches = setCookiesHeader && setCookiesHeader.match(/([a-zA-Z0-9=]+)/gm);
    // let sessionId = matches && matches[0];
    // console.log(sessionId);
    // if (sessionId) {
    //   requestHeadersAd.set('Authorization', `${sessionId}`);
    // }
    return;
  }

  throw new NotHandledError(response);
}, defaultHandler)


export async function login(signal?: AbortSignal) {
  const dynamicRes: Response = await fetch(`https://ecom.ad.ua/api/user/login`,
    {
      body: JSON.stringify({comId: 15, login: "10115", pwd: "e89f1a11"}),
      cache: 'no-store',
      credentials: 'include',
      headers: await createBaseRequestHeaders(),
      signal,
      method: 'POST'
    }
    ).catch ((error) => {
      throw new Error(`Failed fetch request: https://ecom.ad.ua/api/user/login`, error);
    });

  return dynamicRes;
}



export const processLogin = _with(async (response, signal, uuid) => {
  if (200 <= response.status && response.status < 300) {
    const data = await response.json();
    const token = data['token'];
    console.log('Process Login: TOKEN=%j', token);
    LoginProvider.GetInstance().setToken(token);

    return;
  }
  throw new NotHandledError(response);
}, defaultHandler)



export default async function handler (req: NextApiRequest, res: NextApiResponse) {

  const abort = new AbortController;
  once(req.socket, 'close').then(() => {
   abort.abort(new Error('Socket closed'));
  });

  let isLastPage: boolean = false;


   try {
    //  await execute(() => getSession(), processGetSession, undefined, abort.signal);
     await execute(() => login(), processLogin, undefined, abort.signal);
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
 
 res.status(201);
 res.setHeader('Content-Type', 'application/json');
 res.end(JSON.stringify({
   message: `Login is ok`
 }));
}