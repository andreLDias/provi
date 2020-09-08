const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers/index')(app);

app.get('/health-check', (req, res) => {
  res.send('Check.');
})

app.listen(3000);
