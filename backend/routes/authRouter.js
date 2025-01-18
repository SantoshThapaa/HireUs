import { Router } from 'express';
import { googleLogin } from '../controllers/auth.controller.js'; // Use the correct import statement

const router = Router();

router.get('/test', (req, res) => {
    res.send('Test route');
});

router.get('/google', googleLogin);  // Use googleLogin directly

export default router;
