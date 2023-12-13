const express = require('express');
const router = express.Router();
const sausages = require('../data/sausages.json');

router.get('/', (req, res) => {
  res.json(sausages);
});

module.exports = router;
