var express = require('express');
var router = express.Router();
var pg = require('pg');
var login = require('./login');
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
        var password = req.body.password;
        var email = req.body.email;
        var queryCheck =  "select * from public.login WHERE username=$1 OR email=$2";
        var query = "insert into public.login(username, password, email) VALUES($1,$2,$3)";
        var value = [username, password, email];
        var valueUser = [username,email];
        client.query(queryCheck, valueUser, function(err, result) {

            if (err){
                console.log(err);
                res.status(400).send(err);
            }
            console.log(result.rows)

            if(result.rows[0]){
                res.send({'canRegister': false});
                console.log('Bu kullanıcı adı alınmış!');
                done();
            }
            else{

                client.query(query, value, function(err, result) {

                    if(err){
                        console.log("Kayıt başarısız! "+err)
                        res.status(400).send(err);
                        done();
                    }
                    res.send({'canRegister' : true})
                    console.log("Başarıyla kaydedildi.")
                    done();
                })
            }
            //res.send(result.rows[0])

        });
    })
});

module.exports = router;
