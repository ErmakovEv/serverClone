import express = require('express');
const router = express.Router();
import noteController from '../controllers/noteController';

router.post('/:id', noteController.post);
router.post('/:id', noteController.set);
router.get('/', noteController.getAll);
router.get('/:id', noteController.getOne);
router.delete('/:id', noteController.remove);

export default router;
