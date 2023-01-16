import express from 'express';
import chefController from '../controllers/chefsController';

const router = express.Router();
const controller = new chefController()
router.get('/', controller.getChefs);
router.get('/:id', controller.getById);
router.post('/', controller.postChefs);
router.put('/:id', controller.updateById);
router.delete('/:id', controller.deleteChefById);

export default router;