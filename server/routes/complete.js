var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';


router.get('/:id', function(req, res) {
  taskID = req.params.id;
  console.log('taskID: ', taskID);
  // get books from DB
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT completionstatus FROM tasks WHERE id='+taskID, function(err, result) {
      done(); // close the connection.

       console.log('result:', result.rows);

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      res.send(result.rows);

    });

  });
});




module.exports = router;
