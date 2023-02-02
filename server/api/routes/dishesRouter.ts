import express from 'express';
import dishesController from '../controllers/dishesController';
import { jwtMiddleware } from '../middlewares/jwtMiddleware';

const router = express.Router();
const controller = new dishesController;
router.get('/',controller.getDishes);
router.get('/:id',controller.getById);
router.use(jwtMiddleware);
router.post('/',controller.postDishes);  
router.put('/:id',controller.updateDishById);
router.delete('/:id',controller.deleteDishById);



export default router;