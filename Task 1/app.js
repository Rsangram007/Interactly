const express = require('express');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactRoutes');
const pool =require('./db/database')
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(contactRoutes);

const PORT = process.env.PORT || 3000;

pool.connect()
    .then(client => {
        console.log('Connected to PostgreSQL database');
        client.release();  
    })
    .catch(err => {
        console.error('Error connecting to the database', err.stack);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
