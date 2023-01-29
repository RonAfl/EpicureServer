import { Response, Request, NextFunction } from "express"
import usersHandler from "../handlers/usersHandler";
import UsersModel from '../../../database/models/usersModel'
import jwt from 'jsonwebtoken';

export default class AuthController {

    handler
    constructor() {
        this.handler = new usersHandler;
    }

    // postUser = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const newUser = new UsersModel({
    //             username: req.body.username,
    //         });
    //         const accessToken = jwt.sign(newUser, process.env.ACCESS_TOKEN_SECRET);
            
            
    //         this.handler.postUser(newUser);
    //         res.json({ accessToken : accessToken });
    //     } catch (e: any) {
    //         next(e);
    //     }

    // }

}