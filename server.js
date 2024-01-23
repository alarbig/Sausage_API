const express = require('express');
const sausageRoutes = require('./routes/api/sausages');
const userRoute = require('./routes/api/user')
const sequelize = require('./config/connection');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const { authMiddleWare } = require('./config/authorization')

// const secretKey = process.env.SECRET;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use('/api/user', userRoute);
app.use('/api/sausages', sausageRoutes);

app.post('/login', (req, res) =>{
  const username = req.body.email
  const user = { user: username}

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({ accessToken: accessToken })
})


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
