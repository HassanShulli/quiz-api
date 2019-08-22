const express = require('express');
const router = express.Router();

const quizCtrl = require('../app/controllers/quizController');

router.post('/create', quizCtrl.create);
router.get('/read', quizCtrl.read);
router.put('/update', quizCtrl.update);
router.delete('/delete/:id', quizCtrl.delete);

module.exports = router;