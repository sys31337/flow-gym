import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { authRequest } from '@api/types/users';
import User from '@api/models/user';

const auth = async (req: authRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.headers.authorization) {
      console.log('here1');
      res.status(401);
      throw new Error('AUTHORIZATION_REQUIRED');
    }

    const token = req.headers.authorization.split(' ')[1];
    
    if (!token) {
      res.status(401);
      throw new Error('AUTHORIZATION_TOKEN_REQUIRED');
    }
    // const decodedValue = await admin.auth().verifyIdToken(token);

    // if (!decodedValue) {
    //   res.status(401);
    //   throw new Error('UNAUTHORIZED_BAD_TOKEN');
    // }
    // const { originalUrl } = req;
    // req.firebaseId = decodedValue.uid;
    // req.name = decodedValue.name;
    // req.email = decodedValue.email;
    // req.picture = decodedValue.picture;
    // req.authTime = new Date(decodedValue.auth_time * 1000);
    // req.providerId = decodedValue.firebase.sign_in_provider;
    // const user = await User.findOne({ firebaseId: decodedValue.uid });
    // // if ((originalUrl === '/api/v1/users/google-login' && !user) || (originalUrl !== '/api/v1/users' && method !== 'POST')) {
    // if ((originalUrl === '/api/v1/users/google-login' && !user)) {
    //   return next();
    // }
    // if (!user) {
    //   res.status(404);
    //   throw new Error('USER_NOTFOUND');
    // }

    // req.userId = user._id as Types.ObjectId;
    return next();
  } catch (e) {
    return next(e);
  }
};

const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFjM2UzZTU1ODExMWM3YzdhNzVjNWI2NTEzNGQyMmY2M2VlMDA2ZDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1ODI1NDg1NDUxNjMtamk2NjFqaGt2NnF1b3F2NWJpZG5mcGtkc2M0bjI0cWUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1ODI1NDg1NDUxNjMtamk2NjFqaGt2NnF1b3F2NWJpZG5mcGtkc2M0bjI0cWUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDEzOTQzMzI2NDQ0NjgzMTE2MzEiLCJlbWFpbCI6Im1lYmJtb2hoQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiVlZZUVZNVEJyRmhVVFliLVY3b0U1dyIsIm5hbWUiOiJNb2hhbWVkIFJpZGEgTWViZG91YSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJSkw3SU92Z2VHQWw4eTdSYURCRE1KSS1DREYyQklqZTVyY2piSUhYdk1qc1Rxcl9RPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ik1vaGFtZWQgUmlkYSIsImZhbWlseV9uYW1lIjoiTWViZG91YSIsImlhdCI6MTcxNTExNTQ0MSwiZXhwIjoxNzE1MTE5MDQxfQ.YF2v-2zhajlVdaYdkN_dEcqOfJj57smsrxQRq-FTj6fUxhAo41_25ZgIGx8B1st6vRJ1V2OsG2r1N17QS9QWZQehA3-j6f0v2e1H2kyBN1A1Ph3CKyxI8bI734q8Wn-yqWjgtrEA-Amj_A1UmxujGV5ICw5jxbju0eRIhwCyYsAKowxsuE-2SDeUoVBVsaCrecNSZ8H8qxuK9tKfuPp-5xBy3Svyjj8mcEgSl9dxFayP5MgHZRA8d9DzQw2bRtX26-BLvwu3Z6aigtuVnS0MW7LPiHpLjiG1moEiCGYK78Y2cvuDiIIzBtf9jDFzVshzdodhaSf-_SxBxla-6Cw14g";
JSON.parse(atob(token.split('.')[1]))

const isAdmin = async (req: authRequest, res: Response, next: NextFunction) => {
  try {
    const { firebaseId } = req;
    const user = await User.findOne({ firebaseId });
    if (!user) return res.status(404).send('USER_NOT_FOUND');
    if (user.isAdmin) return next();
    return res.status(401).send('NOT_ADMIN');
  } catch (error) {
    return next(error);
  }
};

export { auth, isAdmin };
