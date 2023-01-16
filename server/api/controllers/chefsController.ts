import chefsHandler from '../handlers/chefsHandler';
import { Response, Request, NextFunction } from "express"
import chefsModel from "../../../database/models/chefsModel";

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
                description: req.body.description
            });

            this.handler.postChef(newChef);
            res.json({ status: true });
        } catch (e: any) {
            next(e);
        }
    }

    updateById = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const name = req.body.name;
        try {
            await this.handler.updateChefNameById(id, name);
            res.json({ status: true });
        } catch (e: any) {
            next(e);
        }
    }

    deleteChefById = async (req: Request, res: Response, next: NextFunction) => {
        console.log(1,'In chef controller');
        const id = req.params.id;
        try {
            console.log(2,'In chef controller -> try');
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
