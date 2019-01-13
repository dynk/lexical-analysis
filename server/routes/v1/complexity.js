const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/complexity');

router.post('/', ctrl.post);

module.exports = router;
