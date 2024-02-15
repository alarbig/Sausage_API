const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { Op, NUMBER } = require('sequelize');
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

router.get('/sausage_name/:sausage_name', (req, res) => {
  console.log("Request to /find with params:", req.params); // Log the parameters to see what's received

  const sausageName = req.params.sausage_name;

  // Check if sausageName is not provided or is an empty string
  if (!sausageName || sausageName == null || sausageName.trim() === '') {
    console.log("No sausage name provided in the request."); 
    return res.status(400).json({ error: 'Sausage name is required.' });
  }

  Sausage.findAll({
    where: {
      sausage_name: {
        [Op.like]: '%' + sausageName + '%'
      }
    }
  })
  .then(sausages => {
    if (sausages && sausages.length > 0) {
      res.json(sausages); // Send the found sausages
    } else {
      res.status(404).json({ message: 'No sausages found!' });
    }
  })
  .catch(err => {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Internal server error' });
  });
});

router.get('/sausage_type/:sausage_type', (req, res) => {
  console.log("Request to /find with params:", req.params); // Log the parameters to see what's received

  const sausageType = req.params.sausage_type;

  if (!sausageType || sausageType == null || sausageType.trim() === '') {
    console.log("No sausage name provided in the request."); 
    return res.status(400).json({ error: 'Sausage name is required.' });
  }

  Sausage.findAll({
    where: {
      sausage_type: {
        [Op.like]: '%' + sausageType + '%'
      }
    }
  })
  .then(sausages => {
    if (sausages && sausages.length > 0) {
      res.json(sausages); // Send the found sausages
    } else {
      res.status(404).json({ message: 'No sausages found!' });
    }
  })
  .catch(err => {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Internal server error' });
  });
});

router.get('/country/:sausage_country_of_origin', (req, res) => {
  const sausageCountry = req.params.sausage_country_of_origin;

  if (!sausageCountry || sausageCountry == null || sausageCountry.trim() === '') {
    console.log("No sausage name provided in the request."); 
    return res.status(400).json({ error: 'Sausage name is required.' });
  }

  Sausage.findAll({
    where: {
      sausage_country_of_origin: {
        [Op.like]: '%' + sausageCountry + '%'
      }
    }
  })
  .then(sausages => {
    if (sausages && sausages.length > 0) {
      res.json(sausages); // Send the found sausages
    } else {
      res.status(404).json({ message: 'No sausages found!' });
    }
  })
  .catch(err => {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Internal server error' });
  });
});

module.exports = router;