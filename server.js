const express = require('express');
const bcrypt = require('bcrypt');
const sausageRoutes = require('./routes/api/sausages');
const userRoute = require('./routes/api/user')
const sequelize = require('./config/connection');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const { authMiddleWare } = require('./config/authorization')
const User = require ('./model/User')

// const secretKey = process.env.SECRET;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use('/api/user', userRoute);
app.use('/api/sausages', sausageRoutes);

app.get('/login', async (req, res) => {
  const { email, password } = req.body;

  //validate the input
  if(!email || !password){
    return res.status(400).json({ error: 'Please supply a valid email or password. '})
  }

  try {
    //check if the user is the in DB
    const user = await User.findOne({ where: {email: req.body.email} })
    if (!user) {
      return res.status(404).json({ error: 'No user found with that email'})
    }
    const passwordIsValid = await bcrypt.compare(password, user.password)
    if(!passwordIsValid){
      return res.status(403).json({error: "Password is incorrect"})
    }
    
    const accessToken = jwt.sign({id: user.id, email: user.email}, process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: '2h'})
    res.json({ accessToken: accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error, please try again later'})
  }
});

// app.post('/login', (req, res) =>{
//   const username = req.body.email
//   if (!username){
//     return res.status(400).json({ error: 'Please supply an email.'})
//   }
//   const user = { user: username}

//   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//   res.json({ accessToken: accessToken })
// })


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
