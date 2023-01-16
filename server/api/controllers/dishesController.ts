import dishesHandler from '../handlers/dishesHandler';
import { Response, Request, NextFunction } from "express"
import json from 'express';
import dishesModel from "../../../database/models/dishesModel";

export default class dishesController {
    handler
    constructor() {
        this.handler = new dishesHandler;
    }

    // HTTP GET /dishes
    getDishes = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dishes = await this.handler.getAllDishes();
            res.json(dishes);
        } catch (e: any) {
            next(e);
        }
    }

    postDishes = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newDish = new dishesModel({
                name: req.body.name,
                price: req.body.price,
                ingredients: req.body.ingredients,
                tags: req.body.tags,
                restaurant: req.body.restaurant
            });
            this.handler.postDish(newDish);
            res.json({ status: true });

        } catch (e: any) {
            next(e);
        }
    }

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const chef = await this.handler.getDishById(id);
            res.json(chef);
        } catch (e: any) {
            next(e);
        }
    }

    updateDishById = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const dish_name = req.body.name;
        try {
            await this.handler.updateDishNameById(id, dish_name);
            res.json({ status: true });
        } catch (e: any) {
            next(e);
        }
    }

    deleteDishById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            await this.handler.deleteById(id);
            res.json({ status: true });
        } catch (e: any) {
            next(e);
        }
    }

    getDishesBySearchString = async (req: Request, res: Response, next: NextFunction) => {
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
