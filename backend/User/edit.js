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
        var firstname = req.body.firstname;
        var lastname=req.body.lastname;
        var birth = req.body.birth;
        var email = req.body.email;
        var phone = req.body.phone;
        var queryCheck =  "select * from public.login WHERE email=$1";
        var query = "update public.login set firstname=$1, lastname=$2, birth=$3, email=$4, phone=$5 where username=$6";
        var value = [firstname, lastname, birth, email, phone, username];
        var valueUser = [email];
        client.query(queryCheck, valueUser, function(err, result) {

            if (err){
                console.log(err);
                res.status(400).send(err);
            }
            console.log(result.rows)

            if(result.rows[0]){
                res.send({'canUpdate': false});
                console.log('Bu e-mail zaten kayıtlı!');
                done();
            }
            else{

                client.query(query, value, function(err, result) {

                    if(err){
                        console.log("Kayıt başarısız! "+err)
                        res.status(400).send(err);
                        done();
                    }
                    res.send({'canUpdate' : true})
                    console.log("Başarıyla güncellendi.")
                    done();
                })
            }
            //res.send(result.rows[0])

        });
    })
});

module.exports = router;
