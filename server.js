const express = require('express');
const sausageRoutes = require('./routes/api/sausages');
const { Sausage } = require('./model/Sausage');
const sequelize = require('./config/connection');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

const secretKey = process.env.SECRET

//setting up middleware for authentication
//this needs some work. Still figuring out best way to implement this.
// const authMiddleware = (req, res, next) => {
//   const method = req.method;
//   const authHeader = req.headers.authorization;
//   if(method !== 'POST' && method !== 'PUT' && method !== 'DELETE') {
//     return res.status(401).json({ message: 'You are not authorized to do that.' });
// }
// }

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use('/api/sausages', sausageRoutes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
