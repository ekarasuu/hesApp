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

        var data = req.body.data;
        var query = "select name from public.restaurant WHERE id=$1 ";
        //var queryInsert = "select * from public.login WHERE username=$1 AND password = $2 ";
        //parseInt(data)
        var value=[data];

        console.log(value)
        client.query(query, value, function(err, result) {
            done();
            if (err){
                console.log(err);
                res.status(400).send(err);
            }
            if(result.rows[0]){
                res.send({'access': true, 'message': result.rows[0]});
            }
            else{
                res.send({'access':false, 'message':'Hatalı QR Code!'});

            }
            //res.send(result.rows[0])

        });
        client.query
    })
});

module.exports = router;
