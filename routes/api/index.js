const router = require('express').Router();
const sausages = require('./sausages');
const user = require('./user');

router.use('/user', user);
router.use('/sausages', sausages);


module.exports = router;