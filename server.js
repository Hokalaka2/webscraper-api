const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require ('dotenv').config();
const { Pool }  = require ('pg');

const {
POSTGRES_HOST,
POSTGRES_DB,
POSTGRES_USER,
POSTGRES_PASSWORD
} = process.env

const client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my Express API!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


process.on('SIGINT', () => {
    client.end().then(() => {
      console.log('Pool has ended');
      process.exit(0);
    });
});

module.exports = {client}