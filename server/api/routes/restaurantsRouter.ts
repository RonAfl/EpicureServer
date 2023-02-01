import express from 'express';
import restaurantsController from '../controllers/restaurantsController';
import { jwtMiddleware } from '../middlewares/jwtMiddleware';

const router = express.Router();
const controller = new restaurantsController;

router.get('/',controller.getRestaurants);
router.get('/week-chef-restaurants/:id',controller.getWeekChefRestaurants);
router.get('/:id',controller.getById);
router.use(jwtMiddleware);
router.post('/',controller.postRestaurants);
router.put('/:id',controller.updateById);
router.delete('/:id',controller.deleteRestaurantById);


export default router;