import express = require('express');
const router = express.Router();
import settingController from '../controllers/settingController';
// import authMiddleware from '../middleware/authMiddleware';

router.post('/:id', settingController.set);
router.get('/', settingController.getAll);
router.get('/:id', settingController.getOne);

export default router;
