import { Router } from 'express';
import ContactsRouter from './contacts.js';
import AuthRouter from './auth.js';

const router = Router();

router.use('/contacts', ContactsRouter);
router.use('/auth', AuthRouter);

export default router;
