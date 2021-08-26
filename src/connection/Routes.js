const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
  connectionLimit : 1000,
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test'
});

const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// app.get('/users', function (req, res) {
//     connection.getConnection(function (err, connection) {

//     connection.query('SELECT * FROM users', function (error, results, fields) {
//       if (error) throw error;

//       res.send(results)
//     });
//   });
// });

app.get('/bot', function (req, res) {
  connection.getConnection(function (err, connection) {

  connection.query('SELECT * FROM bot', function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
  });
});

app.post('/logChat',urlencodedParser, function(req, res) {
      console.log(req.body);
      connection.getConnection(function(error,connection) {
    var sql = "INSERT INTO `log`(`question`) VALUES ('"+req.body.question+"')";
    connection.query(sql, function (error, result)  {
      if (error) throw error;
    console.log("done post",result);
    setInterval(keepAlive, 3000);
    });
  });
});

function keepAlive(){
  connection.getConnection(function(err, connection){
    if(err) { return; }
    connection.ping();
  });
}

// Starting our server.
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/users so you can see the data.');
});
