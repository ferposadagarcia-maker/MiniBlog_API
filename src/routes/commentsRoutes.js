const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const { validatePost } = require('../middlewares/validations');

router.post('/', commentsController.createComment);
router.get('/post/:postId', commentsController.getCommentsByPost);

module.exports = router;