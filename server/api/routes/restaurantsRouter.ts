import express from 'express';
import restaurantsController from '../controllers/restaurantsController';

const router = express.Router();
const controller = new restaurantsController;

router.get('/',controller.getRestaurants);
router.get('/:id',controller.getById);
router.post('/',controller.postRestaurants);
router.put('/:id',controller.updateById);
router.delete('/:id',controller.deleteRestaurantById);


export default router;