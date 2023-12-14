import { Router } from 'express';
import authRoutes from './auth';
import homeRoutes from './home';

const router = Router();

router.use('/', authRoutes);
router.use('/', homeRoutes);

export default router;