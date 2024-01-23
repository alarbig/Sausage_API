const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Sausage  = require('../../model/Sausage')

// authentication middleware setup

function authToken (req, res, next){
  const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) return res.sendStatus(401);

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user ) => {
            if (err) 
            return res.sendStatus(403);
            req.user = user;
            next();
        });
}


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

router.post('/', authToken, (req, res) => {
  try {
    const sausage = Sausage.create(req.body);
    res.json(sausage);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.put('/:id', authToken, (req, res) => {
    Sausage.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(sausage => res.json(sausage))
        .catch(err => res.status(500).json(err))
});

router.delete('/:id', authToken, (req, res) => {
    Sausage.destroy({
        where: {
          id: req.params.id
        }
    })
        .then(sausage => res.json(sausage))
        .catch(err => res.status(500).json(err))
});

module.exports = router;