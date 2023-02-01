import express from 'express';
const router = express.Router();

import dishesRouter from './routes/dishesRouter';
import restaurantRouter from './routes/restaurantsRouter';
import chefsRouter from './routes/chefsRouter'
import searchRouter from './routes/searchRouter'
import usersRouter from './routes/usersRouter'


console.log(1,'apiroutes');
router.use('/users', usersRouter)
router.use('/chefs', chefsRouter);
router.use('/dishes', dishesRouter);
router.use('/restaurants', restaurantRouter);
router.use('/search', searchRouter);

export default router;