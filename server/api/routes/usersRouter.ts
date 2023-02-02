import express from 'express';
import usersController from '../controllers/usersController'

const router = express.Router();
const controller = new usersController;

router.get('/', controller.getUsers);
router.post('/', controller.postUser);

export default router;