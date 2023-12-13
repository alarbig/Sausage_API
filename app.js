const express = require('express');
const cors = require('cors');
const sausageRoutes = require('./routes/sausages');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/sausages', sausageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
