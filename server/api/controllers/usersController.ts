import { Response, Request, NextFunction } from "express"
import usersHandler from "../handlers/usersHandler";
import UsersModel from '../../../database/models/usersModel'
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default class UsersController {

    handler
    constructor() {
        this.handler = new usersHandler;
    }

    getUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const headers = req.headers;
            //console.log(headers);
            const username:string = <string>headers.username;
            const password:string = <string>headers.password;
            //console.log(username, password);
            const users = await this.handler.getAllUsers(username);
            if(!users.length)
            {
                res.status(404).json({ message: 'User not found' });
            }
            users.forEach((user)=>{
                if(user.password === password)
                {
                    const accessToken = jwt.sign({username: username, isSuper: user.isSuper}, `${process.env.ACCESS_TOKEN_SECRET}`);
                    return res.status(200).json({ user:user, accessToken:accessToken });
                }
            })
            
            console.log(users);
            res.json(users);
        } catch (e: any) {
            next(e);
        }
    }

    postUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newUser = new UsersModel({
                username: req.body.username,
                password: req.body.password
            });

            this.handler.postUser(newUser);
            res.json({ status: true });
        } catch (e: any) {
            next(e);
        }

    }

}