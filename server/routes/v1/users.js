const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/users');

router.get('/', ctrl.get);
router.get('/:userId', ctrl.getById);
router.post('/', ctrl.post);
router.post('/login', ctrl.login);

module.exports = router;
