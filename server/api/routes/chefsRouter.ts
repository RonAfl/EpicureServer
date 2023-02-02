import express from 'express';
import chefController from '../controllers/chefsController';
import { jwtMiddleware } from '../middlewares/jwtMiddleware';
const router = express.Router();
const controller = new chefController()


router.get('/', controller.getChefs);
router.get('/chef-of-week', controller.getChefOfTheWeek)
router.get('/:id', controller.getById);
router.use(jwtMiddleware);
router.post('/', controller.postChefs);
router.put('/:id', controller.updateById);
router.delete('/:id', controller.deleteChefById);

export default router;

//router.use(JwtMiddleware)
//password encyption