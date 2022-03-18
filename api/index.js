const express = require('express');
const app = express();

// body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route를 직접 작성할 경우
app.get('/', function (req, res) {
  res.send('Hello World!')
});

// route 설정을 분리할 경우 : 여러개 추가 가능
const sample = require('./routes/sample');
app.use('/sample', sample);

module.exports = {
  path: '/api',
  handler: app
};