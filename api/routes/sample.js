const { Router } = require('express');
const router = Router();
const postgre = require('../config/database');

// 위에선 app.METHOD의 형태로 작성한 코드가
// 여기서는 router.METHOD의 형태라는 점만 다르다.
router.get('/test', function (req, res) {
  res.send('Hello World!')
});

router.get('/getTestList/:id', function (req, res) {
  let councilSeq = req.params.id
  // var list = []; 
  // try {
  //   postgre.connect((err, connection, done) => {
  //     console.log("getTestList get()");
  //     if (err) { 
  //       console.error('DB connection error', err.stack) 
  //     } else {
  //       console.log('Postgre Connected...')
  //       connection.query(`SELECT * FROM tb_council WHERE COUNCIL_SEQ = $1`, [councilSeq], function (err, result, fields) {
  //        // done();
  //         if (!err) {
  //           console.log(result);
  //           res.send(result.rows);
  //         } else {
  //           console.log('query error : ' + err);
  //           res.send(err);
  //         }
  //       });
  //     }
  //   })
  // } catch (error) {
  //   console.error("getTestList GET Error / "+err);
  //   res.status(500).send("message : Internal Server Error");
  // }
  postgre.query(`SELECT * FROM tb_council WHERE COUNCIL_SEQ = $1`, [councilSeq], function (err, result, fields) {
     if (!err) {
       console.log(result);
       res.send(result.rows);
     } else {
       console.log('query error : ' + err);
       res.send(err);
     }
     // postgre.release()
   });
 });

 router.post('/register', function (req, res) {
  let params = req.body
  const sql = "INSERT INTO TB_COUNCIL(COUNCIL_NM, COUNCIL_TY, CNTNTS, USE_YN, DEL_YN, REG_USER, REG_DATE, UPDT_USER, UPDT_DATE, COUNCIL_STTUS) "
  + "VALUES($1, $2, $3, 'Y', 'N', 10000002, NOW(), 10000002, NOW(), 'REQUE')"
  const values = [params.councilNm, params.councilTy, params.cntnts]
  postgre.query(sql, values, function (err, result, fields) {
    if (!err) {
      console.log(result);
      res.send(result.rows);
    } else {
      console.log('query error : ' + err);
      res.send(err);
    }
  });
 });

 router.get('/delete/:id', function (req, res) {
  let councilSeq = req.params.id
  const sql = "UPDATE TB_COUNCIL SET DEL_YN = 'Y' WHERE COUNCIL_SEQ = $1"
  postgre.query(sql, [councilSeq], function (err, result, fields) {
    if (!err) {
      console.log(result);
      res.send(result.rows);
      postgre.release();
    } else {
      console.log('query error : ' + err);
      res.send(err);
    }
  });
 });


// controller로 분리하는 방법
// const sampleController = require('../controller/sampleController');
// router.get('/test', sampleController.test);
// router.get('/getTestList', sampleController.getTestList);

module.exports = router;