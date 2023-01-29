import dishesHandler from '../handlers/dishesHandler';
import { Response, Request, NextFunction } from "express"
import json from 'express';
import dishesModel from "../../../database/models/dishesModel";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

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
        const headers = req.headers;
        const token: string = <string>headers.token;
        jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, async (err, decoded) => {
            if (err) {
                next(err);
            }
            else {
                console.log(decoded);
                try {
                    const newDish = new dishesModel({
                        name: req.body.name,
                        image: req.body.image,
                        price: req.body.price,
                        ingredients: req.body.ingredients,
                        tags: req.body.tags,
                        restaurant: req.body.restaurant,
                    });
                    console.log(newDish);
                    await this.handler.postDish(newDish);
                    res.json(newDish);

                } catch (e: any) {
                    next(e);
                }
            }
        })

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
        const ingredients = req.body.ingredients;
        const image = req.body.image;
        const price = req.body.price;
        const tags = req.body.tags;
        const restaurant = req.body.restaurant;
        // console.log(1,id,2,dish_name,3,ingredients,4,image,5,price,6,tags,7,restaurant)
        const headers = req.headers;
        const token: string = <string>headers.token;
        jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, async (err, decoded) => {
            if (err) {
                next(err);
            }
            else {
                console.log(decoded);
                try {
                    await this.handler.updateDishNameById(id, dish_name, ingredients, image, price, tags, restaurant);
                    res.json({ status: true });
                } catch (e: any) {
                    next(e);
                }
            }
        })

    }

    deleteDishById = async (req: Request, res: Response, next: NextFunction) => {
        const headers = req.headers;
        const token: string = <string>headers.token;
        jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, async (err, decoded) => {
            if (err) {
                next(err);
            }
            else {
                console.log(decoded);
                try {
                    const id = req.params.id;
                    await this.handler.deleteById(id);
                    res.json({ status: true });
                } catch (e: any) {
                    next(e);
                }
            }
        })

      
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
