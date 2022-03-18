const { Client } = require("pg");

// DB 접속 정보
const postgre = new Client({ 
  user : 'dhub', 
  host : '192.168.106.24', 
  database : 'dhub', 
  password : 'dhub.12#', 
  port : 25432,
  max: 5,
  // connectionTimeoutMillis: 30000, // 커넥션 대기시간 30초
})


// DB 연결
postgre.connect((err, connection, done) => {
  if (err) { 
    console.error('DB connection error', err.stack) 
  } else { 
    console.log('Postgre Connected...') } 
});

module.exports = postgre;