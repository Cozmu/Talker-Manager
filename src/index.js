const express = require('express');
const talkerRouter = require('./routers/tolkerRouter');
const loginRouter = require('./routers/loginRouter');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use('/talker', talkerRouter);
app.use('/login', loginRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
