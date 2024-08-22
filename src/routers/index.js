import { Router } from 'express';
import ContactsRouter from './contacts.js';
import AuthRouter from './auth.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use('/contacts', authenticate, ContactsRouter);
router.use('/auth', AuthRouter);

export default router;
