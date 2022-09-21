import {Middleware} from '@loopback/rest';
import {sign} from 'jsonwebtoken';
const algo = 'aes256';

export const createToken: Middleware = async (middlewareCtx, next) => {
  const {request} = middlewareCtx;

  if (!request.headers || !request.headers.usercookie)
    throw new Error('User cookie not found in request');
  const userCookie: any = request.headers.usercookie;
  let userId;
  try {
    userId = JSON.parse(userCookie).userId;
  } catch (e) {
    console.log(e);
    throw e;
  }
  const jwtSecretKey: string = process.env.SECRET_KEY || 'secret-key';
  let data = {
    time: Date(),
    userId: userId,
  };
  const token = sign(data, jwtSecretKey);
  middlewareCtx.request.headers['authToken'] = token;
  return next();
};
