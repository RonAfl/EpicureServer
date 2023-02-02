import chefsHandler from '../handlers/chefsHandler';
import { Response, Request, NextFunction } from "express"
import chefsModel from "../../../database/models/chefsModel";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default class chefController {
    handler
    constructor() {
        this.handler = new chefsHandler;
    }
    getChefs = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const chefs = await this.handler.getAllChefs();
            res.json(chefs);
        } catch (e: any) {
            next(e);
        }
    }

    getChefOfTheWeek = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const chef = await this.handler.getWeekChef();
            res.json(chef);
        } catch (e: any) {
            next(e);
        }
    }

    // HTTP GET /chefs    
    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const chef = await this.handler.getChefById(id);
            res.json(chef);
        } catch (e: any) {
            next(e);
        }
    }

    postChefs = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newChef = new chefsModel({
                name: req.body.name,
                image: req.body.image,
                description: req.body.description,
                weekChef: req.body.weekChef
            });
            if(!(newChef.name === '' || newChef.image === '' || newChef.description === '')) {
                await this.handler.postChef(newChef);
                res.json(newChef);
            }else{
                res.json({message:'please fill all required fields'})
            }
           
        } catch (e: any) {
            next(e);
        }
    }


    updateById = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const name = req.body.name;
        const description = req.body.description;
        const image = req.body.image;
        const weekChef = req.body.weekChef;
        // console.log(2,'in controller')
        try {
            const user = await this.handler.updateChefNameById(id, name, description, image, weekChef);
            res.json(user);
        } catch (e: any) {
            next(e);
        }
    }




    deleteChefById = async (req: Request, res: Response, next: NextFunction) => {
        //console.log(1, 'In chef controller');
        const id = req.params.id;
        try {
            //console.log(2, 'In chef controller -> try');
            await this.handler.deleteById(id);
            res.json({ status: true });
        } catch (e: any) {
            next(e);
        }
    }



    getChefsBySearchString = async (req: Request, res: Response, next: NextFunction) => {
        const searchString = req.query.name;
        if (typeof searchString !== "string") {
            return res.status(400).send({ error: "Search string is required" });
        }
        try {
            const docs = await this.handler.getDocsByName(searchString);
            res.json(docs);
        } catch (e: any) {
            next(e);
        }
    }
}
