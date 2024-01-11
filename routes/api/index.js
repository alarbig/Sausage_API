const router = require('express').Router();
const sausages = require('./sausages');

router.use('/sausages', sausages);

module.exports = router;