const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/lexicals', require('./lexicals'));
router.use('/complexity', require('./complexity'));

module.exports = exports = router;
