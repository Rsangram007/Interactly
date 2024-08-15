const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
   