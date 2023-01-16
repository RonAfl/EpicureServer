import restaurantsHandler from '../handlers/restaurantsHandler';
import { Response, Request, NextFunction } from "express"
import restaurantsModel from '../../../database/models/restaurantsModel';
//import json from 'express';

export default class restaurantController {

    handler
    constructor() {
        this.handler = new restaurantsHandler;
    }

    getRestaurants = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const restaurants = await this.handler.getAllRestaurants();
            console.log(restaurants);
            res.json(restaurants);
        } catch (e: any) {
            next(e);
        }
    }

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const restaurant = await this.handler.getRestaurantById(id);
            res.json(restaurant);
        } catch (e: any) {
            next(e);
        }
    }

    postRestaurants = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newRestaurant = new restaurantsModel({
                name: req.body.name,
                image: req.body.image,
                chef: req.body.chef
            });
            this.handler.postRestaurant(newRestaurant);
            res.json({ status: true });

        } catch (e: any) {
            next(e);
        }
    }

    updateById = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const name = req.body.name;
        try {
            await this.handler.updateRestaurantNameById(id, name);
            res.json({ status: true });
        } catch (e: any) {
            next(e);
        }
    }

    deleteRestaurantById = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        try {
            await this.handler.deleteById(id);
            res.json({ status: true });
        } catch (e: any) {
            next(e);
        }
    }


    getRestaurantsBySearchString = async (req: Request, res: Response, next: NextFunction) => {
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