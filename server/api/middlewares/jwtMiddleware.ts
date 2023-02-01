import { Response, Request, NextFunction } from "express"
import jwt from 'jsonwebtoken';
import 'dotenv/config';


export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
    const token: string = <string>req.headers.token;
    console.log(3, token);
    console.log(req.headers);
    jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, function(err, decoded) {
      if (err) {
        console.log(10, 'in jwt error')
        next(err);
      } else {
        req.body.decoded = decoded;
        next();
      }
    });
  }
