const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const bodyParser = require('body-parser');
const cors = require('cors');

router.use(cors());
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

router.post('/ask',(req,res) => {
    var data = [req.body.id,req.body.title, req.body.content];
    let sql = 'insert into shop_ask values(null,?,?,?,NOW(),"no","no")';
    db.query(sql,data, function(err,rows){
        if(err)console.log(err);
        res.send(rows);
    })
})

router.get('/adminlist',(req,res) => {
    let sql = 'select * from shop_ask where deleted = "no"';
    db.query(sql, function(err,rows){
        res.send(rows);
    })
})

router.post('/detail',(req,res) => {
    var data = [req.body.idx];
    let sql = 'select * from shop_ask where idx = ?';
    db.query(sql,data,function(err,rows){
        res.send(rows);
    })
})

router.post('/clientlist',(req,res) => {
    var data = [req.body.id];
    let sql = 'select * from shop_ask where id = ?';
    db.query(sql,data, function(err,rows){
        res.send(rows);
    })
})

router.post('/adminanswer',(req,res) =>{
    var data = [req.body.id,req.body.title,req.body.content,req.body.code];
    let sql = 'insert into shop_answer values(null,?,?,?,NOW(),?);';
    db.query(sql,data, function(err,rows){
        res.send(rows);
    })
})

router.get('/admin_alist', (req,res) =>{
    let sql = 'select * from shop_answer';
    db.query(sql,function(err,rows){
        res.send(rows);
    })
})

router.post('/client_alist', (req,res) =>{
    var data = [req.body.id];
    let sql = 'select * from shop_answer where id = ?';
    db.query(sql,data,function(err,rows){
        res.send(rows);
    })
})

router.post('/detailansw',(req,res) => {
    var data = [req.body.idx];
    let sql = 'select * from shop_answer where idx = ?';
    db.query(sql,data,function(err,rows){
        if(err)console.log(err);
        res.send(rows);
    })
})

router.post('/answer_ok', (req,res) =>{
    var data = [req.body.idx];
    let sql = 'update shop_ask set answered = "yes" where idx = ?';
    db.query(sql,data,function(err,rows){
        res.send(rows);
    })
})

router.post('/lookanswer',(req,res) =>{
    var data = [req.body.code];
    let sql = 'select * from shop_answer where code = ?';
    db.query(sql,data,function(err,rows){
        res.send(rows);
    })
})

module.exports = router;