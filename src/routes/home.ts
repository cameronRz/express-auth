import { Router } from 'express';
import { HomeController } from '../controllers/home-controller';

const router = Router();
const homeController = new HomeController();

router.get('/', homeController.index);

export default router;