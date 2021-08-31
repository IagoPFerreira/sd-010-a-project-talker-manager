const express = require('express');
const bodyParser = require('body-parser');

const getTalkers = require('./middlewares/getTalkers');
const getTalkerId = require('./middlewares/getTalkerId');
const { generateToken, validatePassword, validateEmail } = require('./middlewares/login');
const talkerValidations = require('./middlewares/validateTalker');
const createTalker = require('./middlewares/postTalker');
const updateTalker = require('./middlewares/putTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', getTalkers);

app.get('/talker/:id', getTalkerId);

app.post('/login', validateEmail, validatePassword, generateToken);

app.post('/talker', talkerValidations, createTalker);

app.put('/talker/:id', talkerValidations, updateTalker);
