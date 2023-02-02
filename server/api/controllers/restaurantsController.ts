import restaurantsHandler from '../handlers/restaurantsHandler';
import { Response, Request, NextFunction } from "express"
import restaurantsModel from '../../../database/models/restaurantsModel';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
//import json from 'express';

export default class restaurantController {

    handler
    constructor() {
        this.handler = new restaurantsHandler;
    }

    getRestaurants = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const restaurants = await this.handler.getAllRestaurants();
            res.send(restaurants);
        } catch (e: any) {
            next(e);
        }
    }

    getWeekChefRestaurants = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            console.log(5, typeof (id));
            const restaurants = await this.handler.getAllWeekChefRestaurants(id);
            res.send(restaurants);
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
                chef: req.body.chef,
                stars: req.body.stars
            })
            this.handler.postRestaurant(newRestaurant);
            res.json(newRestaurant);
        }
        catch (e: any) {
            next(e);
        }
    }


    updateById = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const name = req.body.name;
        const stars = req.body.stars;
        const chef = req.body.chef;
                try {
                    await this.handler.updateRestaurantNameById(id, name, stars, chef);
                    res.json({ status: true });
                }
                catch (e: any) {
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