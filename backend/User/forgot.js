var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
    user: 'postgres',
    database: 'node',
    password: '123456',
    port: 5432,
    max: 10, // max number of connection can be open to database
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var pool = new pg.Pool(config);

router.post('/', function(req, res, next) {
    pool.connect(function(err,client,done){
        if(err){
            console.log("bağlanamıyor"+err);
            res.status(400).send(err);
        }

        var username = req.body.username;

        var query = "select password from public.login WHERE username=$1";
        //var queryInsert = "select * from public.login WHERE username=$1 AND password = $2 ";
        var value = [username];

        client.query(query, value, function(err, result) {
            done();
            if (err){
                console.log(err);
                res.status(400).send(err);
            }
            console.log(result.rows)
            if(result.rows[0]){
                res.send({'succes': true, 'message': result.rows[0]});
            }
            else{
                res.send({'succes':false, 'message':'User not found!'});

            }
            //res.send(result.rows[0])

        });
        client.query
    })
});

module.exports = router;
