const postgre = require('../config/database');

module.exports.test = function (req, res) {
  res.send('Hello World!')
};

module.exports.getTestList = function (req, res) {
  postgre.query('SELECT * FROM tb_council', function (err, result, fields) {
    if (!err) {
      console.log(result);
      res.send(result.rows)
    } else {
      console.log('query error : ' + err);
      res.send(err);
    }
  });
};