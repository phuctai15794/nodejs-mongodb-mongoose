const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController');

router.post('/action', courseController.action);
router.post('/store', courseController.store);
router.get('/create', courseController.create);
router.delete('/:id/delete', courseController.delete);
router.delete('/:id/force-delete', courseController.forceDelete);
router.put('/:id/update', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.get('/:id/edit', courseController.edit);
router.get('/:slug', courseController.detail);
router.get('/', courseController.index);

module.exports = router;
