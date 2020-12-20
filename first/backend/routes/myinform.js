const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const bodyParser = require('body-parser');
const cors = require('cors');

router.use(cors());
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

router.post('/favorite',(req,res) =>{
    var data = [req.body.idx, req.body.id];
    let sql = 'insert into shop_favorites values(?,?)';

    db.query(sql,data, function(err,rows){
        res.send(rows);
    });

})

router.post('/favorlist',(req,res) => {
    var data = [req.body.id];
    let sql = 'select * from shop_product inner join shop_favorites on shop_product.p_idx = shop_favorites.p_idx where shop_favorites.id=?'
    db.query(sql,data, function(err,rows){
        if(err)console.log(err);
        res.send(rows);
    })
});

router.post('/delete',(req,res) =>{
    var data = [req.body.idx];
    let sql = 'delete from shop_favorites where p_idx = ?';
    db.query(sql,data , function(err,rows){
        if(err)console.log(err);
        res.send(rows);
    })
})

router.post('/basket',(req,res) =>{
    var data = [req.body.idx, req.body.id];
    let sql = 'insert into shop_basket values(?,?)';

    db.query(sql,data, function(err,rows){
        res.send(rows);
    });

})

router.post('/basketlist',(req,res) => {
    var data = [req.body.id];
    let sql = 'select * from shop_product inner join shop_basket on shop_product.p_idx = shop_basket.p_idx where shop_basket.id=?'
    db.query(sql,data, function(err,rows){
        if(err)console.log(err);
        res.send(rows);
    })
});

router.post('/b_delete',(req,res) =>{
    var data = [req.body.idx];
    let sql = 'delete from shop_basket where p_idx = ?';
    db.query(sql,data , function(err,rows){
        if(err)console.log(err);
        res.send(rows);
    })
})
module.exports = router;