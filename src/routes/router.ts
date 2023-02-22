import express = require('express');
const router = express.Router();

import userRouter from './userRouter';
import settingRouter from './settingRouter';
import noteRouter from './noteRouter';

router.use('/user', userRouter);
router.use('/setting', settingRouter);
router.use('/note', noteRouter);

export default router;
