const express = require('express');
const router = express.Router();
const Sausage  = require('../../model/Sausage')

router.get('/', (req, res) => {
    Sausage.findAll()
        .then(sausages => res.json(sausages))
        .catch(err => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
    Sausage.findByPk(req.params.id)
        .then(sausage => res.json(sausage))
        .catch(err => res.status(500).json(err))
});

router.post('/', (req, res) => {
  try {
    const sausage = Sausage.create(req.body);
    res.json(sausage);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.put('/:id', (req, res) => {
    Sausage.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(sausage => res.json(sausage))
        .catch(err => res.status(500).json(err))
});

router.delete('/:id', (req, res) => {
    Sausage.destroy({
        where: {
          id: req.params.id
        }
    })
        .then(sausage => res.json(sausage))
        .catch(err => res.status(500).json(err))
});

module.exports = router;