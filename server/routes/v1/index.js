const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/lexicals', require('./lexicals'));

module.exports = exports = router;
