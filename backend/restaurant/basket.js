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
        var masa_no = req.body.masa;
        var urun_adi = req.body.urun;
        var adet = req.body.adet;
        var fiyat = req.body.fiyat;
        var query = "insert into public.\"basketProducts\" (masa_no, urun_adi, adet, fiyat) VALUES ($1, $2, $3, $4)";
        var queryCheck =  "select * from public.\"basketProducts\" WHERE urun_adi=$1";
        var queryUpdate = "update public.\"basketProducts\" set adet=$1, fiyat=$2 WHERE urun_adi=$3"

        var value = [masa_no, urun_adi, adet, fiyat];
        var valueUser = [urun_adi];
        var update = [adet, urun_adi]
        client.query(queryCheck, valueUser, function(err, result) {

            if (err){
                console.log(err);
                res.status(400).send(err);
            }
            console.log(result.rows)

            if(result.rows[0]){
                adet=adet+result.rows[0].adet;

                fiyat=parseFloat(fiyat)+parseFloat(result.rows[0].fiyat);
                console.log(adet, fiyat, urun_adi);
                client.query(queryUpdate, [adet, fiyat, urun_adi], function(err, result){
                    res.send({'eklendi':true})
                })
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



/*
var masa_no = req.body.masa;
        var urun_adi = req.body.urun;
        var adet = req.body.adet;
        var fiyat = req.body.fiyat;
        var query = "insert into public.\"basketProducts\" (masa_no, urun_adi, adet, fiyat) VALUES ($1, $2, $3, $4)";
 */
