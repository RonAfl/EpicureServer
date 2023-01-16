import { Response, Request, NextFunction } from "express"
import chefsHandler from '../handlers/chefsHandler'
import restaurantsHandler from '../handlers/restaurantsHandler'
import dishesHandler from '../handlers/dishesHandler'

export default class searchController {

  chef_handler
  dishes_handler
  restaurants_handler
  constructor(){
    this.chef_handler = new chefsHandler;
    this.dishes_handler = new dishesHandler;
    this.restaurants_handler = new restaurantsHandler;

  }

  getDocsBySearchString = async (searchString: string, next: NextFunction) => {
    console.log(searchString)
    try {
      const promises = await Promise.all([
        this.dishes_handler.getDocsByName(searchString),
        this.chef_handler.getDocsByName(searchString),
        this.restaurants_handler.getDocsByName(searchString)
      ])
      return promises;
    } catch (e: any) {
      next(e);
    }
  }
}
